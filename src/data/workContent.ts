/* Work page content. Only facts from the portfolio brief are used here. */

export const workHero = {
  eyebrow: "Our work",
  title: "Selected work.",
  text: "From premium digital experiences to practical software platforms.",
  image: "/images/work-hero-01.jpg",
  imageAlt: "Selected StackEthic projects",
  stats: [
    { value: "7", label: "Selected projects" },
    { value: "4", label: "Categories" },
    { value: "3", label: "SaaS platforms" },
  ],
};

export const filters = [
  "All",
  "E-commerce",
  "Restaurant",
  "Real Estate",
  "SaaS",
] as const;

export type Group = Exclude<(typeof filters)[number], "All">;

export type Project = {
  no: string;
  slug: string;
  title: string;
  group: Group;
  category: string;
  kind: "website" | "software";
  description: string;
  focus: string[];
  url: string;
  image?: string;
  gradient: string;
  details?: {
    role?: string;
    year?: string;
    stack?: string[];
    challenge?: string;
    solution?: string;
    gallery?: string[];
  };
};

const raw: Omit<Project, "no">[] = [
  {
    slug: "maison-verane",
    title: "Maison Vérane",
    group: "E-commerce",
    category: "Luxury Fashion E-commerce",
    kind: "website",
    description:
      "A premium fashion e-commerce experience with elegant visual storytelling, refined product presentation and editorial layouts.",
    focus: [
      "Luxury branding",
      "Fashion presentation",
      "Responsive UI",
      "E-commerce experience",
    ],
    url: "https://maisonverane-two.vercel.app",
    image: "/images/work/maison-verane.png",
    gradient: "bg-[linear-gradient(135deg,#d9c3b0,#6b4a3a)]",
  },

  {
    slug: "averon",
    title: "AVÉRON",
    group: "E-commerce",
    category: "Luxury Fashion E-commerce",
    kind: "website",
    description:
      "A contemporary menswear e-commerce concept with a premium brand identity, curated collections and a refined shopping experience.",
    focus: [
      "Brand identity",
      "Product catalog",
      "Wishlist and cart",
      "Responsive design",
    ],
    url: "https://averon-five.vercel.app",
    image: "/images/work/averon.png",
    gradient: "bg-[linear-gradient(135deg,#4a4a48,#14140f)]",
  },

  {
    slug: "ocaso-skyscape",
    title: "OCASO Skyscape",
    group: "Restaurant",
    category: "Premium Restaurant Website",
    kind: "website",
    description:
      "A cinematic restaurant website that communicates atmosphere and brand identity through immersive visual storytelling.",
    focus: [
      "Restaurant branding",
      "Immersive layouts",
      "Menu presentation",
      "Responsive navigation",
    ],
    url: "https://ocaso-skyscape.vercel.app",
    image: "/images/work/ocaso.png",
    gradient: "bg-[linear-gradient(135deg,#d9783a,#2a1208)]",
  },

  {
    slug: "sm-builders",
    title: "SM Builders",
    group: "Real Estate",
    category: "Real Estate Website",
    kind: "website",
    description:
      "A professional real estate website focused on architectural presentation, property discovery and trust.",
    focus: [
      "Property presentation",
      "Architectural visuals",
      "Responsive layouts",
      "Content organization",
    ],
    url: "https://sm-builders-gamma.vercel.app",
    image: "/images/work/sm-builders.png",
    gradient: "bg-[linear-gradient(135deg,#5b6aa8,#1a1f3a)]",
  },

  {
    slug: "z-core",
    title: "Z-Core",
    group: "SaaS",
    category: "SaaS / AI-Powered Software Platform",
    kind: "software",
    description:
      "A modern digital platform combining an engaging web experience, an intuitive management dashboard and AI-powered intelligence in one connected software ecosystem.",
    focus: [
      "Website experience",
      "Management dashboard",
      "AI intelligence",
      "Full-stack development",
    ],
    url: "https://z-core.vercel.app",
    image: "/images/work/z-core.png",
    gradient: "bg-[linear-gradient(135deg,#2f8f8f,#12263a)]",

    details: {
      role: "Product design and full-stack development",
      stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      challenge:
        "Creating a connected digital experience requires more than a website. Users also need an intuitive dashboard and intelligent tools within the same software ecosystem.",
      solution:
        "Z-Core brings together a public-facing website, a structured management dashboard and an AI intelligence interface to create a unified digital product experience.",
      gallery: [
        "/images/work/z-core-dashboard.png",
        "/images/work/z-core-ai-intelligence.png",
      ],
    },
  },

  {
    slug: "restaurant-os",
    title: "RestaurantOS",
    group: "SaaS",
    category: "Restaurant Management SaaS",
    kind: "software",
    description:
      "A restaurant management system that brings operations and digital ordering workflows into one software platform.",
    focus: [
      "Restaurant management",
      "Digital ordering",
      "Operational workflows",
      "Responsive interfaces",
    ],
    url: "https://restaurant-full-management-system.vercel.app",
    image: "/images/work/restaurantos.png",
    gradient: "bg-[linear-gradient(135deg,#6c8a3a,#1d2a10)]",
  },

  {
    slug: "leadflow",
    title: "LeadFlow",
    group: "SaaS",
    category: "Lead Management SaaS",
    kind: "software",
    description:
      "A lead management platform that handles everything about your leads in one place, with built-in AI features.",
    focus: [
      "Lead management",
      "Dashboard interface",
      "AI features",
      "Full-stack development",
    ],
    url: "https://client-wine-six-31.vercel.app",
    image: "/images/work/leadflow.png",
    gradient: "bg-[linear-gradient(135deg,#6a5bd0,#1d1740)]",
  },
];

export const projects: Project[] = raw.map((p, i) => ({
  ...p,
  no: String(i + 1).padStart(2, "0"),
}));

// The spotlight project. The rest are listed in the grid below it.
export const featuredSlug = "maison-verane";

export const featured = projects.find((p) => p.slug === featuredSlug)!;

export const gridProjects = projects.filter((p) => p.slug !== featuredSlug);

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);

/** Previous and next project, wrapping around at both ends. */
export function getAdjacent(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);

  return {
    prev: projects[(i - 1 + projects.length) % projects.length],
    next: projects[(i + 1) % projects.length],
  };
}
