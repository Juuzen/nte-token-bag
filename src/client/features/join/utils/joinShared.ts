import styles from "../components/JoinRoom.module.scss";

// Shared Tailwind className strings used across the join-flow screens
// (ChooseScreen / CreateRoomScreen / JoinRoomScreen).

export const screenClass =
  "relative z-[1] flex min-h-screen flex-col items-center justify-center p-4";
export const heroTitleClass =
  "neon-text-cyan mb-2 font-display text-[clamp(2rem,6vw,3.5rem)] font-black uppercase leading-[1.1] tracking-[0.12em] text-neon-cyan";
export const heroSubClass =
  "font-body text-[0.9rem] uppercase tracking-[0.18em] text-text-muted";
export const labelClass =
  "text-[0.78rem] font-semibold uppercase tracking-[0.1em] text-neon-cyan";
export const backBtnClass = `${styles.backBtn} flex flex-shrink-0 cursor-pointer items-center gap-[0.3rem] whitespace-nowrap rounded-md bg-transparent px-3.5 py-2 text-[0.85rem]`;
