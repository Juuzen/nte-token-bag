import { useRoom } from "@client/features/room/api/useRoom";
import type { Session } from "@client/stores/session";
import { BagView } from "./BagView";
import { PlayerPanel } from "./PlayerPanel";
import { NarratorPanel } from "./NarratorPanel";
import { DrawLog } from "./DrawLog";
import styles from "./RoomView.module.scss";

export function RoomView({ session }: { session: Session }) {
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
