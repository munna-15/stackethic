"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { calculator } from "@/data/landingContent";
import SplitHeading from "@/components/ui/SplitHeading";
import Botanical from "@/components/ui/Botanical";

const PROJECT_TYPES = [
  { id: "website", label: "Website" },
  { id: "ecommerce", label: "E-commerce" },
  { id: "software", label: "SaaS / Software" },
  { id: "mobile", label: "Mobile app" },
  { id: "automation", label: "AI & Automation" },
  { id: "other", label: "Other" },
] as const;

const CURRENCIES = {
  USD: {
    max: 15000,
    step: 100,
    symbol: "$",
    locale: "en-US",
  },
  BDT: {
    max: 2000000,
    step: 5000,
    symbol: "৳",
    locale: "en-BD",
  },
} as const;

type Currency = keyof typeof CURRENCIES;

export default function CalculatorSection() {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref);

  const [projectType, setProjectType] = useState<string>("website");
  const [currency, setCurrency] = useState<Currency>("USD");
  const [budget, setBudget] = useState(0);

  const currentCurrency = CURRENCIES[currency];
  const progress = (budget / currentCurrency.max) * 100;

  const contactParams = new URLSearchParams({
    source: "budget-planner",
    project: projectType,
    budget: budget.toString(),
    currency,
  });

  const contactHref = `/contact?${contactParams.toString()}`;

  const formattedBudget =
    budget === 0
      ? "Not decided"
      : `${currentCurrency.symbol}${budget.toLocaleString(
          currentCurrency.locale,
        )}`;

  return (
    <section ref={ref} id="pricing" className="bg-white text-[#1c220a]">
      <div className="page-container grid items-center gap-10 pb-24 pt-20 lg:grid-cols-2 lg:gap-16">
        <div>
          <SplitHeading
            text={calculator.title}
            className="max-w-[8em] text-[clamp(32px,3.6vw,52px)]"
          />

          <p
            data-fade
            className="mt-5 max-w-[420px] text-[15px] leading-relaxed text-[#5c6152]"
          >
            {calculator.text}
          </p>

          <div data-fade className="mt-8">
            <Link
              href={contactHref}
              className="group inline-flex items-center gap-2 text-sm font-semibold text-[#252b0b] transition-colors hover:text-[#708a25]"
            >
              {calculator.cta}
              <span className="inline-flex size-8 items-center justify-center rounded-full bg-[#d4f155] transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight size={16} />
              </span>
            </Link>
          </div>
        </div>

        <div
          data-card
          className="relative overflow-hidden rounded-[22px] bg-[#d4f155] px-6 py-6 sm:px-8 sm:py-7"
        >
          <Botanical className="pointer-events-none absolute right-3 top-3 w-20 text-[#1e240b]/10" />

          <div className="relative">
            <div data-item className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">Project budget planner</p>
                <p className="mt-1 text-xs text-[#4c5725]">
                  Tell us what you have in mind
                </p>
              </div>

              <span className="rounded-full border border-[#1e240b]/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider">
                Quick estimate
              </span>
            </div>

            <div data-item className="mt-7">
              <p className="mb-3 text-[13px] font-semibold">
                01. Choose your project
              </p>

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {PROJECT_TYPES.map((project) => {
                  const active = projectType === project.id;

                  return (
                    <button
                      key={project.id}
                      type="button"
                      onClick={() => setProjectType(project.id)}
                      aria-pressed={active}
                      className={`flex min-h-10 items-center justify-between gap-2 rounded-lg border px-3 py-2.5 text-left text-xs font-medium transition-all duration-300 ${
                        active
                          ? "border-[#1e240b] bg-[#1e240b] text-white"
                          : "border-[#1e240b]/15 bg-white/25 text-[#1e240b] hover:border-[#1e240b]/50 hover:bg-white/50"
                      }`}
                    >
                      {project.label}
                      {active && (
                        <Check
                          size={13}
                          className="shrink-0 text-[#d4f155]"
                          strokeWidth={2.5}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div data-item className="mt-6 border-t border-[#1e240b]/15 pt-5">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[13px] font-semibold">02. Set your budget</p>

                <div className="flex rounded-full border border-[#1e240b]/15 p-1">
                  {(["USD", "BDT"] as const).map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => {
                        setCurrency(item);
                        setBudget(0);
                      }}
                      aria-pressed={currency === item}
                      className={`rounded-full px-3 py-1 text-[10px] font-semibold transition-colors ${
                        currency === item
                          ? "bg-[#1e240b] text-white"
                          : "text-[#4c5725] hover:bg-white/40"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex items-end justify-between gap-3">
                <p
                  className="text-[clamp(30px,3.5vw,42px)] font-medium leading-none tracking-[-0.04em] tabular-nums"
                  aria-live="polite"
                >
                  {formattedBudget}
                </p>

                <button
                  type="button"
                  onClick={() => setBudget(0)}
                  className="pb-1 text-[11px] text-[#4c5725] underline underline-offset-4 hover:text-[#1e240b]"
                >
                  Not sure yet?
                </button>
              </div>

              <input
                id="project-budget"
                type="range"
                min={0}
                max={currentCurrency.max}
                step={currentCurrency.step}
                value={budget}
                onChange={(event) => setBudget(Number(event.target.value))}
                aria-label={`Approximate project budget in ${currency}`}
                aria-valuetext={formattedBudget}
                style={{
                  background: `linear-gradient(to right, #1e240b ${progress}%, rgba(30,36,11,.22) ${progress}%)`,
                }}
                className="my-5 h-1 w-full cursor-pointer appearance-none rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1e240b] [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#1e240b] [&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-[#1e240b]"
              />

              <div className="flex justify-between text-[10px] text-[#4c5725]">
                <span>{currentCurrency.symbol}0</span>
                <span>
                  {currentCurrency.symbol}
                  {currentCurrency.max.toLocaleString(currentCurrency.locale)}
                </span>
              </div>
            </div>

            <div
              data-item
              className="mt-6 flex items-center justify-between gap-3 border-t border-[#1e240b]/15 pt-5"
            >
              <div className="min-w-0">
                <p className="text-[11px] text-[#4c5725]">Your selection</p>
                <p className="mt-1 truncate text-xs font-semibold">
                  {PROJECT_TYPES.find((item) => item.id === projectType)?.label}
                  {" · "}
                  {formattedBudget}
                </p>
              </div>

              <Link
                href={contactHref}
                className="group inline-flex min-h-11 shrink-0 items-center gap-3 rounded-full bg-[#1e240b] py-1.5 pl-4 pr-1.5 text-xs font-medium text-white transition-colors duration-300 ease-out hover:bg-[#354316]"
              >
                Discuss project
                <span className="inline-flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#d4f155] text-[#1e240b]">
                  <ArrowUpRight
                    size={15}
                    strokeWidth={1.8}
                    className="transform-gpu transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
                  />
                </span>
              </Link>
            </div>

            <p className="mt-4 text-[10px] leading-relaxed text-[#4c5725]/80">
              This is an initial planning guide, not a fixed quote. Final
              pricing depends on your project scope and requirements.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
