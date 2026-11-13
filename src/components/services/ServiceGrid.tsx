"use client";
import { useRef } from "react";
import { Check } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { serviceGrid, serviceList } from "@/data/servicesContent";
import SplitHeading from "@/components/ui/SplitHeading";
import PillButton from "@/components/ui/PillButton";

const tones = [
  {
    box: "bg-se-sky",
    text: "text-[#1c220a]",
    sub: "text-[#4a5340]",
    chip: "bg-white",
  },
  {
    box: "bg-[#1b210b]",
    text: "text-white",
    sub: "text-[#b8c27d]",
    chip: "bg-se-lime text-se-olive",
  },
  {
    box: "bg-se-lavender",
    text: "text-[#1c220a]",
    sub: "text-[#4a5340]",
    chip: "bg-white",
  },
  {
    box: "bg-[#d4f155]",
    text: "text-[#1e240b]",
    sub: "text-[#3f4a1a]",
    chip: "bg-white",
  },
  {
    box: "bg-se-olive",
    text: "text-white",
    sub: "text-[#b8c27d]",
    chip: "bg-se-lime text-se-olive",
  },
  {
    box: "bg-[#ecf7b8]",
    text: "text-[#1c220a]",
    sub: "text-[#4a5340]",
    chip: "bg-white",
  },
];

export default function ServiceGrid() {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref);

  return (
    <section
      ref={ref}
      id="service-list"
      className="scroll-mt-24 bg-white text-[#1c220a]"
    >
      <div className="page-container pb-24 pt-20">
        <div className="mb-10 flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
          <SplitHeading
            text={serviceGrid.title}
            className="text-[clamp(30px,3.6vw,52px)]"
          />
          <div data-fade>
            <PillButton href="/contact">Start a project</PillButton>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {serviceList.map((s, i) => {
            const t = tones[i % tones.length];
            const Icon = s.icon;
            return (
              <article
                key={s.slug}
                id={s.slug}
                data-card
                className={`flex min-h-[440px] scroll-mt-28 flex-col justify-between rounded-[20px] p-7 hover:-translate-y-1.5 ${t.box} ${t.text}`}
              >
                <div data-item className="flex items-center justify-between">
                  <span className="text-sm tabular-nums opacity-60">
                    0{i + 1}
                  </span>
                  <span
                    className={`grid size-11 place-items-center rounded-full ${t.chip}`}
                  >
                    <Icon size={20} aria-hidden />
                  </span>
                </div>
                <div data-item>
                  <h3 className="text-[28px] leading-[1.1]">{s.title}</h3>
                  <p className={`mt-3 text-[15px] ${t.sub}`}>{s.text}</p>
                </div>
                <ul data-item className="space-y-2 text-sm">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2">
                      <Check size={14} aria-hidden className="shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
