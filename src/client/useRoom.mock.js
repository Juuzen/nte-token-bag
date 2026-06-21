import { useReducer, useEffect, useRef } from "react";
const INITIAL_BAG = { positive: 0, negative: 0, random: 0 };
const INITIAL_STATE = {
    bag: { ...INITIAL_BAG },
    contributors: {},
    history: [],
    pendingRequests: [],
    players: [],
    config: { randomPositiveProbability: 0.5 },
};
// ── Draw helper ───────────────────────────────────────────────────────────────
function performDraw(state, by) {
    const { bag, config } = state;
    const total = bag.positive + bag.negative + bag.random;
    if (total === 0)
        return null;
    const roll = Math.random() * total;
    const drawn = roll < bag.positive
        ? "positive"
        : roll < bag.positive + bag.negative
            ? "negative"
            : "random";
    const resolved = drawn !== "random"
        ? drawn
        : Math.random() < config.randomPositiveProbability
            ? "positive"
            : "negative";
    const token = {
        id: crypto.randomUUID(),
        drawn,
        resolved,
        by,
        at: Date.now(),
    };
    const nextBag = { ...bag, [drawn]: bag[drawn] - 1 };
    const nextState = {
        ...state,
        bag: nextBag,
        history: [token, ...state.history],
    };
    return { nextState, token };
}
// ── Reducer ───────────────────────────────────────────────────────────────────
function reducer(state, action) {
    switch (action.type) {
        case "_addPlayer": {
            const already = state.players.some((p) => p.id === action.player.id);
            if (already)
                return state;
            return { ...state, players: [...state.players, action.player] };
        }
        case "addTokens": {
            const { playerId, tokens } = action;
            const prev = state.contributors[playerId] ?? { ...INITIAL_BAG };
            return {
                ...state,
                bag: {
                    positive: state.bag.positive + tokens.positive,
                    negative: state.bag.negative + tokens.negative,
                    random: state.bag.random + tokens.random,
                },
                contributors: {
                    ...state.contributors,
                    [playerId]: {
                        positive: prev.positive + tokens.positive,
                        negative: prev.negative + tokens.negative,
                        random: prev.random + tokens.random,
                    },
                },
            };
        }
        case "requestDraw": {
            const { playerId, playerName } = action;
            const alreadyPending = state.pendingRequests.some((r) => r.playerId === playerId);
            if (alreadyPending)
                return state;
            const req = {
                id: crypto.randomUUID(),
                playerId,
                playerName,
                requestedAt: Date.now(),
            };
            return {
                ...state,
                pendingRequests: [...state.pendingRequests, req],
            };
        }
        case "draw": {
            const result = performDraw(state, action.narratorName);
            return result ? result.nextState : state;
        }
        case "resolveRequest": {
            const req = state.pendingRequests.find((r) => r.id === action.requestId);
            if (!req)
                return state;
            const withoutReq = {
                ...state,
                pendingRequests: state.pendingRequests.filter((r) => r.id !== action.requestId),
            };
            const result = performDraw(withoutReq, req.playerName);
            return result ? result.nextState : withoutReq;
        }
        case "removeTokens": {
            const { tokens } = action;
            return {
                ...state,
                bag: {
                    positive: Math.max(0, state.bag.positive - tokens.positive),
                    negative: Math.max(0, state.bag.negative - tokens.negative),
                    random: Math.max(0, state.bag.random - tokens.random),
                },
            };
        }
        case "setBag": {
            return { ...state, bag: { ...action.bag } };
        }
        case "setConfig": {
            return {
                ...state,
                config: { ...state.config, ...action.config },
            };
        }
        case "reset": {
            return {
                ...state,
                bag: { ...INITIAL_BAG },
                contributors: {},
                history: [],
                pendingRequests: [],
            };
        }
        default:
            return state;
    }
}
// ── Hook ──────────────────────────────────────────────────────────────────────
export function useRoom(params) {
    const { roomCode, playerName, role } = params;
    const sessionKey = `nte-player-id-${roomCode}`;
    const myId = useRef(sessionStorage.getItem(sessionKey) ?? (() => {
        const id = crypto.randomUUID();
        sessionStorage.setItem(sessionKey, id);
        return id;
    })()).current;
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
    useEffect(() => {
        dispatch({
            type: "_addPlayer",
            player: { id: myId, name: playerName, role },
        });
        // Intentionally runs once on mount only.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    function send(msg) {
        dispatch(msg);
    }
    return {
        state,
        role,
        myId,
        myName: playerName,
        roomCode,
        send,
        connected: true,
    };
}
