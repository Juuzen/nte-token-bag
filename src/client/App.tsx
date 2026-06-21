import { useState } from "react";
import type { Role } from "@shared/protocol";
import { useRoom } from "./useRoom";
import { JoinRoom } from "./components/JoinRoom";
import { BagView } from "./components/BagView";
import { PlayerPanel } from "./components/PlayerPanel";
import { NarratorPanel } from "./components/NarratorPanel";
import { DrawLog } from "./components/DrawLog";

interface Session {
  roomCode: string;
  playerName: string;
  role: Role;
  narratorKey?: string;
}

export function App() {
  const [session, setSession] = useState<Session | null>(null);

  if (session === null) {
    return <JoinRoom onJoin={setSession} />;
  }

  return <RoomView session={session} />;
}

function RoomView({ session }: { session: Session }) {
  const { state, role, myId, myName, roomCode, send, connected } =
    useRoom(session);

  if (!connected || state === null) {
    return <div className="loading">Connecting…</div>;
  }

  return (
    <div className="room">
      <header className="room-header">
        <div className="room-header__info">
          <h1>NtE Token Bag</h1>
          <span className="room-header__code">Room: {roomCode}</span>
        </div>
        <div className="room-header__meta">
          <span className="role-badge role-badge--{role}">{role}</span>
          <span className="player-name">{myName}</span>
          <span className={`connection-status ${connected ? "connected" : "disconnected"}`}>
            {connected ? "●" : "○"}
          </span>
        </div>
      </header>

      <BagView bag={state.bag} />

      {role === "player" && (
        <PlayerPanel
          myId={myId}
          myName={myName}
          pendingRequests={state.pendingRequests}
          send={send}
        />
      )}

      {role === "narrator" && (
        <NarratorPanel
          myId={myId}
          myName={myName}
          pendingRequests={state.pendingRequests}
          config={state.config}
          send={send}
        />
      )}

      <DrawLog history={state.history} />
    </div>
  );
}
