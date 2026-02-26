import type { CSSProperties } from "react";

type PlaceholderProps = {
  className?: string;
  style?: CSSProperties;
  text?: string;
};

export default function Placeholder({
  className = "text-2xl font-bold",
  style,
  text = "...............................",
}: PlaceholderProps) {
  return (
    <span className={className} style={style}>
      {text}
    </span>
  );
}
