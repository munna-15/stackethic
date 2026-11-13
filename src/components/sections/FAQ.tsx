"use client";
import { useRef, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { faq } from "@/data/landingContent";
import SplitHeading from "@/components/ui/SplitHeading";

export default function FaqSection() {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref);
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section ref={ref} id="faq" className="bg-se-olive text-white">
      <div className="page-container grid gap-12 pb-28 pt-24 lg:grid-cols-[38fr_62fr]">
        <div>
          <SplitHeading
            text={faq.title}
            className="max-w-[6em] text-[clamp(32px,3.6vw,52px)]"
          />
          <p
            data-fade
            className="mt-5 max-w-[340px] text-[15px] text-[#c8d0b8]"
          >
            {faq.text}
          </p>
        </div>

        <div data-fade>
          {faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="border-b border-white/15">
                <h3 className="text-lg font-normal tracking-normal">
                  <button
                    id={`faq-btn-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left"
                  >
                    {item.q}
                    {isOpen ? (
                      <Minus size={18} aria-hidden />
                    ) : (
                      <Plus size={18} aria-hidden />
                    )}
                  </button>
                </h3>
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-btn-${i}`}
                  className={`grid transition-[grid-template-rows,opacity] duration-500 ease-se ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-[620px] pb-6 text-[15px] text-[#c8d0b8]">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
