"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { footer } from "@/data/landingContent";

gsap.registerPlugin(useGSAP);

const EASE = [0.22, 1, 0.36, 1] as const;

type NavLink = { label: string; href: string };

// Desktop: left links | centered logo | right links + CTA
const LEFT_LINKS: NavLink[] = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
];

const RIGHT_LINKS: NavLink[] = [{ label: "Insights", href: "/insights" }];

const CTA = { label: "Let’s build", href: "/contact" };

// Mobile menu lists every link in one column
const MENU_LINKS: NavLink[] = [...LEFT_LINKS, ...RIGHT_LINKS];

/* Scroll distance (px) over which the bar morphs from transparent to the pill */
const MORPH_RANGE = 72;

/*
  --p goes from 0 (top of page) to 1 (scrolled). Everything that changes between the two
  states is calculated from it, so the bar morphs smoothly in both directions and
  always stays in sync with the scroll position (and with Lenis).
*/
const BAR_STYLE: CSSProperties = {
  width:
    "calc(min(100%, 1760px) + (min(100%, 1160px) - min(100%, 1760px)) * var(--p, 0))",
  paddingLeft: "calc(4px + 16px * var(--p, 0))",
  paddingRight: "calc(8px * var(--p, 0))",
};

// Brand mark + wordmark
function Logo({
  onClick,
  animated = false,
}: {
  onClick?: () => void;
  animated?: boolean;
}) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="StackEthic home"
      {...(animated ? { "data-nav-item": "" } : {})}
      className="inline-flex items-center gap-2 text-white"
    >
      <svg
        viewBox="0 0 24 16"
        aria-hidden="true"
        className="h-[14px] w-[21px] sm:h-4 sm:w-6"
        fill="currentColor"
      >
        <path d="M8 1.2 1 8l7 6.8z" />
        <path d="M23 1.2h-5.5L9.5 8l8 6.8H23L15 8z" />
      </svg>

      <span className="font-se-display text-[20px] font-semibold leading-none tracking-[-0.04em] sm:text-[24px]">
        StackEthic
      </span>
    </Link>
  );
}

// CTA button
function CtaButton({
  onClick,
  className = "",
  tone = "light",
  animated = false,
}: {
  onClick?: () => void;
  className?: string;
  tone?: "light" | "lime";
  animated?: boolean;
}) {
  const colors =
    tone === "lime"
      ? "bg-se-lime text-se-olive hover:bg-white"
      : "bg-white text-se-olive hover:bg-se-lime";

  return (
    <Link
      href={CTA.href}
      onClick={onClick}
      {...(animated ? { "data-nav-item": "" } : {})}
      className={`group inline-flex items-center gap-2 whitespace-nowrap rounded-full pl-4 pr-1.5 font-medium leading-none transition-colors duration-300 sm:pl-5 ${colors} ${className}`}
    >
      <span>{CTA.label}</span>

      <span className="inline-flex size-7 items-center justify-center rounded-full bg-se-olive text-se-lime transition-transform duration-500 group-hover:rotate-45 sm:size-8">
        <ArrowUpRight size={15} strokeWidth={2} aria-hidden="true" />
      </span>
    </Link>
  );
}

// Desktop link
function DesktopLink({ link, active }: { link: NavLink; active: boolean }) {
  return (
    <Link
      href={link.href}
      data-nav-item
      aria-current={active ? "page" : undefined}
      className={`group relative rounded-full px-4 py-2.5 text-[15px] leading-none transition-colors duration-300 hover:bg-white/10 hover:text-white ${
        active ? "text-white" : "text-white/70"
      }`}
    >
      {link.label}

      <span
        aria-hidden
        className={`absolute inset-x-0 -bottom-0.5 mx-auto size-1 rounded-full bg-se-lime transition-all duration-300 ${
          active
            ? "scale-100 opacity-100"
            : "scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-60"
        }`}
      />
    </Link>
  );
}

// Navbar
export default function Navbar() {
  const pathname = usePathname();

  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;

  const [hidden, setHidden] = useState(false);

  const scopeRef = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const openRef = useRef(false);

  useEffect(() => {
    openRef.current = open;
  }, [open]);

  const openMenu = () => setOpenPath(pathname);
  const closeMenu = () => setOpenPath(null);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  // Scroll: morph the bar (--p) + smart hide on scroll down + page progress
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      const delta = y - lastY;

      // Smooth 0 → 1 value with a gentle ease, drives the whole morph
      const t = Math.min(1, Math.max(0, y / MORPH_RANGE));
      const p = t * t * (3 - 2 * t);
      barRef.current?.style.setProperty("--p", p.toFixed(3));

      if (y <= 80) {
        setHidden(false);
        lastY = y;
      } else if (Math.abs(delta) > 6) {
        if (!openRef.current) setHidden(delta > 0);
        lastY = y;
      }

      // Page progress indicator
      const max = document.documentElement.scrollHeight - window.innerHeight;

      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${
          max > 0 ? Math.min(1, Math.max(0, y / max)) : 0
        })`;
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    const first = requestAnimationFrame(update);

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(first);
    };
  }, []);

  // Entrance animation
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-nav-item]", {
          y: -18,
          autoAlpha: 0,
          duration: 0.8,
          stagger: 0.07,
          delay: 0.1,
          ease: "power3.out",
        });
      });

      return () => mm.revert();
    },
    { scope: scopeRef },
  );

  // Menu: scroll lock, Escape and focus handling
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenPath(null);
    };

    window.addEventListener("keydown", onKeyDown);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      triggerRef.current?.focus();
    };
  }, [open]);

  // Close mobile menu when viewport grows to desktop
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");

    const onChange = () => {
      if (mq.matches) setOpenPath(null);
    };

    mq.addEventListener("change", onChange);

    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <>
      <header
        ref={scopeRef}
        onFocusCapture={() => setHidden(false)}
        className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-se ${
          hidden ? "-translate-y-[140%]" : "translate-y-0"
        }`}
      >
        <div className="px-3 pt-1 sm:px-6 sm:pt-3 lg:px-11 lg:pt-5">
          <div
            ref={barRef}
            style={BAR_STYLE}
            className="relative isolate mx-auto flex items-center justify-between py-2 lg:grid lg:grid-cols-[1fr_auto_1fr]"
          >
            {/* Pill background: fades in with scroll (blur, border and shadow included) */}
            <span
              aria-hidden
              style={{ opacity: "var(--p, 0)" }}
              className="pointer-events-none absolute inset-0 -z-10 rounded-full border border-white/10 bg-[#0c1107]/75 shadow-[0_24px_50px_-24px_rgba(0,0,0,0.7)] backdrop-blur-xl"
            />

            {/* Left links: Services, Work, About */}
            <nav
              aria-label="Primary"
              className="hidden items-center gap-1 lg:flex lg:justify-self-start"
            >
              {LEFT_LINKS.map((link) => (
                <DesktopLink
                  key={link.href}
                  link={link}
                  active={isActive(link.href)}
                />
              ))}
            </nav>

            {/* Logo: left on mobile, centered on desktop */}
            <div className="lg:justify-self-center">
              <Logo animated />
            </div>

            {/* Right: Insights, CTA and mobile menu */}
            <div className="flex items-center gap-1 lg:justify-self-end">
              <nav
                aria-label="Secondary"
                className="hidden items-center gap-1 lg:flex"
              >
                {RIGHT_LINKS.map((link) => (
                  <DesktopLink
                    key={link.href}
                    link={link}
                    active={isActive(link.href)}
                  />
                ))}
              </nav>

              <div className="flex items-center gap-2 lg:ml-2">
                <CtaButton
                  animated
                  className="h-10 text-[13px] sm:h-11 sm:text-[15px]"
                />

                <button
                  ref={triggerRef}
                  type="button"
                  data-nav-item
                  aria-label="Open menu"
                  aria-expanded={open}
                  aria-controls="se-menu"
                  onClick={openMenu}
                  className="inline-flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-sm transition-colors duration-300 hover:bg-white/20 sm:size-11 lg:hidden"
                >
                  <Menu size={18} strokeWidth={1.75} aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Page progress indicator (fades in together with the pill) */}
            <span
              aria-hidden
              style={{ opacity: "var(--p, 0)" }}
              className="pointer-events-none absolute inset-x-6 bottom-0 h-px overflow-hidden"
            >
              <span
                ref={progressRef}
                className="block h-full origin-left scale-x-0 bg-se-lime"
              />
            </span>
          </div>
        </div>
      </header>

      {/* Full-screen mobile and tablet menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="se-menu"
            data-lenis-prevent
            role="dialog"
            aria-modal="true"
            aria-label="Main menu"
            className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-[#0b1006] px-4 pb-8 pt-4 text-white sm:px-6 sm:pt-6 lg:hidden"
            initial={{
              clipPath: "inset(0% 0% 100% 0% round 0px 0px 32px 32px)",
            }}
            animate={{
              clipPath: "inset(0% 0% 0% 0% round 0px 0px 0px 0px)",
            }}
            exit={{
              clipPath: "inset(0% 0% 100% 0% round 0px 0px 32px 32px)",
            }}
            transition={{ duration: 0.65, ease: EASE }}
          >
            {/* Menu decoration */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 overflow-hidden"
            >
              <div className="absolute -right-24 -top-24 size-[420px] rounded-full bg-se-lime/15 blur-3xl" />
              <div className="absolute -bottom-32 -left-24 size-[420px] rounded-full bg-[#4f6b1c]/30 blur-3xl" />
              <div className="absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:26px_26px] [mask-image:radial-gradient(70%_50%_at_80%_10%,#000,transparent)]" />
            </div>

            <div className="relative flex items-center justify-between">
              <Logo onClick={closeMenu} />

              <button
                ref={closeRef}
                type="button"
                aria-label="Close menu"
                onClick={closeMenu}
                className="inline-flex size-10 items-center justify-center rounded-full bg-se-lime text-se-olive transition-transform duration-300 hover:rotate-90 sm:size-11"
              >
                <X size={18} strokeWidth={2} aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="Menu" className="relative my-auto py-10">
              <ul className="border-t border-white/10">
                {MENU_LINKS.map((link, i) => {
                  const active = isActive(link.href);

                  return (
                    <motion.li
                      key={link.href}
                      className="border-b border-white/10"
                      initial={{ y: 40, opacity: 0 }}
                      animate={{
                        y: 0,
                        opacity: 1,
                        transition: {
                          delay: 0.25 + i * 0.07,
                          duration: 0.7,
                          ease: EASE,
                        },
                      }}
                      exit={{ opacity: 0, transition: { duration: 0.2 } }}
                    >
                      <Link
                        href={link.href}
                        onClick={closeMenu}
                        aria-current={active ? "page" : undefined}
                        className="group flex items-center gap-4 py-5 sm:py-6"
                      >
                        <span className="w-6 text-sm tabular-nums text-white/40">
                          0{i + 1}
                        </span>

                        <span
                          className={`font-se-display text-[clamp(2rem,8vw,4rem)] leading-none tracking-[-0.035em] transition-colors duration-300 group-hover:text-se-lime ${
                            active ? "text-se-lime" : "text-white"
                          }`}
                        >
                          {link.label}
                        </span>

                        <ArrowUpRight
                          aria-hidden
                          className="ml-auto size-6 text-white/30 transition-all duration-300 group-hover:rotate-45 group-hover:text-se-lime"
                        />
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            <motion.div
              className="relative flex flex-col gap-5"
              initial={{ y: 24, opacity: 0 }}
              animate={{
                y: 0,
                opacity: 1,
                transition: { delay: 0.65, duration: 0.6, ease: EASE },
              }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
            >
              <CtaButton
                onClick={closeMenu}
                tone="lime"
                className="h-14 w-full justify-between text-base sm:w-auto sm:justify-start sm:gap-6"
              />

              <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-white/50">
                {footer.email ? (
                  <a
                    href={`mailto:${footer.email}`}
                    className="transition-colors duration-300 hover:text-se-lime"
                  >
                    {footer.email}
                  </a>
                ) : (
                  <span />
                )}

                <span>{footer.location}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
