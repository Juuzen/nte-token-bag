import { useState } from "react";
import type { ClientMsg, PendingRequest } from "@shared/protocol";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import styles from "./PlayerPanel.module.scss";

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

  const fields = [
    { label: "Positive", color: "text-neon-green", value: positive, set: setPositive },
    { label: "Negative", color: "text-neon-red", value: negative, set: setNegative },
    { label: "Random", color: "text-neon-orange", value: random, set: setRandom },
  ];

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
    <section className={`${styles.playerPanel} glass-surface flex flex-col gap-5 p-5`}>
      <div className="panel-title">Player — {myName}</div>

      <form onSubmit={handleAddTokens}>
        <div className="section-title">Add tokens to the bag</div>
        <div className="mb-3.5 flex flex-wrap items-end gap-4">
          {fields.map(({ label, color, value, set }) => (
            <div key={label} className="flex flex-col gap-[0.3rem]">
              <span className={`text-[0.7rem] font-bold uppercase tracking-[0.1em] ${color}`}>
                {label}
              </span>
              <InputNumber
                value={value}
                onValueChange={(e) => set(Math.max(0, e.value ?? 0))}
                min={0}
                showButtons
                buttonLayout="horizontal"
                decrementButtonClassName="p-button-secondary"
                incrementButtonClassName="p-button-secondary"
                incrementButtonIcon="pi pi-plus"
                decrementButtonIcon="pi pi-minus"
                inputStyle={{ width: "3.5rem", textAlign: "center" }}
              />
            </div>
          ))}
        </div>
        <Button
          type="submit"
          label="Add Tokens"
          icon="pi pi-plus-circle"
          disabled={positive === 0 && negative === 0 && random === 0}
        />
      </form>

      <div className="flex flex-col gap-2">
        <div className="section-title">Draw Request</div>
        {myPending ? (
          <p className="flex items-center gap-2 text-[0.88rem] italic text-text-muted">
            <i className="pi pi-spin pi-spinner" />
            Waiting for the narrator to confirm your draw…
          </p>
        ) : (
          <Button
            label="Request Draw"
            icon="pi pi-send"
            onClick={handleRequestDraw}
          />
        )}
      </div>
    </section>
  );
}
