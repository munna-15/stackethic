"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { Code, PenTool, Rocket, Search } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { process } from "@/data/servicesContent";
import SplitHeading from "@/components/ui/SplitHeading";
import PillButton from "@/components/ui/PillButton";

const icons = [Search, PenTool, Code, Rocket];

export default function ProcessSection() {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        root.querySelectorAll<HTMLElement>("[data-step]").forEach((li) => {
          const dot = li.querySelector<HTMLElement>("[data-dot]");
          const fill = li.querySelector<HTMLElement>("[data-fill]");

          ScrollTrigger.create({
            trigger: li,
            start: "top 62%",
            onEnter: () => {
              if (dot) dot.dataset.active = "true";
            },
            onLeaveBack: () => {
              if (dot) dot.dataset.active = "false";
            },
          });

          if (fill) {
            gsap.fromTo(
              fill,
              { scaleY: 0 },
              {
                scaleY: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: li,
                  start: "top 62%",
                  end: "bottom 62%",
                  scrub: true,
                },
              },
            );
          }
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        root.querySelectorAll<HTMLElement>("[data-dot]").forEach((d) => {
          d.dataset.active = "true";
        });
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  const last = process.steps.length - 1;

  return (
    <section
      ref={ref}
      id="process"
      className="relative overflow-hidden bg-se-olive text-white"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-1/4 size-[520px] rounded-full bg-se-lime/10 blur-3xl" />
        <div className="absolute -right-40 bottom-0 size-[460px] rounded-full bg-[#9bb35a]/15 blur-3xl" />
        <div className="absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(60%_50%_at_80%_10%,#000,transparent)]" />
      </div>

      <div className="page-container relative pb-28 pt-24 lg:pt-32">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <span
              data-fade
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-sm text-se-lime"
            >
              <span className="size-1.5 rounded-full bg-se-lime" />
              Our process
            </span>

            <SplitHeading
              text={process.title}
              className="mt-5 max-w-[8em] text-[clamp(36px,5vw,72px)]"
            />
          </div>

          <p
            data-fade
            className="max-w-[360px] text-base text-[#c8d0b8] lg:pb-2"
          >
            {process.text}
          </p>
        </div>

        <ol className="mt-16 lg:mt-24">
          {process.steps.map((s, i) => {
            const Icon = icons[i % icons.length];

            return (
              <li
                key={s.title}
                data-step
                className="grid grid-cols-[40px_1fr] gap-5 pb-12 last:pb-0 lg:grid-cols-[minmax(0,180px)_40px_1fr] lg:gap-10 lg:pb-16"
              >
                <span
                  aria-hidden
                  className="hidden select-none self-start text-right text-[clamp(72px,8vw,128px)] font-medium leading-[0.8] tracking-[-0.06em] text-transparent [-webkit-text-stroke:1px_rgba(221,244,106,0.4)] lg:block"
                >
                  0{i + 1}
                </span>

                <div className="relative">
                  {i !== last && (
                    <>
                      <span
                        aria-hidden
                        className="absolute -bottom-5 left-1/2 top-5 w-px -translate-x-1/2 bg-white/15"
                      />
                      <span
                        aria-hidden
                        data-fill
                        className="absolute -bottom-5 left-1/2 top-5 w-px origin-top -translate-x-1/2 bg-se-lime shadow-[0_0_12px_rgba(221,244,106,0.7)]"
                      />
                    </>
                  )}

                  <span
                    data-dot
                    data-active="false"
                    className="relative z-10 grid size-10 place-items-center rounded-full border border-white/20 bg-se-olive text-white/70 transition-all duration-500 data-[active=true]:border-se-lime data-[active=true]:bg-se-lime data-[active=true]:text-se-olive data-[active=true]:shadow-[0_0_30px_rgba(221,244,106,0.5)]"
                  >
                    <Icon size={18} aria-hidden />
                  </span>
                </div>

                <article
                  data-card
                  className="group rounded-[24px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition-colors duration-500 hover:border-se-lime/40 hover:bg-white/[0.07] sm:p-8"
                >
                  <div data-item>
                    <span className="text-xs uppercase tracking-[0.14em] text-se-lime/80">
                      Step 0{i + 1}
                    </span>
                  </div>

                  <h3
                    data-item
                    className="mt-6 text-[clamp(26px,2.6vw,38px)] leading-[1.05]"
                  >
                    {s.title}
                  </h3>

                  <p
                    data-item
                    className="mt-3 max-w-[34rem] text-[15px] text-[#c8d0b8]"
                  >
                    {s.text}
                  </p>

                  <ul
                    data-item
                    className="mt-6 flex flex-wrap gap-2 border-t border-white/10 pt-5"
                  >
                    {s.deliverables.map((d) => (
                      <li
                        key={d}
                        className="rounded-full bg-white/[0.06] px-3 py-1.5 text-xs text-white/80"
                      >
                        {d}
                      </li>
                    ))}
                  </ul>
                </article>
              </li>
            );
          })}
        </ol>

        <div
          data-fade
          className="mt-16 flex flex-col items-start justify-between gap-5 rounded-[24px] border border-white/10 bg-white/[0.04] p-6 sm:flex-row sm:items-center sm:p-8 lg:ml-[calc(180px+40px+5rem)] lg:mt-20"
        >
          <p className="text-xl sm:text-2xl">
            Have a project in mind?
            <span className="text-white/60"> Let’s talk it through.</span>
          </p>

          <PillButton href="/contact" variant="lime">
            Start a project
          </PillButton>
        </div>
      </div>
    </section>
  );
}
