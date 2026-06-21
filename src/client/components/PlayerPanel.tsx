import { useState } from "react";
import type { ClientMsg, PendingRequest } from "@shared/protocol";

interface PlayerPanelProps {
  myId: string;
  myName: string;
  pendingRequests: PendingRequest[];
  send: (msg: ClientMsg) => void;
}

export function PlayerPanel({
  myId,
  myName,
  pendingRequests,
  send,
}: PlayerPanelProps) {
  const [positive, setPositive] = useState(0);
  const [negative, setNegative] = useState(0);
  const [random, setRandom] = useState(0);

  const myPending = pendingRequests.find((r) => r.playerId === myId);

  function handleAddTokens(e: React.FormEvent) {
    e.preventDefault();
    if (positive === 0 && negative === 0 && random === 0) return;
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

  return (
    <section className="player-panel">
      <h2>Player — {myName}</h2>

      <form className="token-form" onSubmit={handleAddTokens}>
        <h3>Add tokens to the bag</h3>
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
        <button type="submit">Add tokens</button>
      </form>

      <div className="draw-request">
        <h3>Draw request</h3>
        {myPending ? (
          <p className="draw-request__waiting">
            Waiting for the narrator to confirm your draw…
          </p>
        ) : (
          <button onClick={handleRequestDraw}>Request Draw</button>
        )}
      </div>
    </section>
  );
}
