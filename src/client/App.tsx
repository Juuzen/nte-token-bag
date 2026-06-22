import { useEffect, useState } from "react";
import type { Role } from "@shared/protocol";
import { useRoom } from "./useRoom";
import { HexBackground } from "./components/HexBackground";
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
  isLocal?: boolean;
}

export function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <>
      <HexBackground />
      <button
        className="theme-toggle"
        onClick={() => setTheme(t => t === "dark" ? "light" : "dark")}
        aria-label="Toggle theme"
      >
        {theme === "dark" ? "☀" : "☾"}
      </button>
      {session === null ? (
        <JoinRoom onJoin={setSession} />
      ) : (
        <RoomView session={session} />
      )}
    </>
  );
}

function RoomView({ session }: { session: Session }) {
  const { isLocal } = session;
  const { state, role, myId, myName, roomCode, send, connected } =
    useRoom(session);

  if (!connected || state === null) {
    return <div className="loading">CONNECTING…</div>;
  }

  return (
    <div className="room-wrapper">
      <div className="room">
        <header className="room-header">
          <div>
            <div className="room-header__title">NtE Token Bag</div>
            {isLocal ? (
              <div className="room-header__code">LOCAL SESSION</div>
            ) : (
              <div className="room-header__code">ROOM: {roomCode}</div>
            )}
          </div>
          <div className="room-header__meta">
            <span className={`role-badge role-badge--${isLocal ? "local" : role}`}>
              {isLocal ? "local" : role}
            </span>
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
    </div>
  );
}
