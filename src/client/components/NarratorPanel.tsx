import { useState } from "react";
import type { ClientMsg, PendingRequest, RoomConfig } from "@shared/protocol";

type BagMode = "add" | "remove" | "set";

interface NarratorPanelProps {
  myId: string;
  myName: string;
  pendingRequests: PendingRequest[];
  config: RoomConfig;
  send: (msg: ClientMsg) => void;
}

export function NarratorPanel({
  myId,
  myName,
  pendingRequests,
  config,
  send,
}: NarratorPanelProps) {
  const [mode, setMode] = useState<BagMode>("add");
  const [positive, setPositive] = useState(0);
  const [negative, setNegative] = useState(0);
  const [random, setRandom] = useState(0);

  function handleBagSubmit(e: React.FormEvent) {
    e.preventDefault();
    const tokens = { positive, negative, random };
    if (mode === "add") {
      send({ type: "addTokens", playerId: myId, tokens });
    } else if (mode === "remove") {
      send({ type: "removeTokens", tokens });
    } else {
      send({ type: "setBag", bag: tokens });
    }
    setPositive(0);
    setNegative(0);
    setRandom(0);
  }

  function handleConfirm(requestId: string) {
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

  function handleRandomProb(e: React.ChangeEvent<HTMLInputElement>) {
    send({
      type: "setConfig",
      config: { randomPositiveProbability: parseFloat(e.target.value) },
    });
  }

  return (
    <section className="narrator-panel">
      <h2>Narrator</h2>

      <div className="narrator-section">
        <h3>Modify bag</h3>
        <div className="mode-radios">
          {(["add", "remove", "set"] as BagMode[]).map((m) => (
            <label key={m}>
              <input
                type="radio"
                name="bagMode"
                value={m}
                checked={mode === m}
                onChange={() => setMode(m)}
              />
              {m.charAt(0).toUpperCase() + m.slice(1)}
            </label>
          ))}
        </div>
        <form className="token-form" onSubmit={handleBagSubmit}>
          <div className="token-form__inputs">
            <label>
              Positive
              <input
                type="number"
                min={0}
                value={positive}
                onChange={(e) => setPositive(Math.max(0, parseInt(e.target.value, 10) || 0))}
              />
            </label>
            <label>
              Negative
              <input
                type="number"
                min={0}
                value={negative}
                onChange={(e) => setNegative(Math.max(0, parseInt(e.target.value, 10) || 0))}
              />
            </label>
            <label>
              Random
              <input
                type="number"
                min={0}
                value={random}
                onChange={(e) => setRandom(Math.max(0, parseInt(e.target.value, 10) || 0))}
              />
            </label>
          </div>
          <button type="submit">
            {mode === "add" ? "Add to bag" : mode === "remove" ? "Remove from bag" : "Set bag"}
          </button>
        </form>
      </div>

      <div className="narrator-section">
        <h3>Draw</h3>
        <button onClick={handleDrawNow}>Draw Now</button>
      </div>

      <div className="narrator-section">
        <h3>Pending requests ({pendingRequests.length})</h3>
        {pendingRequests.length === 0 ? (
          <p>No pending requests.</p>
        ) : (
          <ul className="pending-list">
            {pendingRequests.map((req) => (
              <li key={req.id} className="pending-list__item">
                <span>{req.playerName}</span>
                <button onClick={() => handleConfirm(req.id)}>Confirm draw</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="narrator-section">
        <h3>Random token probability</h3>
        <label>
          Positive outcome:{" "}
          <strong>{Math.round(config.randomPositiveProbability * 100)}%</strong>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={config.randomPositiveProbability}
            onChange={handleRandomProb}
          />
        </label>
        <p className="probability-hint">
          Negative outcome: {Math.round((1 - config.randomPositiveProbability) * 100)}%
        </p>
      </div>

      <div className="narrator-section narrator-section--danger">
        <h3>Reset</h3>
        <button className="btn-danger" onClick={handleReset}>
          Reset bag &amp; history
        </button>
      </div>
    </section>
  );
}
