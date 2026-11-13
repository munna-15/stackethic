"use client";
import { useRef } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cta } from "@/data/landingContent";
import SplitHeading from "@/components/ui/SplitHeading";
import PillButton from "@/components/ui/PillButton";

export default function PreFooterCtaSection() {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref);

  return (
    <section
      ref={ref}
      id="contact"
      className="bg-[linear-gradient(180deg,#ffffff,#ecf7b8)] pb-32 pt-28 text-center text-[#1c220a] lg:pb-44 lg:pt-36"
    >
      <div className="page-container">
        <div className="mx-auto max-w-[900px]">
          <SplitHeading
            text={cta.title}
            muted={[3]}
            className="mx-auto max-w-[9em] text-[clamp(42px,6.5vw,88px)]"
          />
          <p
            data-fade
            className="mx-auto mt-7 max-w-[640px] text-[clamp(16px,1.5vw,20px)] leading-relaxed text-[#5c6152]"
          >
            {cta.text}
          </p>
          <div
            data-fade
            className="mt-10 inline-flex flex-wrap items-center justify-center gap-5"
          >
            <span className="text-base">Experts</span>
            <span className="flex" aria-hidden>
              {[0, 1, 2, 3].map((n) => (
                <i
                  key={n}
                  className="-ml-3 size-11 rounded-full border-2 border-[#ecf7b8] bg-[linear-gradient(135deg,#8aa34a,#344000)] first:ml-0"
                />
              ))}
            </span>
            <PillButton
              href="mailto:hello@StackEthic.com"
              className="px-8! py-4! text-base!"
            >
              {cta.button}
            </PillButton>
          </div>
        </div>
      </div>
    </section>
  );
}
