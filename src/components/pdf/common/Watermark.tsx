import type { CSSProperties } from "react";

export type WatermarkProps = {
  bglogo?: string;
  opacity?: number;
  width?: string;
  height?: string;
  className?: string;
  style?: CSSProperties;
};

export default function Watermark({
  bglogo,
  opacity = 0.13,
  width = "370px",
  height = "440px",
  className = "",
  style,
}: WatermarkProps) {
  if (!bglogo) return null;

  return (
    <div
      className={`absolute top-1/2 left-1/2 pointer-events-none mt-10 ${className}`}
      style={{
        transform: "translate(-50%, -50%)",
        backgroundImage: `url(${bglogo})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "contain",
        width,
        height,
        opacity,
        zIndex: 0,
        ...style,
      }}
    />
  );
}
