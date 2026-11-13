import type { CSSProperties } from "react";

/** Sets a CSS variable inline, e.g. style={cv("--d", 2)} for stagger delays */
export const cv = (name: string, value: number | string) =>
  ({ [name]: value }) as CSSProperties;
