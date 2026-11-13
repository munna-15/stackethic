"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import {
  Gauge,
  Layers,
  MessageSquare,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { principles } from "@/data/aboutContent";
import SplitHeading from "@/components/ui/SplitHeading";

const icons: LucideIcon[] = [Layers, ShieldCheck, MessageSquare, Gauge];
const tones = [
  "bg-[#d4f155] text-[#1e240b]",
  "bg-se-sky text-[#1c220a]",
  "bg-se-lavender text-[#1c220a]",
  "bg-[#ecf7b8] text-[#1c220a]",
];

export default function PrinciplesSection() {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref);

  // Sticky stacking cards: each card shrinks slightly as the next one slides over it
  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const items = Array.from(
          root.querySelectorAll<HTMLElement>("[data-stack]"),
        );
        items.forEach((li, i) => {
          const next = items[i + 1];
          if (!next) return;
          gsap.to(li.firstElementChild, {
            scale: 0.93,
            transformOrigin: "50% 0%",
            ease: "none",
            scrollTrigger: {
              trigger: next,
              start: "top 75%",
              end: "top 25%",
              scrub: true,
            },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  const last = principles.items.length - 1;

  return (
    <section ref={ref} className="relative bg-se-olive text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -left-40 top-1/4 size-[520px] rounded-full bg-se-lime/10 blur-3xl" />
      </div>

      <div className="page-container relative pb-32 pt-24 lg:pt-32">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SplitHeading
            text={principles.title}
            className="max-w-[8em] text-[clamp(36px,5vw,72px)]"
          />
          <p data-fade className="max-w-[320px] text-base text-[#c8d0b8]">
            {principles.text}
          </p>
        </div>

        <ul className="mt-16 lg:mt-24">
          {principles.items.map((p, i) => {
            const Icon = icons[i % icons.length];
            return (
              <li
                key={p.title}
                data-stack
                className={`sticky ${i === last ? "" : "mb-8 lg:mb-12"}`}
                style={{ top: `calc(6rem + ${i * 1.25}rem)` }}
              >
                <article
                  className={`grid min-h-[340px] gap-8 rounded-[28px] p-7 shadow-[0_-20px_50px_-30px_rgba(0,0,0,0.5)] sm:p-10 lg:grid-cols-[auto_1fr_0.7fr] lg:items-center lg:gap-12 ${tones[i % tones.length]}`}
                >
                  <span
                    aria-hidden
                    className="text-[clamp(64px,8vw,120px)] font-medium leading-none tracking-[-0.06em] text-transparent [-webkit-text-stroke:1.5px_currentColor]"
                  >
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="text-[clamp(28px,3.2vw,48px)] leading-[1.05]">
                      {p.title}
                    </h3>
                    <p className="mt-4 max-w-[30rem] text-base opacity-75">
                      {p.text}
                    </p>
                  </div>
                  <div
                    aria-hidden
                    className="relative hidden aspect-square w-full max-w-[240px] justify-self-end lg:block"
                  >
                    <span className="absolute inset-0 rounded-full border border-current opacity-20" />
                    <span className="absolute inset-[16%] rounded-full border border-current opacity-20" />
                    <span className="absolute inset-[32%] grid place-items-center rounded-full bg-[#1e240b] text-se-lime">
                      <Icon size={32} />
                    </span>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
