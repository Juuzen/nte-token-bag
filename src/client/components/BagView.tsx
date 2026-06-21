import type { Bag } from "@shared/protocol";

interface BagViewProps {
  bag: Bag;
}

export function BagView({ bag }: BagViewProps) {
  const total = bag.positive + bag.negative + bag.random;
  return (
    <section className="bag-view">
      <h2>Token Bag</h2>
      <div className="bag-counts">
        <div className="bag-token bag-token--positive">
          <span className="bag-token__count">{bag.positive}</span>
          <span className="bag-token__label">Positive</span>
        </div>
        <div className="bag-token bag-token--negative">
          <span className="bag-token__count">{bag.negative}</span>
          <span className="bag-token__label">Negative</span>
        </div>
        <div className="bag-token bag-token--random">
          <span className="bag-token__count">{bag.random}</span>
          <span className="bag-token__label">Random</span>
        </div>
      </div>
      <p className="bag-total">Total: {total} token{total !== 1 ? "s" : ""}</p>
    </section>
  );
}
