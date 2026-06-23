import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useRoom } from "./useRoom";
import { SessionProvider, useSession } from "./SessionContext";
import type { Session } from "./SessionContext";
import { HexBackground } from "./components/HexBackground";
import { ChooseScreen } from "./components/ChooseScreen";
import { CreateRoomScreen } from "./components/CreateRoomScreen";
import { JoinRoomScreen } from "./components/JoinRoomScreen";
import { BagView } from "./components/BagView";
import { PlayerPanel } from "./components/PlayerPanel";
import { NarratorPanel } from "./components/NarratorPanel";
import { DrawLog } from "./components/DrawLog";
import styles from "./App.module.scss";

export function App() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <SessionProvider>
      <HexBackground />
      <button
        className={`${styles.themeToggle} glass-surface fixed top-4 right-4 z-[100] cursor-pointer px-[0.7rem] py-[0.45rem] text-[1.1rem] leading-none text-text`}
        onClick={() => setTheme(t => t === "dark" ? "light" : "dark")}
        aria-label="Toggle theme"
      >
        {theme === "dark" ? "☀" : "☾"}
      </button>
      <Routes>
        <Route path="/" element={<ChooseScreen />} />
        <Route path="/create" element={<CreateRoomScreen />} />
        <Route path="/join" element={<JoinRoomScreen />} />
        <Route path="/room/:roomCode" element={<RoomRoute />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </SessionProvider>
  );
}

function RoomRoute() {
  const { session } = useSession();
  if (session === null) {
    return <Navigate to="/join" replace />;
  }
  return <RoomView session={session} />;
}

function RoomView({ session }: { session: Session }) {
  const { isLocal } = session;
  const { state, role, myId, myName, roomCode, send, connected } =
    useRoom(session);

  if (!connected || state === null) {
    return (
      <div className={`${styles.loading} relative z-[1] flex min-h-screen items-center justify-center font-display text-base tracking-[0.2em] text-neon-cyan`}>
        CONNECTING…
      </div>
    );
  }

  const badgeClass = isLocal ? styles.badgeLocal : role === "narrator" ? styles.badgeNarrator : styles.badgePlayer;

  return (
    <div className="relative z-[1] min-h-screen p-4">
      <div className={`${styles.room} mx-auto grid max-w-[960px] items-start`}>
        <header className={`${styles.roomHeader} glass-surface flex items-center justify-between px-5 py-3`}>
          <div>
            <div className={`${styles.headerTitle} font-display text-[1.1rem] font-bold tracking-[0.1em] text-neon-cyan`}>
              NtE Token Bag
            </div>
            <div className="mt-[0.15rem] font-display text-[0.72rem] tracking-[0.1em] text-text-muted">
              {isLocal ? "LOCAL SESSION" : `ROOM: ${roomCode}`}
            </div>
          </div>
          <div className="flex items-center gap-3 text-[0.85rem]">
            <span className={`${badgeClass} font-display text-[0.65rem] font-bold uppercase tracking-[0.12em] rounded px-[0.6rem] py-[0.2rem]`}>
              {isLocal ? "local" : role}
            </span>
            <span className="font-medium text-text">{myName}</span>
            <span className={`${connected ? styles.connected : styles.disconnected} text-base`}>
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
