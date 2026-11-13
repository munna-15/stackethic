"use client";
import { useRef } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { nextSteps } from "@/data/contactContent";
import SplitHeading from "@/components/ui/SplitHeading";

export default function NextSteps() {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref);

  return (
    <section ref={ref} className="bg-white text-[#1c220a]">
      <div className="page-container py-24 lg:py-32">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SplitHeading
            text={nextSteps.title}
            className="max-w-[8em] text-[clamp(34px,4.6vw,64px)]"
          />
          <p data-fade className="max-w-[320px] text-base text-[#5c6152]">
            {nextSteps.text}
          </p>
        </div>

        <ol className="mt-14 grid gap-5 md:grid-cols-3">
          {nextSteps.items.map((s, i) => (
            <li
              key={s.title}
              data-card
              className="flex min-h-[260px] flex-col justify-between rounded-[20px] border border-[#e0e4d0] bg-[#fbfcf8] p-7"
            >
              <span
                data-item
                aria-hidden
                className="text-[clamp(56px,6vw,88px)] font-medium leading-none tracking-[-0.05em] text-transparent [-webkit-text-stroke:1px_rgba(45,51,0,0.35)]"
              >
                0{i + 1}
              </span>
              <div>
                <h3 data-item className="text-2xl leading-[1.1]">
                  {s.title}
                </h3>
                <p data-item className="mt-3 text-[15px] text-[#5c6152]">
                  {s.text}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
