import { useState } from "react";
import type { ClientMsg, PendingRequest } from "@shared/protocol";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";

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
      <div className="panel-title">Player — {myName}</div>

      <form className="token-form" onSubmit={handleAddTokens}>
        <div className="section-title">Add tokens to the bag</div>
        <div className="token-form__inputs">
          <div className="token-form__field">
            <span className="token-form__field-label token-form__field-label--positive">Positive</span>
            <InputNumber
              value={positive}
              onValueChange={(e) => setPositive(Math.max(0, e.value ?? 0))}
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
          <div className="token-form__field">
            <span className="token-form__field-label token-form__field-label--negative">Negative</span>
            <InputNumber
              value={negative}
              onValueChange={(e) => setNegative(Math.max(0, e.value ?? 0))}
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
          <div className="token-form__field">
            <span className="token-form__field-label token-form__field-label--random">Random</span>
            <InputNumber
              value={random}
              onValueChange={(e) => setRandom(Math.max(0, e.value ?? 0))}
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
        </div>
        <Button
          type="submit"
          label="Add Tokens"
          icon="pi pi-plus-circle"
          disabled={positive === 0 && negative === 0 && random === 0}
        />
      </form>

      <div className="draw-request">
        <div className="section-title">Draw Request</div>
        {myPending ? (
          <p className="draw-request__waiting">
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
