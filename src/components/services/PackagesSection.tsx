"use client";

import { useRef } from "react";
import {
  Check,
  Layers,
  Rocket,
  Sparkles,
  Star,
  type LucideIcon,
} from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { packages } from "@/data/servicesContent";
import SplitHeading from "@/components/ui/SplitHeading";
import PillButton from "@/components/ui/PillButton";

// One icon per package, in the same order as the packages in servicesContent.ts
const icons: LucideIcon[] = [Sparkles, Rocket, Layers];

/**
 * Card colors, in package order:
 *  1. pale lime  2. deep olive (the dark, emphasized one)  3. sage green
 * Change the hex values here to adjust the colors.
 */
const tones = [
  {
    dark: false,
    box: "bg-[linear-gradient(160deg,#f3fbbf_0%,#e0f27a_100%)] text-[#1e240b] hover:shadow-[0_32px_50px_-30px_rgba(120,140,20,0.7)]",
    sub: "text-[#4a5a1a]",
    label: "text-[#4a5a1a]/70",
    line: "border-[#1e240b]/15",
    iconBox: "bg-se-olive text-se-lime",
    check: "bg-se-olive text-se-lime",
    glow: "bg-white/60",
    dots: "rgba(30,36,11,0.14)",
    ring: "border-[#1e240b]/10",
    button: "dark" as const,
  },
  {
    dark: true,
    box: "bg-[linear-gradient(160deg,#3d4809_0%,#222909_100%)] text-white shadow-[0_40px_80px_-40px_rgba(30,36,11,0.85)]",
    sub: "text-[#c8d0b8]",
    label: "text-se-lime/80",
    line: "border-white/15",
    iconBox: "bg-se-lime text-se-olive",
    check: "bg-se-lime text-se-olive",
    glow: "bg-se-lime/25",
    dots: "rgba(255,255,255,0.12)",
    ring: "border-white/10",
    button: "lime" as const,
  },
  {
    dark: false,
    box: "bg-[linear-gradient(160deg,#dfeab8_0%,#a9c46a_100%)] text-[#1e240b] hover:shadow-[0_32px_50px_-30px_rgba(60,90,20,0.7)]",
    sub: "text-[#3f5016]",
    label: "text-[#3f5016]/70",
    line: "border-[#1e240b]/15",
    iconBox: "bg-se-olive text-se-lime",
    check: "bg-se-olive text-se-lime",
    glow: "bg-white/50",
    dots: "rgba(30,36,11,0.14)",
    ring: "border-[#1e240b]/10",
    button: "dark" as const,
  },
];

export default function PackagesSection() {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref);

  return (
    <section
      ref={ref}
      id="packages"
      className="relative overflow-hidden bg-[#f4f6ea] text-[#1c220a]"
    >
      {/* Decoration */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-10 size-[460px] rounded-full bg-se-lime/25 blur-3xl" />
        <div className="absolute -right-40 bottom-0 size-[420px] rounded-full bg-[#9bb35a]/20 blur-3xl" />
        <div className="absolute inset-0 [background-image:radial-gradient(rgba(45,51,0,0.12)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(50%_40%_at_85%_8%,#000,transparent)]" />
      </div>

      <div className="page-container relative pb-28 pt-24 lg:pb-36 lg:pt-32">
        {/* Header */}
        <div className="mb-14 flex flex-col justify-between gap-6 lg:mb-20 lg:flex-row lg:items-end">
          <div>
            <span
              data-fade
              className="inline-flex items-center gap-2 rounded-full border border-[#d1d5db] bg-white/70 px-4 py-1.5 text-sm text-[#5c6152]"
            >
              <span className="size-1.5 rounded-full bg-se-olive" />
              Packages
            </span>
            <SplitHeading
              text={packages.title}
              className="mt-5 max-w-[11em] text-[clamp(32px,4.2vw,60px)]"
            />
          </div>
          <p data-fade className="max-w-[340px] text-base text-[#5c6152]">
            {packages.text}
          </p>
        </div>

        {/* Cards */}
        <div className="grid items-stretch gap-5 lg:grid-cols-3 lg:gap-6">
          {packages.items.map((p, i) => {
            const Icon = icons[i % icons.length];
            const t = tones[i % tones.length];
            const featured = Boolean(p.featured); // shows the "Most popular" tag
            const emphasized = t.dark || featured; // taller card on desktop

            return (
              <article
                key={p.name}
                data-card
                className={`group relative flex flex-col overflow-hidden rounded-[28px] p-8 transition-[translate,box-shadow] duration-700 ease-se hover:-translate-y-1.5 sm:p-9 ${t.box} ${
                  emphasized ? "lg:-my-5 lg:py-12" : ""
                }`}
              >
                {/* Card decoration: glow, dot pattern and ring in the card's own color */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                >
                  <div
                    className={`absolute -right-24 -top-24 size-[320px] rounded-full blur-3xl ${t.glow}`}
                  />
                  <div
                    className="absolute inset-0 [background-size:24px_24px] [mask-image:radial-gradient(70%_50%_at_80%_0%,#000,transparent)]"
                    style={{
                      backgroundImage: `radial-gradient(${t.dots} 1px, transparent 1px)`,
                    }}
                  />
                  <div
                    className={`absolute -bottom-32 -left-20 size-[300px] rounded-full border ${t.ring}`}
                  />
                </div>

                {/* Top: icon and badge */}
                <div
                  data-item
                  className="relative flex items-start justify-between"
                >
                  <span
                    className={`grid size-12 place-items-center rounded-2xl ${t.iconBox}`}
                  >
                    <Icon size={22} aria-hidden />
                  </span>
                  {featured && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-se-olive px-3 py-1.5 text-xs font-medium text-se-lime">
                      <Star size={12} aria-hidden fill="currentColor" />
                      Most popular
                    </span>
                  )}
                </div>

                {/* Name and description */}
                <div data-item className="relative mt-8">
                  <h3 className="text-[28px] leading-[1.05]">{p.name}</h3>
                  <p className={`mt-2 text-[15px] ${t.sub}`}>{p.blurb}</p>
                </div>

                {/* Price */}
                <div
                  data-item
                  className={`relative mt-8 border-y py-6 ${t.line}`}
                >
                  <span
                    className={`block h-4 text-xs uppercase leading-4 tracking-[0.14em] ${t.label}`}
                  >
                    {p.note || "\u00A0"}
                  </span>
                  {/* Numbers like "$2,500" are shown big; words like "Custom quote" smaller */}
                  <p
                    className={`mt-1 font-medium tracking-[-0.04em] ${
                      /\d/.test(p.price)
                        ? "text-[clamp(38px,4vw,56px)] leading-none"
                        : "text-[clamp(24px,2.3vw,32px)] leading-[1.15]"
                    }`}
                  >
                    {p.price}
                  </p>
                </div>

                {/* Features */}
                <ul
                  data-item
                  className="relative mt-7 flex-1 space-y-3.5 text-[15px]"
                >
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <span
                        className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full ${t.check}`}
                      >
                        <Check size={12} strokeWidth={2.5} aria-hidden />
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                {/* Button */}
                <div data-item className="relative mt-10">
                  <PillButton
                    href="/contact"
                    variant={t.button}
                    className="w-full justify-between"
                  >
                    Get started
                  </PillButton>
                </div>
              </article>
            );
          })}
        </div>

        {/* Custom plan strip */}
        <div
          data-fade
          className="mt-14 flex flex-col items-start justify-between gap-5 rounded-[24px] border border-[#e0e4d0] bg-white/70 p-6 backdrop-blur-sm sm:flex-row sm:items-center sm:p-8 lg:mt-20"
        >
          <p className="whitespace-nowrap text-[clamp(15px,4.3vw,24px)]">
            Need a custom plan?
            <span className="text-[#8e967e]"> Let’s talk.</span>
          </p>
          <PillButton href="/contact" variant="outline">
            Talk to us
          </PillButton>
        </div>
      </div>
    </section>
  );
}
