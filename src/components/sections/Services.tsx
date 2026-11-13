"use client";
import { useRef } from "react";
import { ArrowUpRight, Repeat } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { services } from "@/data/landingContent";
import SplitHeading from "@/components/ui/SplitHeading";
import PillButton from "@/components/ui/PillButton";
import Botanical from "@/components/ui/Botanical";

// Section 2 (lower half). The trust pill and logo marquee go above this.
export default function ServicesSection() {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref);
  const icons = [Repeat, ArrowUpRight];

  return (
    <section ref={ref} id="services" className="bg-white text-[#1c220a]">
      <div className="page-container pb-24 pt-20 lg:pb-28">
        <div className="grid gap-12 lg:grid-cols-[42fr_58fr]">
          <div className="flex flex-col">
            <SplitHeading
              text={services.title}
              className="max-w-[9em] text-[clamp(32px,3.6vw,52px)]"
            />
            <div data-fade className="mt-6 flex flex-wrap gap-3">
              <PillButton href="/contact">Start a project</PillButton>
              <PillButton href="#pricing" variant="outline">
                Learn more
              </PillButton>
            </div>
            <div
              data-fade
              className="mt-10 max-w-[440px] space-y-4 text-[15px] text-[#5c6152] lg:mt-16"
            >
              {services.intro.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <article
              data-card
              className="flex min-h-[360px] flex-col justify-between rounded-[20px] bg-se-sky p-7"
            >
              <div data-item>
                <h3 className="text-[26px] leading-[1.15]">
                  {services.blue.title}
                </h3>
                <ul className="mt-5 space-y-2 text-sm text-[#3f4a2a]">
                  {services.blue.bullets.map((b) => (
                    <li key={b}>• {b}</li>
                  ))}
                </ul>
              </div>
              <div data-item>
                <PillButton href="#services">{services.blue.cta}</PillButton>
              </div>
            </article>

            <article
              data-card
              className="relative flex min-h-[360px] flex-col justify-between overflow-hidden rounded-[20px] bg-[#1b210b] p-7 text-white"
            >
              <Botanical className="absolute left-4 top-4 w-28 text-[#9bb35a]/40" />
              <div
                data-item
                className="relative ml-auto flex flex-col items-end gap-3"
              >
                {services.dark.pills.map((label, i) => {
                  const Icon = icons[i % icons.length];
                  return (
                    <span
                      key={label}
                      className="inline-flex items-center gap-3 rounded-full bg-white py-1.5 pl-4 pr-1.5 text-sm text-[#1c220a]"
                    >
                      {label}
                      <span className="grid size-7 place-items-center rounded-full bg-se-lime">
                        <Icon size={14} />
                      </span>
                    </span>
                  );
                })}
              </div>
              <h3
                data-item
                className="relative max-w-[10em] text-[26px] leading-[1.15]"
              >
                {services.dark.title}
              </h3>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
