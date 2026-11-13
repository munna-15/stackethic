"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { ArrowUp, ArrowUpRight, Send } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { footer } from "@/data/landingContent";
import { serviceList } from "@/data/servicesContent";

/* ---------- Edit these ---------- */

const EXPLORE = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Case studies", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// Social links only show when you fill in a real URL
const SOCIALS_SOURCE = [
  { label: "LinkedIn", href: "", icon: "linkedin" },
  { label: "Facebook", href: "", icon: "facebook" },
  { label: "Instagram", href: "", icon: "instagram" },
  { label: "Telegram", href: "", icon: "telegram" },
] as const;

/* ---------- Icons (brand icons were removed from recent lucide-react) ---------- */

function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 16"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M8 1.2 1 8l7 6.8z" />
      <path d="M23 1.2h-5.5L9.5 8l8 6.8H23L15 8z" />
    </svg>
  );
}

function SocialIcon({
  name,
}: {
  name: (typeof SOCIALS_SOURCE)[number]["icon"];
}) {
  if (name === "telegram") return <Send size={16} aria-hidden />;
  if (name === "facebook")
    return (
      <svg
        viewBox="0 0 24 24"
        width="16"
        height="16"
        fill="currentColor"
        aria-hidden
      >
        <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v6h3v-6h3l1-3h-4v-2c0-.6.4-1 1-1z" />
      </svg>
    );
  if (name === "instagram")
    return (
      <svg
        viewBox="0 0 24 24"
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden
      >
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    );
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="currentColor"
      aria-hidden
    >
      <path d="M6.5 9.5H3.8V20h2.7V9.5zM5.2 4a1.6 1.6 0 100 3.2A1.6 1.6 0 005.2 4zM20.2 20h-2.7v-5.2c0-1.3-.5-2.1-1.6-2.1-.9 0-1.5.6-1.7 1.2-.1.2-.1.5-.1.8V20h-2.7V9.5h2.6v1.2c.4-.6 1.1-1.4 2.6-1.4 1.9 0 3.6 1.2 3.6 3.9V20z" />
    </svg>
  );
}

/* ---------- Small pieces ---------- */

const linkClass =
  "relative w-fit text-[14px] text-white/70 transition-colors duration-300 hover:text-se-lime after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-se-lime after:transition-all after:duration-300 hover:after:w-full sm:text-[15px]";

function ColumnTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 text-[11px] uppercase tracking-[0.16em] text-se-lime/80 sm:mb-5 sm:text-xs">
      {children}
    </p>
  );
}

/* ---------- Footer ---------- */

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref);

  // The giant wordmark rises into place as the footer scrolls into view
  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-wordmark]",
          { yPercent: 30 },
          {
            yPercent: 0,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top bottom",
              end: "bottom bottom",
              scrub: true,
            },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  const socials = SOCIALS_SOURCE.filter((s) => s.href);
  const year = new Date().getFullYear();

  return (
    <div className="bg-[#ecf7b8] px-3 pb-3 sm:px-6 sm:pb-6">
      <footer
        ref={ref}
        className="relative overflow-hidden rounded-[28px] bg-se-olive text-white sm:rounded-[32px]"
      >
        {/* Decoration */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -right-32 -top-24 size-[420px] rounded-full bg-se-lime/10 blur-3xl" />
          <div className="absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(60%_40%_at_15%_10%,#000,transparent)]" />
          <div className="absolute -right-56 -top-10 hidden size-[520px] rounded-full border border-white/[0.06] lg:block" />
        </div>

        <div className="page-container relative pt-12 sm:pt-16 lg:pt-20">
          {/* Columns: 2-up on mobile so the footer stays short */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-9 lg:grid-cols-[1.5fr_1fr_1.1fr_1.2fr] lg:gap-10">
            {/* Brand */}
            <div data-fade className="col-span-2 lg:col-span-1">
              <Link
                href="/"
                aria-label="StackEthic home"
                className="inline-flex items-center gap-2"
              >
                <LogoMark className="h-4 w-6" />
                <span className="font-se-display text-[24px] font-semibold leading-none tracking-[-0.04em] sm:text-[26px]">
                  StackEthic
                </span>
              </Link>
              <p className="mt-4 max-w-[22rem] text-sm text-[#b8c27d] sm:text-[15px]">
                {footer.tagline}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-se-lime px-5 py-3 text-sm font-medium text-se-olive transition-colors duration-300 hover:bg-white"
                >
                  Start a project
                  <ArrowUpRight
                    size={16}
                    aria-hidden
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="grid size-10 place-items-center rounded-full border border-white/20 transition-colors duration-300 hover:border-se-lime hover:bg-se-lime hover:text-se-olive"
                  >
                    <SocialIcon name={s.icon} />
                  </a>
                ))}
              </div>
            </div>

            {/* Explore */}
            <nav data-fade aria-label="Footer">
              <ColumnTitle>Explore</ColumnTitle>
              <ul className="flex flex-col gap-3 sm:gap-3.5">
                {EXPLORE.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className={linkClass}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Services */}
            <div data-fade>
              <ColumnTitle>Services</ColumnTitle>
              <ul className="flex flex-col gap-3 sm:gap-3.5">
                {serviceList.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services#${s.slug}`} className={linkClass}>
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div data-fade className="col-span-2 lg:col-span-1">
              <ColumnTitle>Contact</ColumnTitle>
              <ul className="flex flex-col gap-3 sm:gap-3.5">
                <li>
                  <a href={`mailto:${footer.email}`} className={linkClass}>
                    {footer.email}
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${footer.phone.replace(/\s/g, "")}`}
                    className={linkClass}
                  >
                    {footer.phone}
                  </a>
                </li>
                <li className="text-[14px] text-white/70 sm:text-[15px]">
                  {footer.location}
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-10 flex items-center justify-between gap-4 border-t border-white/10 py-5 text-xs text-white/50 sm:mt-14 sm:text-sm">
            <p>© {year} StackEthic. All rights reserved.</p>
            <p className="hidden md:block">Digital engineering studio</p>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group inline-flex items-center gap-2 text-white/70 transition-colors hover:text-se-lime"
            >
              <span className="hidden sm:inline">Back to top</span>
              <span className="grid size-9 place-items-center rounded-full border border-white/20 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-se-lime">
                <ArrowUp size={16} aria-hidden />
              </span>
            </button>
          </div>
        </div>

        {/* Giant wordmark, cropped at the bottom edge */}
        <div
          aria-hidden
          className="relative -mb-[0.18em] overflow-hidden text-center"
        >
          <p
            data-wordmark
            className="select-none bg-[linear-gradient(180deg,rgba(221,244,106,0.6),rgba(221,244,106,0.05)_85%)] bg-clip-text text-[clamp(56px,19vw,360px)] font-semibold leading-[0.86] tracking-[-0.06em] text-transparent [-webkit-text-stroke:1px_rgba(221,244,106,0.25)]"
          >
            StackEthic
          </p>
        </div>
      </footer>
    </div>
  );
}
