"use client";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { capabilities } from "@/data/aboutContent";
import { serviceList } from "@/data/servicesContent";
import SplitHeading from "@/components/ui/SplitHeading";
import PillButton from "@/components/ui/PillButton";

export default function CapabilitiesSection() {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref);

  return (
    <section ref={ref} className="bg-[#f4f6ea] text-[#1c220a]">
      <div className="page-container py-24 lg:py-32">
        {/* Header */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <span
              data-fade
              className="inline-flex items-center gap-2 rounded-full border border-[#d1d5db] bg-white px-4 py-1.5 text-sm text-[#5c6152]"
            >
              <span className="size-1.5 rounded-full bg-se-olive" />
              Capabilities
            </span>
            <SplitHeading
              text={capabilities.title}
              className="mt-5 text-[clamp(34px,4.6vw,64px)]"
            />
          </div>
          <p data-fade className="max-w-[340px] text-base text-[#5c6152]">
            {capabilities.text}
          </p>
        </div>

        {/* Service cards */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {serviceList.map((s, i) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.slug}
                href={`/services#${s.slug}`}
                data-card
                className="group flex min-h-[260px] flex-col rounded-[20px] border border-[#e0e4d0] bg-white p-7 transition-all duration-500 hover:-translate-y-1 hover:border-se-olive/40 hover:shadow-[0_24px_40px_-28px_rgba(30,36,11,0.45)]"
              >
                <div className="flex items-start justify-between">
                  <span className="grid size-12 place-items-center rounded-xl bg-[#f4f6ea] text-se-olive transition-colors duration-500 group-hover:bg-se-olive group-hover:text-se-lime">
                    <Icon size={22} aria-hidden />
                  </span>
                  <span className="text-sm tabular-nums text-[#a3a58f]">
                    0{i + 1}
                  </span>
                </div>

                <h3 className="mt-8 text-[24px] leading-[1.1]">{s.title}</h3>
                <p className="mt-3 text-[15px] text-[#5c6152]">{s.text}</p>

                <span className="mt-auto inline-flex items-center gap-2 pt-7 text-sm font-medium">
                  Learn more
                  <ArrowRight
                    size={16}
                    aria-hidden
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </Link>
            );
          })}
        </div>

        {/* Closing row */}
        <div
          data-fade
          className="mt-12 flex flex-col items-start justify-between gap-5 rounded-[20px] border border-[#e0e4d0] bg-white p-6 sm:flex-row sm:items-center sm:p-8"
        >
          <p className="text-xl sm:text-2xl">
            Not sure what you need?
            <span className="text-[#8e967e]"> Tell us about your idea.</span>
          </p>
          <div className="flex flex-wrap gap-3">
            <PillButton href="/services" variant="outline">
              All services
            </PillButton>
            <PillButton href="/contact">Start a project</PillButton>
          </div>
        </div>
      </div>
    </section>
  );
}
