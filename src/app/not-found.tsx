import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex h-[100svh] min-h-[500px] flex-col overflow-hidden bg-[#F7F7F0] text-[#252B0B]">
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute inset-0 opacity-[0.22] [background-image:radial-gradient(#252B0B_0.7px,transparent_0.7px)] [background-size:24px_24px]" />

        <div className="absolute -right-32 top-10 size-[320px] rounded-full border border-[#252B0B]/[0.07] sm:size-[480px] lg:size-[600px]" />

        <div className="absolute -right-12 top-28 size-[220px] rounded-full border border-[#252B0B]/[0.08] sm:size-[320px] lg:size-[400px]" />

        <div className="absolute -bottom-40 -left-32 size-[320px] rounded-full bg-[#DDF46A]/20 blur-[90px] sm:size-[420px]" />
      </div>

      {/* Main content */}
      <section className="relative z-10 flex flex-1 items-center">
        <div className="page-container grid w-full items-center gap-8 py-8 sm:gap-10 sm:py-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:py-8">
          {/* 404 typography */}
          <div className="relative">
            <div className="mb-4 flex items-center gap-3 sm:mb-5">
              <span className="size-2 shrink-0 rounded-full bg-[#A1B84B]" />
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#252B0B]/60 sm:text-xs">
                Error 404 — Page not found
              </span>
            </div>

            <h1
              aria-label="404"
              className="select-none text-[clamp(7rem,20vw,18rem)] font-medium leading-[0.72] tracking-[-0.11em] text-[#252B0B]"
            >
              4<span className="text-[#A1B84B]">0</span>4
            </h1>

            <div className="mt-7 flex items-center gap-3 sm:mt-9">
              <span className="h-px w-10 bg-[#252B0B]/30 sm:w-12" />
              <span className="text-[9px] uppercase tracking-[0.18em] text-[#252B0B]/50 sm:text-xs">
                Lost in the wrong direction
              </span>
            </div>
          </div>

          {/* Message and actions */}
          <div className="relative max-w-[460px] lg:justify-self-end">
            <span className="mb-4 inline-flex items-center rounded-full border border-[#252B0B]/15 px-3.5 py-1.5 text-[9px] uppercase tracking-[0.16em] text-[#252B0B]/65 sm:mb-5 sm:text-[11px]">
              Nothing to see here
            </span>

            <h2 className="text-[clamp(2rem,4.5vw,4.25rem)] font-medium leading-[0.98] tracking-[-0.065em]">
              This page
              <br />
              took a wrong turn<span className="text-[#A1B84B]">.</span>
            </h2>

            <p className="mt-4 max-w-[360px] text-xs leading-6 text-[#252B0B]/65 sm:mt-5 sm:text-sm sm:leading-7">
              The page you are looking for may have moved, been removed, or
              never existed. Let's get you back on the right path.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-5 sm:mt-8">
              <Link
                href="/"
                className="group inline-flex items-center gap-2.5 rounded-full bg-[#252B0B] px-5 py-3 text-xs font-medium text-[#F7F7F0] transition-colors duration-300 hover:bg-[#39451B] sm:gap-3 sm:px-6 sm:py-3.5 sm:text-sm"
              >
                <ArrowLeft
                  size={15}
                  className="transition-transform duration-300 group-hover:-translate-x-1"
                />
                Back to home
              </Link>

              <Link
                href="/contact"
                className="group inline-flex items-center gap-1.5 text-xs font-medium text-[#252B0B] transition-colors hover:text-[#84983B] sm:text-sm"
              >
                Contact us
                <ArrowUpRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>

            {/* Decorative marker */}
            <div className="mt-8 flex items-center gap-3 border-t border-[#252B0B]/10 pt-4 sm:mt-12 sm:pt-5 lg:mt-14">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#DDF46A] text-[10px] font-semibold sm:size-8 sm:text-xs">
                S.
              </span>
              <span className="text-[8px] uppercase tracking-[0.14em] text-[#252B0B]/45 sm:text-[10px] sm:tracking-[0.18em]">
                Thoughtfully engineered. Intentionally designed.
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
