import {
  Globe,
  Smartphone,
  PenTool,
  LayoutDashboard,
  ShoppingCart,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

// All copy for the Services page lives here. Everything is placeholder: replace freely.


export const servicesHero = {
  eyebrow: "Our services",
  title: "Design, build and scale.",
  text: "One senior team, from first idea to launch.",
  badge: "Available for new projects",
  tags: ["Next.js", "Flutter", "Figma", "AI"],
  image: "/images/service-hero.jpg",
  imageAlt: "Editorial image for StackEthic services",

  /*
  stats: [
    { value: "50+", label: "Projects" },
    { value: "4 wks", label: "Avg. launch" },
    { value: "98", label: "Lighthouse" },
  ],
  */
};


export const serviceGrid = {
  title: "What we build",
};

export const serviceList: {
  slug: string;
  title: string;
  text: string;
  bullets: string[];
  icon: LucideIcon;
}[] = [
  {
    slug: "web-development",
    title: "Web development",
    text: "Fast, accessible websites and web apps built with modern frameworks.",
    bullets: [
      "Next.js and React",
      "SEO and performance first",
      "CMS and API integration",
    ],
    icon: Globe,
  },
  {
    slug: "mobile-apps",
    title: "Mobile apps",
    text: "Native-feel iOS and Android apps from a single codebase.",
    bullets: [
      "Flutter and React Native",
      "App Store and Play launch",
      "Offline and push support",
    ],
    icon: Smartphone,
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX design",
    text: "Research-backed interfaces and design systems your team can scale.",
    bullets: [
      "User research and flows",
      "Prototypes in Figma",
      "Design systems",
    ],
    icon: PenTool,
  },
  {
    slug: "saas-dashboards",
    title: "SaaS and dashboards",
    text: "Secure multi-user platforms, admin panels and internal tools.",
    bullets: [
      "Auth and roles",
      "Billing and subscriptions",
      "Analytics dashboards",
    ],
    icon: LayoutDashboard,
  },
  {
    slug: "e-commerce",
    title: "E-commerce",
    text: "Online stores that load fast and convert better.",
    bullets: ["Custom storefronts", "Payment gateways", "Inventory and orders"],
    icon: ShoppingCart,
  },
  {
    slug: "ai-automation",
    title: "AI and automation",
    text: "Practical AI features and workflow automation that save real hours.",
    bullets: [
      "Chat and search features",
      "Document processing",
      "Workflow automation",
    ],
    icon: Sparkles,
  },
];


export const process = {
  title: "How we work",
  text: "A thoughtful process that keeps every project clear, collaborative and moving forward.",
  steps: [
    {
      title: "Discover",
      text: "We understand your goals, users and requirements before defining the right direction for your project.",
      // duration: "Week 1",
      deliverables: [
        "Project brief",
        "Goals and requirements",
        "Scope outline",
      ],
    },
    {
      title: "Design",
      text: "We shape the experience through wireframes and visual design, refining the direction before development.",
      // duration: "Weeks 1 to 2",
      deliverables: ["Wireframes", "UI design", "Interactive prototype"],
    },
    {
      title: "Build",
      text: "We turn the approved design into a working product, with implementation, integrations and quality testing.",
      // duration: "Weeks 2 to 5",
      deliverables: ["Development", "API and integrations", "Testing and QA"],
    },
    {
      title: "Launch and support",
      text: "We prepare your product for launch, handle deployment and provide a clear handover for what comes next.",
      // duration: "Week 6 onward",
      deliverables: ["Deployment", "Project handover", "Post-launch guidance"],
    },
  ],
};



export const packages = {
  title: "Simple packages, no hidden costs",
  text: "Every project is different. Let's find the right approach for your goals and requirements.",

  items: [
    {
      name: "Starter",
      price: "Custom quote",
      note: "",
      // Previous placeholder: "$2,500 from"
      blurb: "For landing pages and business websites.",
      features: [
        "Custom website design",
        "Responsive development",
        "Essential SEO setup",
        "Contact and inquiry forms",
      ],
      featured: false,
    },
    {
      name: "Growth",
      price: "Custom quote",
      note: "",
      // Previous placeholder: "$7,500 from"
      blurb: "For growing businesses and digital products.",
      features: [
        "Custom UI/UX design",
        "Web applications and MVPs",
        "API and database integration",
        "Third-party integrations",
        "Quality testing",
      ],
      featured: false,
    },
    {
      name: "Scale",
      price: "Let's discuss",
      note: "",
      blurb: "For complex platforms and evolving business needs.",
      features: [
        "Custom software solutions",
        "Advanced integrations",
        "Scalable architecture",
        "Ongoing development planning",
      ],
      featured: false,
    },
  ],
};

