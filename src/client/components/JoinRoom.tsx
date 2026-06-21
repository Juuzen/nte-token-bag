import { useState } from "react";
import type { Role } from "@shared/protocol";

interface JoinParams {
  roomCode: string;
  playerName: string;
  role: Role;
  narratorKey?: string;
}

interface JoinRoomProps {
  onJoin: (params: JoinParams) => void;
}

type Mode = "choose" | "create" | "join";

function generateRoomCode(): string {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 6).toUpperCase();
}

export function JoinRoom({ onJoin }: JoinRoomProps) {
  const [mode, setMode] = useState<Mode>("choose");
  const [playerName, setPlayerName] = useState("");

  // create mode
  const [createdRoomCode] = useState(() => generateRoomCode());
  const [narratorKey] = useState(() => crypto.randomUUID());

  // join mode
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

  if (mode === "choose") {
    return (
      <div className="join-room">
        <h1>NtE Token Bag</h1>
        <p>Welcome! Are you the narrator or a player?</p>
        <div className="join-room__choices">
          <button onClick={() => setMode("create")}>Create a room (Narrator)</button>
          <button onClick={() => setMode("join")}>Join a room (Player)</button>
        </div>
      </div>
    );
  }

  if (mode === "create") {
    return (
      <div className="join-room">
        <h1>Create a room</h1>
        <p>Share these details with your players before entering:</p>
        <dl className="room-credentials">
          <dt>Room code</dt>
          <dd>
            <code>{createdRoomCode}</code>
          </dd>
          <dt>Narrator key</dt>
          <dd>
            <code>{narratorKey}</code>
            <small> (keep this secret — proves you are the narrator)</small>
          </dd>
        </dl>
        <form onSubmit={handleEnterAsNarrator}>
          <label>
            Your name
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Narrator name"
              autoFocus
            />
          </label>
          <div className="join-room__actions">
            <button type="button" onClick={() => setMode("choose")}>
              Back
            </button>
            <button type="submit" disabled={!playerName.trim()}>
              Enter as Narrator
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="join-room">
      <h1>Join a room</h1>
      <form onSubmit={handleJoin}>
        <label>
          Room code
          <input
            type="text"
            value={roomCodeInput}
            onChange={(e) => setRoomCodeInput(e.target.value)}
            placeholder="e.g. A3F9B2"
            autoFocus
          />
        </label>
        <label>
          Your name
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Player name"
          />
        </label>
        <div className="join-room__actions">
          <button type="button" onClick={() => setMode("choose")}>
            Back
          </button>
          <button
            type="submit"
            disabled={!playerName.trim() || !roomCodeInput.trim()}
          >
            Join room
          </button>
        </div>
      </form>
    </div>
  );
}
