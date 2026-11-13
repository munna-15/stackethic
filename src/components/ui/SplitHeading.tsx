import { Fragment } from "react";

type Props = {
  text: string;
  /** word indexes (0-based) shown in the muted two-tone color */
  muted?: number[];
  as?: "h1" | "h2" | "h3";
  className?: string;
};

/** Heading split into words. useScrollReveal animates the .se-word spans. */
export default function SplitHeading({
  text,
  muted = [],
  as: Tag = "h2",
  className = "",
}: Props) {
  return (
    <Tag data-split className={`se-heading ${className}`}>
      {text.split(" ").map((word, i) => (
        <Fragment key={i}>
          <span
            className={`se-word ${muted.includes(i) ? "text-[#8e967e]" : ""}`}
          >
            {word}
          </span>{" "}
        </Fragment>
      ))}
    </Tag>
  );
}
