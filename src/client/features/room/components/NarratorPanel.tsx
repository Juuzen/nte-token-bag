import { useState } from "react";
import type { ClientMsg, PendingRequest, RoomConfig } from "@shared/protocol";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { SelectButton } from "primereact/selectbutton";
import { Slider } from "primereact/slider";
import styles from "./NarratorPanel.module.scss";

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

  const fields = [
    { label: "Positive", color: "text-neon-green", value: positive, set: setPositive },
    { label: "Negative", color: "text-neon-red", value: negative, set: setNegative },
    { label: "Random", color: "text-neon-orange", value: random, set: setRandom },
  ];

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
    <section className={`${styles.narratorPanel} glass-surface flex flex-col gap-5 p-5`}>
      <div className="panel-title">Narrator</div>

      <div className={styles.section}>
        <div className="section-title">Modify Bag</div>
        <div className="mb-3.5">
          <SelectButton
            value={mode}
            onChange={(e) => setMode(e.value as BagMode)}
            options={modeOptions}
            optionLabel="label"
            optionValue="value"
          />
        </div>
        <form onSubmit={handleBagSubmit}>
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
            icon="pi pi-check"
            label={mode === "add" ? "Add to Bag" : mode === "remove" ? "Remove from Bag" : "Set Bag"}
          />
        </form>
      </div>

      <div className={styles.section}>
        <div className="section-title">Draw</div>
        <Button label="Draw Now" icon="pi pi-bolt" onClick={handleDrawNow} />
      </div>

      <div className={styles.section}>
        <div className="section-title">
          Pending Requests ({pendingRequests.length})
        </div>
        {pendingRequests.length === 0 ? (
          <p className="text-[0.88rem] text-text-muted">No pending requests.</p>
        ) : (
          <ul className="flex list-none flex-col gap-[0.4rem]">
            {pendingRequests.map((req) => (
              <li
                key={req.id}
                className={`${styles.pendingItem} flex items-center justify-between rounded-md px-3 py-2 text-[0.88rem]`}
              >
                <span className="font-medium text-text">{req.playerName}</span>
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

      <div className={styles.section}>
        <div className="section-title">Random Token Probability</div>
        <div className="mb-2 flex justify-between text-[0.82rem]">
          <span className="font-semibold text-neon-green">Positive: {probPercent}%</span>
          <span className="font-semibold text-neon-red">Negative: {100 - probPercent}%</span>
        </div>
        <Slider
          value={probPercent}
          onChange={(e) => handleRandomProb(e.value as number)}
          min={0}
          max={100}
          step={1}
        />
      </div>

      <div className={styles.section}>
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
