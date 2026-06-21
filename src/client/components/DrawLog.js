import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function DrawLog({ history }) {
    if (history.length === 0) {
        return (_jsxs("section", { className: "draw-log", children: [_jsx("h2", { children: "Draw History" }), _jsx("p", { className: "draw-log__empty", children: "No draws yet." })] }));
    }
    return (_jsxs("section", { className: "draw-log", children: [_jsx("h2", { children: "Draw History" }), _jsx("ul", { className: "draw-log__list", children: history.map((entry) => (_jsxs("li", { className: "draw-log__entry", children: [_jsx("span", { className: "draw-log__player", children: entry.by }), " drew ", _jsx("span", { className: `draw-log__kind draw-log__kind--${entry.drawn}`, children: entry.drawn }), " → ", _jsx("span", { className: entry.drawn === "random"
                                ? `draw-log__resolved draw-log__resolved--${entry.resolved}`
                                : `draw-log__resolved`, children: entry.resolved }), _jsx("time", { className: "draw-log__time", dateTime: new Date(entry.at).toISOString(), children: new Date(entry.at).toLocaleTimeString() })] }, entry.id))) })] }));
}
