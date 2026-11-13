"use client";

import { useRef } from "react";
import { Check } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { packages } from "@/data/servicesContent";
import SplitHeading from "@/components/ui/SplitHeading";
import PillButton from "@/components/ui/PillButton";

export default function PackagesSection() {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref);

  return (
    <section ref={ref} id="packages" className="bg-white text-[#1c220a]">
      <div className="page-container pb-28 pt-24">
        <div className="mb-12 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <SplitHeading
            text={packages.title}
            className="max-w-[11em] text-[clamp(30px,3.6vw,52px)]"
          />

          <p data-fade className="max-w-[340px] text-[15px] text-[#5c6152]">
            {packages.text}
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {packages.items.map((p) => (
            <article
              key={p.name}
              data-card
              className="group flex flex-col rounded-[24px] border border-[#e5e7eb] bg-white p-8 transition-[transform,border-color,box-shadow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:z-10 hover:scale-[1.025] hover:border-[#cbd5a8] hover:shadow-[0_18px_45px_rgba(37,43,11,0.07)] motion-reduce:transition-none motion-reduce:hover:scale-100"
            >
              <div data-item>
                {p.featured && (
                  <span className="mb-4 inline-block rounded-full bg-se-olive px-3 py-1 text-xs text-se-lime">
                    Most popular
                  </span>
                )}

                <h3 className="text-2xl transition-colors duration-500 group-hover:text-[#58652e]">
                  {p.name}
                </h3>

                <p className="mt-1 text-sm opacity-70">{p.blurb}</p>
              </div>

              <p
                data-item
                className="mt-8 text-[clamp(25px,2.7vw,36px)] font-medium tracking-[-0.03em]"
              >
                {p.price}
                {p.note && (
                  <span className="ml-1.5 text-sm font-normal opacity-60">
                    {p.note}
                  </span>
                )}
              </p>

              <ul data-item className="mt-6 flex-1 space-y-3 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5">
                    <Check
                      size={15}
                      aria-hidden
                      className="shrink-0 text-[#87964e] transition-colors duration-300 group-hover:text-[#657b25]"
                    />
                    {f}
                  </li>
                ))}
              </ul>

              <div data-item className="mt-8">
                <PillButton
                  href="/contact"
                  variant={p.featured ? "dark" : "outline"}
                >
                  Get started
                </PillButton>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
