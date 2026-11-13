import type { ComponentPropsWithoutRef } from "react";

type WordmarkProps = Omit<ComponentPropsWithoutRef<"span">, "children">;

export function Wordmark({ className = "", ...props }: WordmarkProps) {
  return (
    <span
      className={`font-[family-name:var(--font-heading)] text-xl font-semibold leading-none tracking-tight text-off-white ${className}`.trim()}
      {...props}
    >
      StackEthic
    </span>
  );
}

export default Wordmark;
