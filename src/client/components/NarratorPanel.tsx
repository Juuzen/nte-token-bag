import { useState } from "react";
import type { ClientMsg, PendingRequest, RoomConfig } from "@shared/protocol";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { SelectButton } from "primereact/selectbutton";
import { Slider } from "primereact/slider";

type BagMode = "add" | "remove" | "set";

interface NarratorPanelProps {
  myId: string;
  myName: string;
  pendingRequests: PendingRequest[];
  config: RoomConfig;
  send: (msg: ClientMsg) => void;
}

const modeOptions: { label: string; value: BagMode }[] = [
  { label: "Add", value: "add" },
  { label: "Remove", value: "remove" },
  { label: "Set", value: "set" },
];

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

  function handleRandomProb(value: number) {
    send({
      type: "setConfig",
      config: { randomPositiveProbability: value / 100 },
    });
  }

  const probPercent = Math.round(config.randomPositiveProbability * 100);

  return (
    <section className="narrator-panel">
      <div className="panel-title">Narrator</div>

      <div className="narrator-section">
        <div className="section-title">Modify Bag</div>
        <div className="mode-select">
          <SelectButton
            value={mode}
            onChange={(e) => setMode(e.value as BagMode)}
            options={modeOptions}
            optionLabel="label"
            optionValue="value"
          />
        </div>
        <form className="token-form" onSubmit={handleBagSubmit}>
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
            icon="pi pi-check"
            label={mode === "add" ? "Add to Bag" : mode === "remove" ? "Remove from Bag" : "Set Bag"}
          />
        </form>
      </div>

      <div className="narrator-section">
        <div className="section-title">Draw</div>
        <Button label="Draw Now" icon="pi pi-bolt" onClick={handleDrawNow} />
      </div>

      <div className="narrator-section">
        <div className="section-title">
          Pending Requests ({pendingRequests.length})
        </div>
        {pendingRequests.length === 0 ? (
          <p style={{ color: "var(--text-muted)", fontSize: "0.88rem" }}>No pending requests.</p>
        ) : (
          <ul className="pending-list">
            {pendingRequests.map((req) => (
              <li key={req.id} className="pending-list__item">
                <span className="pending-list__player">{req.playerName}</span>
                <Button
                  label="Confirm"
                  icon="pi pi-check"
                  size="small"
                  onClick={() => handleConfirm(req.id)}
                />
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="narrator-section">
        <div className="section-title">Random Token Probability</div>
        <div className="probability-display">
          <span className="probability-positive">Positive: {probPercent}%</span>
          <span className="probability-negative">Negative: {100 - probPercent}%</span>
        </div>
        <Slider
          value={probPercent}
          onChange={(e) => handleRandomProb(e.value as number)}
          min={0}
          max={100}
          step={1}
        />
      </div>

      <div className="narrator-section">
        <div className="section-title">Danger Zone</div>
        <Button
          label="Reset Bag & History"
          icon="pi pi-trash"
          severity="danger"
          onClick={handleReset}
        />
      </div>
    </section>
  );
}
