import { useState } from "react";
import type { Role } from "@shared/protocol";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";

interface JoinParams {
  roomCode: string;
  playerName: string;
  role: Role;
  narratorKey?: string;
  isLocal?: boolean;
}

interface JoinRoomProps {
  onJoin: (params: JoinParams) => void;
}

type Mode = "choose" | "create" | "join" | "local";

function generateRoomCode(): string {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 6).toUpperCase();
}

const ROLE_OPTIONS = [
  {
    mode: "create" as Mode,
    accent: "purple",
    glyph: "⬢",
    title: "NARRATOR",
    description: "Host a room and manage the token bag for your players",
  },
  {
    mode: "join" as Mode,
    accent: "cyan",
    glyph: "⬡",
    title: "PLAYER",
    description: "Join an existing room with a code from your narrator",
  },
  {
    mode: "local" as Mode,
    accent: "gold",
    glyph: "✦",
    title: "LOCAL",
    description: "Play solo — manage and draw from the bag without a room",
  },
];

export function JoinRoom({ onJoin }: JoinRoomProps) {
  const [mode, setMode] = useState<Mode>("choose");
  const [playerName, setPlayerName] = useState("");

  const [createdRoomCode] = useState(() => generateRoomCode());
  const [narratorKey] = useState(() => crypto.randomUUID());

  const [roomCodeInput, setRoomCodeInput] = useState("");

  function handleEnterAsNarrator(e: React.FormEvent) {
    e.preventDefault();
    if (!playerName.trim()) return;
    onJoin({
      roomCode: createdRoomCode,
      playerName: playerName.trim(),
      role: "narrator",
      narratorKey,
    });
  }

  function handleJoin(e: React.FormEvent) {
    e.preventDefault();
    if (!playerName.trim() || !roomCodeInput.trim()) return;
    onJoin({
      roomCode: roomCodeInput.trim().toUpperCase(),
      playerName: playerName.trim(),
      role: "player",
    });
  }

  function handleLocal(e: React.FormEvent) {
    e.preventDefault();
    onJoin({
      roomCode: "LOCAL",
      playerName: playerName.trim() || "Narrator",
      role: "narrator",
      isLocal: true,
    });
  }

  if (mode === "choose") {
    return (
      <div className="join-screen">
        <div className="join-hero">
          <h1 className="join-hero__title">NtE TOKEN BAG</h1>
          <p className="join-hero__sub">Not the End · Token Simulator</p>
        </div>
        <div className="role-select">
          {ROLE_OPTIONS.map(({ mode: m, accent, glyph, title, description }) => (
            <button
              key={m}
              className={`role-card role-card--${accent}`}
              onClick={() => setMode(m)}
            >
              <span className="role-card__glyph">{glyph}</span>
              <span className="role-card__title">{title}</span>
              <span className="role-card__desc">{description}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (mode === "create") {
    return (
      <div className="join-screen">
        <div className="join-hero">
          <h1 className="join-hero__title">CREATE ROOM</h1>
          <p className="join-hero__sub">Share these credentials with your players</p>
        </div>
        <Card className="join-card">
          <form onSubmit={handleEnterAsNarrator} className="join-form">
            <div className="room-credentials">
              <div className="room-credentials__row">
                <span className="room-credentials__label">Room Code</span>
                <span className="room-credentials__value">{createdRoomCode}</span>
              </div>
              <div className="room-credentials__row">
                <span className="room-credentials__label">Narrator Key</span>
                <span className="room-credentials__value" style={{ fontSize: "0.75rem" }}>
                  {narratorKey}
                </span>
                <span className="room-credentials__hint">Keep this secret — proves you are the narrator</span>
              </div>
            </div>

            <div className="join-form__field">
              <label className="join-form__label" htmlFor="narrator-name">Your Name</label>
              <InputText
                id="narrator-name"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Narrator name"
                autoFocus
              />
            </div>

            <div className="join-form__actions">
              <Button
                type="button"
                label="Back"
                className="p-button-outlined"
                icon="pi pi-arrow-left"
                onClick={() => setMode("choose")}
              />
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

  if (mode === "local") {
    return (
      <div className="join-screen">
        <div className="join-hero">
          <h1 className="join-hero__title">LOCAL SESSION</h1>
          <p className="join-hero__sub">Solo play — no room required</p>
        </div>
        <Card className="join-card">
          <form onSubmit={handleLocal} className="join-form">
            <div className="join-form__field">
              <label className="join-form__label" htmlFor="local-name">
                Your Name <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>(optional)</span>
              </label>
              <InputText
                id="local-name"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Narrator"
                autoFocus
              />
            </div>
            <div className="join-form__actions">
              <Button
                type="button"
                label="Back"
                className="p-button-outlined"
                icon="pi pi-arrow-left"
                onClick={() => setMode("choose")}
              />
              <Button
                type="submit"
                label="Play Solo"
                icon="pi pi-play"
              />
            </div>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className="join-screen">
      <div className="join-hero">
        <h1 className="join-hero__title">JOIN ROOM</h1>
        <p className="join-hero__sub">Enter the room credentials from your narrator</p>
      </div>
      <Card className="join-card">
        <form onSubmit={handleJoin} className="join-form">
          <div className="join-form__field">
            <label className="join-form__label" htmlFor="room-code">Room Code</label>
            <InputText
              id="room-code"
              value={roomCodeInput}
              onChange={(e) => setRoomCodeInput(e.target.value)}
              placeholder="e.g. A3F9B2"
              autoFocus
              style={{ textTransform: "uppercase", letterSpacing: "0.2em", fontFamily: "var(--font-display)" }}
            />
          </div>

          <div className="join-form__field">
            <label className="join-form__label" htmlFor="player-name">Your Name</label>
            <InputText
              id="player-name"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Player name"
            />
          </div>

          <div className="join-form__actions">
            <Button
              type="button"
              label="Back"
              className="p-button-outlined"
              icon="pi pi-arrow-left"
              onClick={() => setMode("choose")}
            />
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
