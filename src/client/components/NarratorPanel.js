import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
export function NarratorPanel({ myId, myName, pendingRequests, config, send, }) {
    const [mode, setMode] = useState("add");
    const [positive, setPositive] = useState(0);
    const [negative, setNegative] = useState(0);
    const [random, setRandom] = useState(0);
    function handleBagSubmit(e) {
        e.preventDefault();
        const tokens = { positive, negative, random };
        if (mode === "add") {
            send({ type: "addTokens", playerId: myId, tokens });
        }
        else if (mode === "remove") {
            send({ type: "removeTokens", tokens });
        }
        else {
            send({ type: "setBag", bag: tokens });
        }
        setPositive(0);
        setNegative(0);
        setRandom(0);
    }
    function handleConfirm(requestId) {
        send({ type: "resolveRequest", requestId, narratorId: myId });
    }
    function handleDrawNow() {
        send({ type: "draw", narratorId: myId, narratorName: myName });
    }
    function handleReset() {
        if (confirm("Reset the bag and history?")) {
            send({ type: "reset" });
        }
    }
    function handleRandomProb(e) {
        send({
            type: "setConfig",
            config: { randomPositiveProbability: parseFloat(e.target.value) },
        });
    }
    return (_jsxs("section", { className: "narrator-panel", children: [_jsx("h2", { children: "Narrator" }), _jsxs("div", { className: "narrator-section", children: [_jsx("h3", { children: "Modify bag" }), _jsx("div", { className: "mode-radios", children: ["add", "remove", "set"].map((m) => (_jsxs("label", { children: [_jsx("input", { type: "radio", name: "bagMode", value: m, checked: mode === m, onChange: () => setMode(m) }), m.charAt(0).toUpperCase() + m.slice(1)] }, m))) }), _jsxs("form", { className: "token-form", onSubmit: handleBagSubmit, children: [_jsxs("div", { className: "token-form__inputs", children: [_jsxs("label", { children: ["Positive", _jsx("input", { type: "number", min: 0, value: positive, onChange: (e) => setPositive(Math.max(0, parseInt(e.target.value, 10) || 0)) })] }), _jsxs("label", { children: ["Negative", _jsx("input", { type: "number", min: 0, value: negative, onChange: (e) => setNegative(Math.max(0, parseInt(e.target.value, 10) || 0)) })] }), _jsxs("label", { children: ["Random", _jsx("input", { type: "number", min: 0, value: random, onChange: (e) => setRandom(Math.max(0, parseInt(e.target.value, 10) || 0)) })] })] }), _jsx("button", { type: "submit", children: mode === "add" ? "Add to bag" : mode === "remove" ? "Remove from bag" : "Set bag" })] })] }), _jsxs("div", { className: "narrator-section", children: [_jsx("h3", { children: "Draw" }), _jsx("button", { onClick: handleDrawNow, children: "Draw Now" })] }), _jsxs("div", { className: "narrator-section", children: [_jsxs("h3", { children: ["Pending requests (", pendingRequests.length, ")"] }), pendingRequests.length === 0 ? (_jsx("p", { children: "No pending requests." })) : (_jsx("ul", { className: "pending-list", children: pendingRequests.map((req) => (_jsxs("li", { className: "pending-list__item", children: [_jsx("span", { children: req.playerName }), _jsx("button", { onClick: () => handleConfirm(req.id), children: "Confirm draw" })] }, req.id))) }))] }), _jsxs("div", { className: "narrator-section", children: [_jsx("h3", { children: "Random token probability" }), _jsxs("label", { children: ["Positive outcome:", " ", _jsxs("strong", { children: [Math.round(config.randomPositiveProbability * 100), "%"] }), _jsx("input", { type: "range", min: 0, max: 1, step: 0.01, value: config.randomPositiveProbability, onChange: handleRandomProb })] }), _jsxs("p", { className: "probability-hint", children: ["Negative outcome: ", Math.round((1 - config.randomPositiveProbability) * 100), "%"] })] }), _jsxs("div", { className: "narrator-section narrator-section--danger", children: [_jsx("h3", { children: "Reset" }), _jsx("button", { className: "btn-danger", onClick: handleReset, children: "Reset bag & history" })] })] }));
}
