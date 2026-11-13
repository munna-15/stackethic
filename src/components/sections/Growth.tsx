"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { growth } from "@/data/landingContent";
import SplitHeading from "@/components/ui/SplitHeading";
import PillButton from "@/components/ui/PillButton";
import Photo from "@/components/ui/Photo";

const Pill = ({ label, dark }: { label: string; dark: boolean }) => (
  <span
    className={`whitespace-nowrap rounded-full px-[18px] py-2.5 text-[13px] font-medium ${
      dark ? "bg-[#262d11] text-se-lime" : "bg-[#d5f257] text-[#1c220a]"
    }`}
  >
    {label}
  </span>
);

export default function GrowthSection() {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        root.querySelectorAll<HTMLElement>("[data-drift]").forEach((el) => {
          gsap.to(el, {
            x: Number(el.dataset.drift) * 16,
            duration: 3.2,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
        });
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  const { card1, card2, card3 } = growth;

  return (
    <section ref={ref} className="bg-white text-[#1c220a]">
      <div className="page-container pb-24 pt-16">
        <div className="mb-9 flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
          <SplitHeading
            text={growth.title}
            className="text-[clamp(28px,3.4vw,48px)]"
          />

          <div data-fade>
            <PillButton href="/services" variant="outline">
              Explore services
            </PillButton>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <article
            data-card
            className="relative flex min-h-[420px] flex-col justify-between overflow-hidden rounded-[20px] bg-[radial-gradient(70%_60%_at_20%_30%,#9bb35a,transparent),radial-gradient(60%_60%_at_80%_85%,#e2ebd5,#c9dba0)] p-8"
          >
            <h3 data-item className="relative text-[28px]">
              {card1.title}
            </h3>

            <div data-item aria-hidden className="relative -mx-8 grid gap-3">
              <div data-drift="1" className="flex w-max gap-2 pl-4">
                {card1.rowA.map((label, i) => (
                  <Pill key={label} label={label} dark={i % 2 === 1} />
                ))}
              </div>

              <div data-drift="-1" className="flex w-max gap-2 pl-10">
                {card1.rowB.map((label, i) => (
                  <Pill key={label} label={label} dark={i % 2 === 0} />
                ))}
              </div>
            </div>

            <p data-item className="relative max-w-[22em] text-sm text-white">
              {card1.caption}
            </p>
          </article>

          <article
            data-card
            className="flex min-h-[420px] flex-col justify-between rounded-[20px] bg-se-lavender p-8"
          >
            <div data-item>
              <h3 className="max-w-[7em] text-[28px]">{card2.title}</h3>
              <p className="mt-2 text-xs text-[#5c6152]">{card2.label}</p>
            </div>

            <ol data-item className="mt-8 space-y-5">
              {card2.stages.map((stage, index) => (
                <li key={stage} className="flex items-start gap-4">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white text-xs font-medium text-[#252b0b]">
                    0{index + 1}
                  </span>

                  <span className="pt-1 text-sm leading-relaxed text-[#34382a]">
                    {stage}
                  </span>
                </li>
              ))}
            </ol>

            <p
              data-item
              className="mt-8 text-xs leading-relaxed text-[#5c6152]"
            >
              Each project is shaped around its goals, scope and requirements.
            </p>
          </article>

          <article
            data-card
            className="relative flex min-h-[420px] flex-col justify-between overflow-hidden rounded-[20px] p-8 text-white"
          >
            <Photo
              src={card3.image}
              gradient="bg-[linear-gradient(160deg,#8a5e47,#2d1d17)]"
            />

            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
            />

            <h3 data-item className="relative max-w-[6em] text-[28px]">
              {card3.title}
            </h3>

            <p data-item className="relative max-w-[22em] text-sm">
              {card3.caption}
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
