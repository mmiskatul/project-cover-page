import type { CSSProperties, ReactNode } from "react";

export type CoverSheetProps = {
  children: ReactNode;
  id?: string;
  className?: string;
  sheetClassName?: string;
  sheetStyle?: CSSProperties;
};

export default function CoverSheet({
  children,
  id = "cover-preview",
  sheetClassName = "mx-auto relative bg-white text-black shadow-sm",
  sheetStyle,
}: CoverSheetProps) {
  return (
    <div
      id={id}
      className={sheetClassName}
      style={{
        width: "794px",
        minHeight: "1123px",
        height: "1123px",
        padding: "50px 40px",
        boxSizing: "border-box",
        overflow: "hidden",
        fontFamily: "Gupter, sans-serif",
        backgroundColor: "#ffffff",
        ...sheetStyle,
      }}
    >
      {children}
    </div>
  );
}
