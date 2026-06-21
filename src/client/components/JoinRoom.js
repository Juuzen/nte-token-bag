import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
function generateRoomCode() {
    return crypto.randomUUID().replace(/-/g, "").slice(0, 6).toUpperCase();
}
export function JoinRoom({ onJoin }) {
    const [mode, setMode] = useState("choose");
    const [playerName, setPlayerName] = useState("");
    // create mode
    const [createdRoomCode] = useState(() => generateRoomCode());
    const [narratorKey] = useState(() => crypto.randomUUID());
    // join mode
    const [roomCodeInput, setRoomCodeInput] = useState("");
    function handleEnterAsNarrator(e) {
        e.preventDefault();
        if (!playerName.trim())
            return;
        onJoin({
            roomCode: createdRoomCode,
            playerName: playerName.trim(),
            role: "narrator",
            narratorKey,
        });
    }
    function handleJoin(e) {
        e.preventDefault();
        if (!playerName.trim() || !roomCodeInput.trim())
            return;
        onJoin({
            roomCode: roomCodeInput.trim().toUpperCase(),
            playerName: playerName.trim(),
            role: "player",
        });
    }
    if (mode === "choose") {
        return (_jsxs("div", { className: "join-room", children: [_jsx("h1", { children: "NtE Token Bag" }), _jsx("p", { children: "Welcome! Are you the narrator or a player?" }), _jsxs("div", { className: "join-room__choices", children: [_jsx("button", { onClick: () => setMode("create"), children: "Create a room (Narrator)" }), _jsx("button", { onClick: () => setMode("join"), children: "Join a room (Player)" })] })] }));
    }
    if (mode === "create") {
        return (_jsxs("div", { className: "join-room", children: [_jsx("h1", { children: "Create a room" }), _jsx("p", { children: "Share these details with your players before entering:" }), _jsxs("dl", { className: "room-credentials", children: [_jsx("dt", { children: "Room code" }), _jsx("dd", { children: _jsx("code", { children: createdRoomCode }) }), _jsx("dt", { children: "Narrator key" }), _jsxs("dd", { children: [_jsx("code", { children: narratorKey }), _jsx("small", { children: " (keep this secret \u2014 proves you are the narrator)" })] })] }), _jsxs("form", { onSubmit: handleEnterAsNarrator, children: [_jsxs("label", { children: ["Your name", _jsx("input", { type: "text", value: playerName, onChange: (e) => setPlayerName(e.target.value), placeholder: "Narrator name", autoFocus: true })] }), _jsxs("div", { className: "join-room__actions", children: [_jsx("button", { type: "button", onClick: () => setMode("choose"), children: "Back" }), _jsx("button", { type: "submit", disabled: !playerName.trim(), children: "Enter as Narrator" })] })] })] }));
    }
    return (_jsxs("div", { className: "join-room", children: [_jsx("h1", { children: "Join a room" }), _jsxs("form", { onSubmit: handleJoin, children: [_jsxs("label", { children: ["Room code", _jsx("input", { type: "text", value: roomCodeInput, onChange: (e) => setRoomCodeInput(e.target.value), placeholder: "e.g. A3F9B2", autoFocus: true })] }), _jsxs("label", { children: ["Your name", _jsx("input", { type: "text", value: playerName, onChange: (e) => setPlayerName(e.target.value), placeholder: "Player name" })] }), _jsxs("div", { className: "join-room__actions", children: [_jsx("button", { type: "button", onClick: () => setMode("choose"), children: "Back" }), _jsx("button", { type: "submit", disabled: !playerName.trim() || !roomCodeInput.trim(), children: "Join room" })] })] })] }));
}
