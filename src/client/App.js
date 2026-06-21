import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useRoom } from "./useRoom";
import { JoinRoom } from "./components/JoinRoom";
import { BagView } from "./components/BagView";
import { PlayerPanel } from "./components/PlayerPanel";
import { NarratorPanel } from "./components/NarratorPanel";
import { DrawLog } from "./components/DrawLog";
export function App() {
    const [session, setSession] = useState(null);
    if (session === null) {
        return _jsx(JoinRoom, { onJoin: setSession });
    }
    return _jsx(RoomView, { session: session });
}
function RoomView({ session }) {
    const { state, role, myId, myName, roomCode, send, connected } = useRoom(session);
    if (!connected || state === null) {
        return _jsx("div", { className: "loading", children: "Connecting\u2026" });
    }
    return (_jsxs("div", { className: "room", children: [_jsxs("header", { className: "room-header", children: [_jsxs("div", { className: "room-header__info", children: [_jsx("h1", { children: "NtE Token Bag" }), _jsxs("span", { className: "room-header__code", children: ["Room: ", roomCode] })] }), _jsxs("div", { className: "room-header__meta", children: [_jsx("span", { className: "role-badge role-badge--{role}", children: role }), _jsx("span", { className: "player-name", children: myName }), _jsx("span", { className: `connection-status ${connected ? "connected" : "disconnected"}`, children: connected ? "●" : "○" })] })] }), _jsx(BagView, { bag: state.bag }), role === "player" && (_jsx(PlayerPanel, { myId: myId, myName: myName, pendingRequests: state.pendingRequests, send: send })), role === "narrator" && (_jsx(NarratorPanel, { myId: myId, myName: myName, pendingRequests: state.pendingRequests, config: state.config, send: send })), _jsx(DrawLog, { history: state.history })] }));
}
