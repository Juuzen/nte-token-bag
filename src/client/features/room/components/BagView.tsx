import { useTranslation } from "react-i18next";
import type { Bag } from "@shared/protocol";
import styles from "./BagView.module.scss";

interface BagViewProps {
  bag: Bag;
}

const TOKEN_KINDS = ["positive", "negative", "random"] as const;

export function BagView({ bag }: BagViewProps) {
  const { t } = useTranslation();
  const total = bag.positive + bag.negative + bag.random;
  return (
    <section className={`${styles.bagView} glass-surface px-5 py-4`}>
      <div className="block-title">{t("bag.title")}</div>
      <div className="grid grid-cols-3 gap-3.5">
        {TOKEN_KINDS.map((kind) => (
          <div
            key={kind}
            className={`${styles.token} ${styles[kind]} flex flex-col items-center p-4 rounded-xl border-2 border-transparent`}
          >
            <span className="font-display text-5xl font-bold leading-none">{bag[kind]}</span>
            <span className="mt-[0.3rem] text-[0.7rem] font-bold uppercase tracking-[0.1em]">
              {t(`common.kind.${kind}`)}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-sm tracking-[0.04em] text-text-muted">
        {t("bag.total", { count: total })}
      </p>
    </section>
  );
}
