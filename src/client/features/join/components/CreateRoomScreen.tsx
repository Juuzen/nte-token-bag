import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { useSession } from "@client/stores/session";
import { screenClass, heroTitleClass, heroSubClass, labelClass, backBtnClass } from "../utils/joinShared";
import styles from "./JoinRoom.module.scss";

function generateRoomCode(): string {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 6).toUpperCase();
}

export function CreateRoomScreen() {
  const navigate = useNavigate();
  const { setSession } = useSession();
  const [playerName, setPlayerName] = useState("");
  const [createdRoomCode] = useState(generateRoomCode);
  const [narratorKey] = useState(() => crypto.randomUUID());

  function handleEnterAsNarrator(e: React.FormEvent) {
    e.preventDefault();
    if (!playerName.trim()) return;
    setSession({
      roomCode: createdRoomCode,
      playerName: playerName.trim(),
      role: "narrator",
      narratorKey,
    });
    navigate(`/room/${createdRoomCode}`);
  }

  return (
    <div className={screenClass}>
      <div className="mb-8 text-center">
        <h1 className={heroTitleClass}>CREATE ROOM</h1>
        <p className={heroSubClass}>Share these credentials with your players</p>
      </div>
      <Card className="w-full max-w-[480px]">
        <form onSubmit={handleEnterAsNarrator} className="flex flex-col gap-5">
          <div className={`${styles.credentials} rounded-lg px-5 py-4`}>
            <div className="mb-3 flex flex-col gap-1 last:mb-0">
              <span className="text-[0.72rem] font-bold uppercase tracking-[0.12em] text-text-muted">
                Room Code
              </span>
              <span className="break-all font-display text-[1.05rem] tracking-[0.1em] text-neon-cyan">
                {createdRoomCode}
              </span>
            </div>
            <div className="mb-3 flex flex-col gap-1 last:mb-0">
              <span className="text-[0.72rem] font-bold uppercase tracking-[0.12em] text-text-muted">
                Narrator Key
              </span>
              <span className="break-all font-display text-[0.72rem] tracking-[0.04em] text-neon-cyan">
                {narratorKey}
              </span>
              <span className="mt-[0.2rem] text-[0.72rem] italic text-text-muted">
                Keep this secret — proves you are the narrator
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-[0.4rem]">
            <label className={labelClass} htmlFor="narrator-name">Your Name</label>
            <InputText
              id="narrator-name"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Narrator name"
              autoFocus
            />
          </div>

          <div className={`${styles.formActions} flex items-center gap-3 pt-2`}>
            <button type="button" className={backBtnClass} onClick={() => navigate("/")}>
              ← Back
            </button>
            <Button
              type="submit"
              label="Enter as Narrator"
              icon="pi pi-sign-in"
              disabled={!playerName.trim()}
            />
          </div>
        </form>
      </Card>
    </div>
  );
}
