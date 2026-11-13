"use client";
import { useRef } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { Project } from "@/data/workContent";
import SplitHeading from "@/components/ui/SplitHeading";

export default function CaseOverview({ project: p }: { project: Project }) {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref);

  const host = p.url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const d = p.details;

  // Facts come from the project data only. Extra rows appear when you fill in `details`.
  const facts: { label: string; value: React.ReactNode }[] = [
    { label: "Category", value: p.category },
    {
      label: "Type",
      value: p.kind === "software" ? "Software platform" : "Website",
    },
    ...(d?.role ? [{ label: "Our role", value: d.role }] : []),
    ...(d?.year ? [{ label: "Year", value: d.year }] : []),
    ...(d?.stack?.length
      ? [{ label: "Stack", value: d.stack.join(", ") }]
      : []),
    {
      label: "Live site",
      value: (
        <a
          href={p.url}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4 hover:text-se-olive"
        >
          {host}
        </a>
      ),
    },
  ];

  return (
    <section ref={ref} className="bg-white text-[#1c220a]">
      <div className="page-container grid gap-14 pb-16 pt-20 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20 lg:pt-28">
        <div>
          <span
            data-fade
            className="inline-flex items-center gap-2 rounded-full border border-[#d1d5db] px-4 py-1.5 text-sm text-[#5c6152]"
          >
            <span className="size-1.5 rounded-full bg-se-olive" />
            Overview
          </span>
          <p
            data-fade
            className="mt-6 text-[clamp(22px,2.6vw,38px)] leading-[1.25] tracking-[-0.02em]"
          >
            {p.description}
          </p>
        </div>

        <dl
          data-fade
          className="divide-y divide-[#e5e7eb] self-start border-y border-[#e5e7eb] text-sm"
        >
          {facts.map((f) => (
            <div
              key={f.label}
              className="flex items-baseline justify-between gap-6 py-4"
            >
              <dt className="text-[#8e967e]">{f.label}</dt>
              <dd className="text-right">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="page-container pb-24">
        <SplitHeading
          text="Key focus"
          className="mb-10 text-[clamp(28px,3.4vw,48px)]"
        />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {p.focus.map((x, i) => (
            <li
              key={x}
              data-card
              className="flex min-h-[220px] flex-col justify-between rounded-[20px] border border-[#e5e7eb] bg-[#fbfcf8] p-6 transition-colors duration-500 hover:border-se-olive/30 hover:bg-se-lime/20"
            >
              <span
                data-item
                aria-hidden
                className="text-[clamp(48px,5vw,72px)] font-medium leading-none tracking-[-0.05em] text-transparent [-webkit-text-stroke:1px_rgba(45,51,0,0.35)]"
              >
                0{i + 1}
              </span>
              <p data-item className="text-xl leading-[1.15]">
                {x}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
