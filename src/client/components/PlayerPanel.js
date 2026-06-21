import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useState } from "react";
export function PlayerPanel({ myId, myName, pendingRequests, send, }) {
    const [positive, setPositive] = useState(0);
    const [negative, setNegative] = useState(0);
    const [random, setRandom] = useState(0);
    const myPending = pendingRequests.find((r) => r.playerId === myId);
    function handleAddTokens(e) {
        e.preventDefault();
        if (positive === 0 && negative === 0 && random === 0)
            return;
        send({
            type: "addTokens",
            playerId: myId,
            tokens: { positive, negative, random },
        });
        setPositive(0);
        setNegative(0);
        setRandom(0);
    }
    function handleRequestDraw() {
        send({ type: "requestDraw", playerId: myId, playerName: myName });
    }
    return (_jsxs("section", { className: "player-panel", children: [_jsxs("h2", { children: ["Player \u2014 ", myName] }), _jsxs("form", { className: "token-form", onSubmit: handleAddTokens, children: [_jsx("h3", { children: "Add tokens to the bag" }), _jsxs("div", { className: "token-form__inputs", children: [_jsxs("label", { children: ["Positive", _jsx("input", { type: "number", min: 0, value: positive, onChange: (e) => setPositive(Math.max(0, parseInt(e.target.value, 10) || 0)) })] }), _jsxs("label", { children: ["Negative", _jsx("input", { type: "number", min: 0, value: negative, onChange: (e) => setNegative(Math.max(0, parseInt(e.target.value, 10) || 0)) })] }), _jsxs("label", { children: ["Random", _jsx("input", { type: "number", min: 0, value: random, onChange: (e) => setRandom(Math.max(0, parseInt(e.target.value, 10) || 0)) })] })] }), _jsx("button", { type: "submit", children: "Add tokens" })] }), _jsxs("div", { className: "draw-request", children: [_jsx("h3", { children: "Draw request" }), myPending ? (_jsx("p", { className: "draw-request__waiting", children: "Waiting for the narrator to confirm your draw\u2026" })) : (_jsx("button", { onClick: handleRequestDraw, children: "Request Draw" }))] })] }));
}
