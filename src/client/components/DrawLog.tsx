import type { DrawnToken } from "@shared/protocol";

interface DrawLogProps {
  history: DrawnToken[];
}

export function DrawLog({ history }: DrawLogProps) {
  return (
    <section className="draw-log">
      <div className="bag-view__title">Draw History</div>
      {history.length === 0 ? (
        <p className="draw-log__empty">No draws yet.</p>
      ) : (
        <ul className="draw-log__list">
          {history.map((entry) => (
            <li key={entry.id} className="draw-log__entry">
              <span className="draw-log__player">{entry.by}</span>
              {" drew "}
              <span className={`draw-log__kind draw-log__kind--${entry.drawn}`}>
                {entry.drawn}
              </span>
              {" → "}
              <span
                className={
                  entry.drawn === "random"
                    ? `draw-log__resolved draw-log__resolved--${entry.resolved}`
                    : "draw-log__resolved"
                }
              >
                {entry.resolved}
              </span>
              <time
                className="draw-log__time"
                dateTime={new Date(entry.at).toISOString()}
              >
                {new Date(entry.at).toLocaleTimeString()}
              </time>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
