import { Fragment } from "react";
import { cv } from "@/lib/utils";

type Props = { text: string; as?: "h1" | "h2" | "h3"; className?: string };

/** Heading whose words blur in one by one when scrolled into view */
export default function SplitText({
  text,
  as: Tag = "h2",
  className = "",
}: Props) {
  return (
    <Tag data-split className={className}>
      {text.split(" ").map((word, i) => (
        <Fragment key={i}>
          <span className="w" style={cv("--i", i)}>
            {word}
          </span>{" "}
        </Fragment>
      ))}
    </Tag>
  );
}
