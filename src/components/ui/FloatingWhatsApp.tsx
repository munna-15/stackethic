"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import {
  ArrowRight,
  ArrowUpRight,
  Headset,
  Mail,
  MessageCircle,
  Phone,
  X,
  type LucideIcon,
} from "lucide-react";

import { footer } from "@/data/landingContent";

/* ---------- Edit these ---------- */

const PHONE = "8801792960610";
const MESSAGE = "Hi StackEthic, I'd like to discuss a project.";
const EASE = [0.22, 1, 0.36, 1] as const;

// +880 1792 960610
const phoneLabel = `+${PHONE.slice(0, 3)} ${PHONE.slice(3, 7)} ${PHONE.slice(7)}`;

type Action = {
  key: string;
  href: string;
  external?: boolean;
  icon: LucideIcon;
  title: string;
  sub: string;
  primary?: boolean;
};

const ACTIONS: Action[] = [
  {
    key: "whatsapp",
    href: `https://wa.me/${PHONE}?text=${encodeURIComponent(MESSAGE)}`,
    external: true,
    icon: MessageCircle,
    title: "WhatsApp us",
    sub: "Chat about your project",
    primary: true,
  },
  {
    key: "call",
    href: `tel:+${PHONE}`,
    icon: Phone,
    title: "Call us",
    sub: phoneLabel,
  },
  {
    key: "email",
    href: `mailto:${footer.email}`,
    icon: Mail,
    title: "Email us",
    sub: footer.email,
  },
];

/* ---------- Animation ---------- */

const list: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.12,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: EASE,
    },
  },
};

/* ---------- Component ---------- */

export default function FloatingWhatsApp() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  /* Close with Escape or by clicking outside */
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };

    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);

    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  return (
    <motion.div
      ref={rootRef}
      /* Mobile: top-right, 30px from top.
         Desktop: unchanged, docked to the right edge and vertically centered. */
      className="fixed right-4 top-[30%] z-40 sm:right-6 lg:top-1/2 lg:right-0 lg:bottom-auto lg:-translate-y-1/2"
      initial={reduce ? false : { opacity: 0, x: 28 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        delay: reduce ? 0 : 2.4,
        duration: 0.9,
        ease: EASE,
      }}
    >
      {/* Contact panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="se-contact-panel"
            role="dialog"
            aria-label="Contact StackEthic"
            className="absolute top-[calc(100%+12px)] right-0 w-[min(340px,calc(100vw-2rem))] origin-top-right overflow-hidden rounded-[28px] border border-white/10 bg-[#0e1308]/95 p-4 text-white shadow-[0_30px_80px_-20px_rgba(0,0,0,0.75)] backdrop-blur-2xl lg:top-1/2 lg:right-[calc(100%+14px)] lg:bottom-auto lg:origin-right lg:-translate-y-1/2"
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{
              opacity: 0,
              scale: 0.94,
              y: 10,
              transition: { duration: 0.2 },
            }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            {/* Decoration */}
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <div className="absolute -right-16 -top-16 size-[220px] rounded-full bg-se-lime/20 blur-3xl" />
              <div className="absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(70%_50%_at_90%_0%,#000,transparent)]" />
            </div>

            <motion.div
              className="relative"
              variants={list}
              initial="hidden"
              animate="show"
            >
              {/* Header */}
              <motion.div variants={item} className="px-1 pb-4 pt-1">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-se-lime">
                  <span className="relative flex size-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-se-lime/60" />
                    <span className="relative inline-flex size-1.5 rounded-full bg-se-lime" />
                  </span>
                  Available for new projects
                </span>

                <p className="mt-3 text-[22px] font-medium leading-[1.1] tracking-[-0.03em]">
                  Let’s talk about your project.
                </p>

                <p className="mt-1.5 text-[13px] text-white/55">
                  Pick the way that suits you best.
                </p>
              </motion.div>

              {/* Actions */}
              <div className="space-y-2">
                {ACTIONS.map((a) => {
                  const Icon = a.icon;

                  return (
                    <motion.a
                      key={a.key}
                      variants={item}
                      href={a.href}
                      {...(a.external
                        ? {
                            target: "_blank",
                            rel: "noopener noreferrer",
                          }
                        : {})}
                      className={`group flex items-center gap-3 rounded-[18px] p-3 transition-colors duration-300 ${
                        a.primary
                          ? "bg-se-lime text-se-olive hover:bg-white"
                          : "border border-white/10 bg-white/[0.06] hover:bg-white/10"
                      }`}
                    >
                      <span
                        className={`grid size-11 shrink-0 place-items-center rounded-[14px] ${
                          a.primary
                            ? "bg-se-olive text-se-lime"
                            : "bg-white/10 text-se-lime"
                        }`}
                      >
                        <Icon size={20} strokeWidth={1.8} aria-hidden />
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="block text-[14px] font-semibold leading-tight">
                          {a.title}
                        </span>

                        <span
                          className={`mt-0.5 block truncate text-[12px] ${
                            a.primary ? "text-se-olive/70" : "text-white/55"
                          }`}
                        >
                          {a.sub}
                        </span>
                      </span>

                      <ArrowUpRight
                        size={17}
                        aria-hidden
                        className={`shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${
                          a.primary ? "text-se-olive" : "text-white/50"
                        }`}
                      />
                    </motion.a>
                  );
                })}
              </div>

              {/* Form link */}
              <motion.div
                variants={item}
                className="mt-3 border-t border-white/10 pt-3"
              >
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="group flex items-center justify-between rounded-xl px-2 py-2 text-[13px] text-white/70 transition-colors duration-300 hover:text-se-lime"
                >
                  Prefer a form? Start a project
                  <ArrowRight
                    size={15}
                    aria-hidden
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((p) => !p)}
        aria-expanded={open}
        aria-controls="se-contact-panel"
        aria-label={open ? "Close contact menu" : "Open contact menu"}
        className="group relative flex size-14 items-center justify-center rounded-full border border-se-lime/25 bg-[#10150a]/95 text-se-lime shadow-[0_18px_40px_-12px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all duration-500 hover:border-se-lime/50 hover:bg-[#1a2109] active:scale-95 lg:h-auto lg:w-[54px] lg:flex-col lg:gap-3.5 lg:rounded-l-[24px] lg:rounded-r-none lg:border-r-0 lg:py-6 lg:hover:-translate-x-1"
      >
        {/* Soft pulse ring while closed (mobile) */}
        {!open && (
          <span
            aria-hidden
            className="absolute inset-0 animate-ping rounded-full border border-se-lime/30 [animation-duration:2.8s] lg:hidden"
          />
        )}

        {/* Icon: headset turns into a cross */}
        <span className="relative grid size-6 place-items-center">
          <span
            className={`absolute transition-all duration-500 ${
              open
                ? "rotate-90 scale-50 opacity-0"
                : "rotate-0 scale-100 opacity-100"
            }`}
          >
            <Headset size={23} strokeWidth={1.6} aria-hidden />
          </span>

          <span
            className={`absolute transition-all duration-500 ${
              open
                ? "rotate-0 scale-100 opacity-100"
                : "-rotate-90 scale-50 opacity-0"
            }`}
          >
            <X size={22} strokeWidth={1.7} aria-hidden />
          </span>
        </span>

        {/* Vertical label (desktop only) */}
        <span className="hidden rotate-180 text-[11px] font-medium uppercase tracking-[0.22em] text-white/80 [writing-mode:vertical-rl] lg:block">
          Talk to us
        </span>

        {/* Live status dot */}
        {!open && (
          <span
            aria-hidden
            className="absolute right-2 top-2 size-2.5 rounded-full border-2 border-[#10150a] bg-se-lime lg:left-1/2 lg:right-auto lg:top-2.5 lg:-translate-x-1/2"
          >
            <span className="absolute inset-0 animate-ping rounded-full bg-se-lime opacity-60" />
          </span>
        )}
      </button>
    </motion.div>
  );
}
