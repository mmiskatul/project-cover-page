import type { CSSProperties } from "react";

type NoDataMessageProps = {
  className?: string;
  style?: CSSProperties;
  text?: string;
};

export default function NoDataMessage({
  className = "text-center text-lg font-semibold mt-5",
  style,
  text = "No data submitted yet.",
}: NoDataMessageProps) {
  return (
    <h3 className={className} style={style}>
      {text}
    </h3>
  );
}
