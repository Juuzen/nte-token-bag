import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { useSession } from "../SessionContext";
import { screenClass, heroTitleClass, heroSubClass, labelClass, backBtnClass } from "./joinShared";
import styles from "./JoinRoom.module.scss";

export function JoinRoomScreen() {
  const navigate = useNavigate();
  const { setSession } = useSession();
  const [playerName, setPlayerName] = useState("");
  const [roomCodeInput, setRoomCodeInput] = useState("");

  function handleJoin(e: React.FormEvent) {
    e.preventDefault();
    if (!playerName.trim() || !roomCodeInput.trim()) return;
    const code = roomCodeInput.trim().toUpperCase();
    setSession({
      roomCode: code,
      playerName: playerName.trim(),
      role: "player",
    });
    navigate(`/room/${code}`);
  }

  return (
    <div className={screenClass}>
      <div className="mb-8 text-center">
        <h1 className={heroTitleClass}>JOIN ROOM</h1>
        <p className={heroSubClass}>Enter the room credentials from your narrator</p>
      </div>
      <Card className="w-full max-w-[480px]">
        <form onSubmit={handleJoin} className="flex flex-col gap-5">
          <div className="flex flex-col gap-[0.4rem]">
            <label className={labelClass} htmlFor="room-code">Room Code</label>
            <InputText
              id="room-code"
              value={roomCodeInput}
              onChange={(e) => setRoomCodeInput(e.target.value)}
              placeholder="e.g. A3F9B2"
              autoFocus
              style={{ textTransform: "uppercase", letterSpacing: "0.2em", fontFamily: "var(--font-display)" }}
            />
          </div>

          <div className="flex flex-col gap-[0.4rem]">
            <label className={labelClass} htmlFor="player-name">Your Name</label>
            <InputText
              id="player-name"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Player name"
            />
          </div>

          <div className={`${styles.formActions} flex items-center gap-3 pt-2`}>
            <button type="button" className={backBtnClass} onClick={() => navigate("/")}>
              ← Back
            </button>
            <Button
              type="submit"
              label="Join Room"
              icon="pi pi-sign-in"
              disabled={!playerName.trim() || !roomCodeInput.trim()}
            />
          </div>
        </form>
      </Card>
    </div>
  );
}
