import { MousePointer2, ShoppingBag, Sparkles } from "lucide-react";

/* Decorative mini-compositions for each service. They contain no real data or numbers. */

const Line = ({ w = "w-full" }: { w?: string }) => (
  <span className={`block h-1.5 rounded-full bg-[#1c220a]/15 ${w}`} />
);
const grad = "bg-[linear-gradient(135deg,#d4f155,#8aa34a)]";

function Web() {
  return (
    <div className="relative h-full w-full">
      <div
        data-float
        className="absolute left-1/2 top-1/2 w-[82%] max-w-[360px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl bg-white shadow-[0_24px_50px_-20px_rgba(0,0,0,0.7)]"
      >
        <div className="flex items-center gap-1.5 bg-[#ecefe0] px-3 py-2">
          <i className="size-1.5 rounded-full bg-[#1c220a]/25" />
          <i className="size-1.5 rounded-full bg-[#1c220a]/25" />
          <i className="size-1.5 rounded-full bg-[#1c220a]/25" />
          <span className="ml-2 h-2 flex-1 rounded-full bg-[#1c220a]/10" />
        </div>
        <div className="space-y-3 p-4">
          <div className={`h-16 rounded-lg ${grad}`} />
          <Line w="w-3/4" />
          <Line w="w-1/2" />
          <div className="grid grid-cols-3 gap-2 pt-1">
            {[0, 1, 2].map((n) => (
              <div key={n} className="h-10 rounded-md bg-[#1c220a]/[0.08]" />
            ))}
          </div>
        </div>
      </div>
      <span
        data-float
        className="absolute bottom-4 right-[4%] rounded-full bg-se-lime px-3 py-1.5 text-xs font-medium text-se-olive shadow-lg"
      >
        Next.js
      </span>
    </div>
  );
}

function Mobile() {
  return (
    <div className="relative h-full w-full">
      <div
        data-float
        className="absolute left-[22%] top-1/2 h-[210px] w-[112px] -translate-y-1/2 -rotate-6 rounded-[24px] border-[5px] border-white/15 bg-[#0f1306] p-1.5"
      >
        <div className="h-full space-y-2 rounded-[16px] bg-white p-2">
          <div className={`h-12 rounded-lg ${grad}`} />
          <Line />
          <Line w="w-2/3" />
          <div className="h-9 rounded-lg bg-[#1c220a]/10" />
          <div className="h-9 rounded-lg bg-[#1c220a]/10" />
        </div>
      </div>
      <div
        data-float
        className="absolute right-[22%] top-[46%] h-[210px] w-[112px] -translate-y-1/2 rotate-6 rounded-[24px] border-[5px] border-white/15 bg-[#0f1306] p-1.5"
      >
        <div className="grid h-full place-items-center rounded-[16px] bg-[#1d2a10]">
          <span className={`size-14 rounded-full ${grad}`} />
        </div>
      </div>
      <span
        data-float
        className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-se-lime px-3 py-1.5 text-xs font-medium text-se-olive shadow-lg"
      >
        Flutter
      </span>
    </div>
  );
}

function Design() {
  const swatches = ["#d4f155", "#8aa34a", "#2d3300", "#dde4fc"];
  const corners = [
    "-left-1 -top-1",
    "-right-1 -top-1",
    "-bottom-1 -left-1",
    "-bottom-1 -right-1",
  ];
  return (
    <div className="relative h-full w-full">
      <div
        data-float
        className="absolute left-[8%] top-[10%] rounded-2xl bg-white p-4 shadow-xl"
      >
        <span className="block text-[56px] font-medium leading-none tracking-[-0.05em] text-[#1c220a]">
          Aa
        </span>
        <div className="mt-3 flex gap-1.5">
          {swatches.map((c) => (
            <i
              key={c}
              className="size-5 rounded-full border border-black/10"
              style={{ background: c }}
            />
          ))}
        </div>
      </div>
      <div className="absolute right-[8%] top-[18%] h-[120px] w-[160px] rounded-md border border-dashed border-se-lime/70">
        {corners.map((c) => (
          <i
            key={c}
            className={`absolute ${c} size-2.5 rounded-[2px] bg-se-lime`}
          />
        ))}
        <span className={`absolute inset-4 rounded-md ${grad} opacity-80`} />
      </div>
      <MousePointer2
        data-float
        size={30}
        fill="currentColor"
        className="absolute right-[16%] top-[58%] text-white"
        aria-hidden
      />
      <span
        data-float
        className="absolute bottom-3 left-[14%] rounded-full bg-se-lime px-3 py-1.5 text-xs font-medium text-se-olive shadow-lg"
      >
        Figma
      </span>
    </div>
  );
}

function Dashboard() {
  const bars = [40, 65, 50, 85, 60, 95];
  return (
    <div className="relative h-full w-full">
      <div
        data-float
        className="absolute left-1/2 top-1/2 w-[86%] max-w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-3 shadow-[0_24px_50px_-20px_rgba(0,0,0,0.7)]"
      >
        <div className="flex gap-3">
          <div className="w-8 space-y-2">
            {[0, 1, 2, 3].map((n) => (
              <div
                key={n}
                className={`size-8 rounded-md ${n === 0 ? "bg-se-olive" : "bg-[#1c220a]/10"}`}
              />
            ))}
          </div>
          <div className="flex-1">
            <div className="flex h-24 items-end gap-2">
              {bars.map((h, i) => (
                <span
                  key={i}
                  style={{ height: `${h}%` }}
                  className={`flex-1 rounded-t-md ${i % 2 ? "bg-se-lime" : "bg-se-olive"}`}
                />
              ))}
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {[0, 1, 2].map((n) => (
                <div key={n} className="h-8 rounded-md bg-[#1c220a]/[0.08]" />
              ))}
            </div>
          </div>
        </div>
      </div>
      <span
        data-float
        className="absolute bottom-3 right-[6%] rounded-full bg-se-lime px-3 py-1.5 text-xs font-medium text-se-olive shadow-lg"
      >
        Roles and billing
      </span>
    </div>
  );
}

function Shop() {
  const tones = [
    "bg-[linear-gradient(135deg,#d9c3b0,#6b4a3a)]",
    grad,
    "bg-[linear-gradient(135deg,#dde4fc,#5b6aa8)]",
  ];
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-x-[6%] top-1/2 grid -translate-y-1/2 grid-cols-3 gap-3">
        {tones.map((t, i) => (
          <div
            key={i}
            data-float={i === 1 ? "" : undefined}
            className={`rounded-xl bg-white p-2 shadow-xl ${i === 1 ? "-translate-y-3" : ""}`}
          >
            <div className={`h-24 rounded-lg ${t}`} />
            <div className="mt-2 space-y-1.5">
              <Line />
              <Line w="w-1/2" />
            </div>
            <span className="mt-2 block h-5 w-12 rounded-full bg-se-olive" />
          </div>
        ))}
      </div>
      <span
        data-float
        className="absolute right-[4%] top-1 grid size-12 place-items-center rounded-full bg-se-lime text-se-olive shadow-lg"
      >
        <ShoppingBag size={20} aria-hidden />
      </span>
    </div>
  );
}

function Ai() {
  const nodes = [
    [60, 50],
    [260, 50],
    [60, 190],
    [260, 190],
  ];
  return (
    <div className="relative h-full w-full">
      <svg
        viewBox="0 0 320 240"
        className="absolute inset-0 h-full w-full"
        fill="none"
        aria-hidden
      >
        {nodes.map(([x, y]) => (
          <line
            key={`${x}-${y}`}
            x1="160"
            y1="120"
            x2={x}
            y2={y}
            stroke="rgba(221,244,106,0.35)"
            strokeWidth="1.2"
            strokeDasharray="4 4"
          />
        ))}
        {nodes.map(([x, y]) => (
          <g key={`n-${x}-${y}`}>
            <circle
              cx={x}
              cy={y}
              r="20"
              fill="rgba(255,255,255,0.08)"
              stroke="rgba(255,255,255,0.25)"
            />
            <circle cx={x} cy={y} r="5" fill="#dcf55a" />
          </g>
        ))}
      </svg>
      <div
        data-float
        className="absolute left-1/2 top-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-se-lime text-se-olive shadow-[0_0_50px_rgba(221,244,106,0.45)]"
      >
        <Sparkles size={30} aria-hidden />
      </div>
      <span
        data-float
        className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1.5 text-xs text-white backdrop-blur"
      >
        Automation
      </span>
    </div>
  );
}

const map: Record<string, () => React.JSX.Element> = {
  "web-development": Web,
  "mobile-apps": Mobile,
  "ui-ux-design": Design,
  "saas-dashboards": Dashboard,
  "e-commerce": Shop,
  "ai-automation": Ai,
};

export default function ServiceIllustration({ slug }: { slug: string }) {
  const Comp = map[slug];
  return Comp ? <Comp /> : null;
}
