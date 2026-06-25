import { useNavigate } from "react-router-dom";
import { useSession } from "@client/stores/session";
import { screenClass, heroTitleClass, heroSubClass } from "../utils/joinShared";
import styles from "./JoinRoom.module.scss";

const ROLE_OPTIONS = [
  {
    path: "/create" as const,
    accent: "purple" as const,
    glyph: "⬢",
    title: "NARRATOR",
    description: "Host a room. Set the bag. Run the session.",
  },
  {
    path: "/join" as const,
    accent: "cyan" as const,
    glyph: "⬡",
    title: "PLAYER",
    description: "Enter a room code from your narrator.",
  },
];

export function ChooseScreen() {
  const navigate = useNavigate();
  const { setSession } = useSession();

  function enterLocal() {
    setSession({
      roomCode: "LOCAL",
      playerName: "Narrator",
      role: "narrator",
      isLocal: true,
    });
    navigate("/room/LOCAL");
  }

  return (
    <div className={screenClass}>
      <div className="mb-8 text-center">
        <h1 className={heroTitleClass}>NtE TOKEN BAG</h1>
        <p className={heroSubClass}>Not the End · Token Simulator</p>
      </div>
      <div className="flex w-full max-w-[700px] gap-4 max-[600px]:max-w-[400px] max-[600px]:flex-col">
        {ROLE_OPTIONS.map(({ path, accent, glyph, title, description }) => (
          <button
            key={path}
            className={`${styles.card} ${styles[accent]} flex flex-1 cursor-pointer flex-col items-center gap-2.5 rounded-xl px-7 pt-10 pb-9 text-center`}
            onClick={() => navigate(path)}
          >
            <span className={`${styles.glyph} text-5xl leading-none`}>{glyph}</span>
            <span className={`${styles.title} mt-1.5 font-display text-[0.85rem] font-bold tracking-[0.15em]`}>
              {title}
            </span>
            <span className="mt-1 max-w-[22ch] text-[0.82rem] leading-[1.55] text-text-muted">
              {description}
            </span>
          </button>
        ))}
      </div>
      <div className="mt-1 flex w-full max-w-[700px] flex-col items-center gap-3.5 max-[600px]:max-w-[400px]">
        <div className={`${styles.divider} flex w-full items-center gap-3.5`}>
          <span className="font-display text-[0.65rem] uppercase tracking-[0.18em] text-text-muted">
            or
          </span>
        </div>
        <button
          className={`${styles.soloBtn} flex cursor-pointer items-center gap-3.5 rounded-[10px] bg-transparent px-8 py-3.5`}
          onClick={enterLocal}
        >
          <span className={`${styles.soloGlyph} text-2xl leading-none`}>✦</span>
          <span className="font-display text-[0.78rem] font-bold uppercase tracking-[0.14em]">
            LOCAL
          </span>
          <span className="text-[0.78rem] text-text-muted">Solo play · no network needed</span>
        </button>
      </div>
    </div>
  );
}
