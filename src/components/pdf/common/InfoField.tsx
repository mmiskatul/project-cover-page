import type { CSSProperties, ReactNode } from "react";
import Placeholder from "./Placeholder";
import { capitalizeEachWord } from "./format";

export type InfoFieldProps = {
  label: string;
  value?: string | null | ReactNode;
  className?: string;
  labelClassName?: string;
  placeholderText?: string;
  placeholderClassName?: string;
  style?: CSSProperties;
  capitalize?: boolean;
};

export default function InfoField({
  label,
  value,
  className = "",
  labelClassName = "font-bold",
  placeholderText = "...............................",
  placeholderClassName = "text-xl font-bold",
  style,
  capitalize = true,
}: InfoFieldProps) {
  let displayValue: ReactNode = null;

  if (typeof value === "string") {
    displayValue = value.trim() ? (capitalize ? capitalizeEachWord(value) : value) : null;
  } else if (value !== undefined && value !== null) {
    displayValue = value;
  }

  return (
    <p className={className} style={style}>
      <span className={labelClassName}>{label}:</span>{" "}
      {displayValue || <Placeholder text={placeholderText} className={placeholderClassName} />}
    </p>
  );
}
