import { useTranslation } from "react-i18next";
import type { DrawnToken } from "@shared/protocol";
import styles from "./DrawLog.module.scss";

interface DrawLogProps {
  history: DrawnToken[];
}

const KIND_COLOR: Record<string, string> = {
  positive: "text-neon-green",
  negative: "text-neon-red",
  random: "text-neon-orange",
};

export function DrawLog({ history }: DrawLogProps) {
  const { t } = useTranslation();
  return (
    <section className={`${styles.drawLog} glass-surface px-5 py-4`}>
      <div className="block-title">{t("drawLog.title")}</div>
      {history.length === 0 ? (
        <p className="text-[0.88rem] italic text-text-muted">{t("drawLog.empty")}</p>
      ) : (
        <ul className={`${styles.list} flex list-none flex-col gap-[0.3rem]`}>
          {history.map((entry) => (
            <li
              key={entry.id}
              className={`${styles.entry} flex flex-wrap items-center gap-[0.3rem] rounded-md px-[0.6rem] py-[0.35rem] text-[0.85rem]`}
            >
              <span className="font-bold text-text">{entry.by}</span>
              {` ${t("drawLog.drew")} `}
              <span className={`font-semibold ${KIND_COLOR[entry.drawn]}`}>
                {t(`common.kind.${entry.drawn}`)}
              </span>
              {" → "}
              <span
                className={
                  entry.drawn === "random"
                    ? `font-bold ${KIND_COLOR[entry.resolved]}`
                    : undefined
                }
              >
                {t(`common.kind.${entry.resolved}`)}
              </span>
              <time
                className="ml-auto font-display text-xs tracking-[0.04em] text-text-muted"
                dateTime={new Date(entry.at).toISOString()}
              >
                {new Date(entry.at).toLocaleTimeString()}
              </time>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
