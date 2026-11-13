import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

const variants = {
  lime: "bg-se-lime text-olive-deep hover:bg-lime-soft",
  dark: "bg-[#232a0e] text-white hover:bg-olive-light",
  outline: "border border-[#d1d5db] text-[#1c220a] hover:bg-black/5",
  white: "bg-white text-olive-deep hover:bg-white/85",
};

type Props = {
  children: ReactNode;
  href?: string;
  variant?: keyof typeof variants;
  arrow?: boolean;
  className?: string;
};

export default function PillButton({
  children,
  href = "#",
  variant = "dark",
  arrow = true,
  className = "",
}: Props) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium transition-colors duration-300 ${variants[variant]} ${className}`}
    >
      {children}
      {arrow && (
        <ArrowRight
          size={16}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      )}
    </Link>
  );
}
