// Insights (blog) content.
// Article images are stored in public/images/insights/.

export const insightsHero = {
  eyebrow: "Insights",
  title: "Ideas on design, engineering and building products.",
  text: "Practical notes from the way we plan, design and build digital products.",
  image: "/images/insights/hero.jpg",
  imageAlt: "StackEthic insights",
};

export const categories = ["All", "Product", "Engineering", "Design"] as const;

export type Category = Exclude<(typeof categories)[number], "All">;

export type Block =
  | { type: "h2"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string };

export type Article = {
  slug: string;
  title: string;
  category: Category;
  excerpt: string;
  cover?: string;
  heroImage?: string;
  gradient: string;
  date?: string;
  body: Block[];
};

export const articles: Article[] = [
  {
    slug: "how-to-scope-your-first-mvp",
    title: "How to Scope Your First MVP",
    category: "Product",
    excerpt:
      "A minimum viable product is about learning fast, not building less. Here is how to decide what goes in and what waits.",
    cover: "/images/insights/how-to-scope-your-first-mvp.jpg",
    gradient: "bg-[linear-gradient(135deg,#4f8a8c,#183436)]",
    body: [
      {
        type: "p",
        text: "The hardest part of a first release is not the building, it is the choosing. Every idea feels essential at the start. A good scope turns that long list into one clear goal that you can test with real users.",
      },
      { type: "h2", text: "Start with one outcome" },
      {
        type: "p",
        text: "Write a single sentence describing what a user should be able to do after using your product. If the sentence needs the word “and” more than once, you are probably describing two products.",
      },
      { type: "h2", text: "Sort features into three groups" },
      {
        type: "ul",
        items: [
          "Must have: the product cannot deliver the outcome without it.",
          "Should have: it improves the experience but can ship a little later.",
          "Could have: nice ideas that wait until you have real feedback.",
        ],
      },
      { type: "h2", text: "Design for change, not for perfection" },
      {
        type: "p",
        text: "Your first version will teach you things you could not have guessed. Build it on a clean foundation so that changing direction is cheap. A small product that is easy to extend beats a large one that is hard to touch.",
      },
      {
        type: "quote",
        text: "The goal of a first release is not to be complete. It is to find out what matters.",
      },
    ],
  },

  {
    slug: "scaling-through-traffic-peaks",
    title: "Scaling Through Traffic Peaks: a Playbook",
    category: "Engineering",
    excerpt:
      "Campaigns, launches and seasonal spikes can break a product that works fine on a quiet day. Prepare before the peak arrives.",
    cover: "/images/insights/scaling-through-traffic-peaks.jpg",
    gradient: "bg-[linear-gradient(135deg,#a58b5a,#4b3a1f)]",
    body: [
      {
        type: "p",
        text: "A traffic peak is a test you can see coming. Planning for it is far cheaper than fixing an outage while customers are watching.",
      },
      { type: "h2", text: "Find the slowest part first" },
      {
        type: "p",
        text: "Before adding servers, measure. Most slowdowns come from a few expensive database queries or heavy pages, not from the whole system. Fixing the real bottleneck is usually faster and cheaper than scaling everything.",
      },
      { type: "h2", text: "A simple checklist" },
      {
        type: "ul",
        items: [
          "Cache pages and data that do not change on every request.",
          "Serve images and static files from a content delivery network.",
          "Add database indexes for the queries you run most.",
          "Load test with realistic traffic before the event, not during it.",
          "Set up alerts so you hear about problems before users do.",
        ],
      },
      { type: "h2", text: "Plan for failure" },
      {
        type: "p",
        text: "Decide in advance what happens if something does break. A simple fallback page or a temporarily disabled feature is much better than a broken checkout.",
      },
    ],
  },

  {
    slug: "smart-ways-to-use-design-systems",
    title: "Smart Ways to Use Design Systems",
    category: "Design",
    excerpt:
      "A design system is not a style guide. Used well, it is a shared language that makes products faster to build and easier to keep consistent.",
    cover: "/images/insights/smart-ways-to-use-design-systems.jpg",
    gradient: "bg-[linear-gradient(135deg,#5b7a43,#243417)]",
    body: [
      {
        type: "p",
        text: "Many teams treat a design system as a one-off project. The ones that work treat it as a product with users, and those users are the designers and developers who build with it.",
      },
      { type: "h2", text: "Start small and grow with real use" },
      {
        type: "p",
        text: "You do not need a hundred components on day one. Begin with the pieces you use everywhere: colors, type, spacing, buttons and form fields. Add more when a real project needs them.",
      },
      { type: "h2", text: "Keep design and code in sync" },
      {
        type: "ul",
        items: [
          "Use the same names in design files and in code.",
          "Store colors and spacing as tokens in one place.",
          "Document when to use a component, not only how it looks.",
        ],
      },
      { type: "h2", text: "Why it pays off" },
      {
        type: "p",
        text: "A good system removes repeated decisions. Teams spend less time debating details and more time solving the actual problem for the user.",
      },
    ],
  },

  {
    slug: "web-app-or-mobile-app",
    title: "Web App or Mobile App: How to Choose",
    category: "Product",
    excerpt:
      "The right choice depends on your users and what your product needs to do. Here are the questions worth asking before you commit.",
    cover: "/images/insights/web-app-or-mobile-app.jpg",
    gradient: "bg-[linear-gradient(135deg,#5b6aa8,#1f2547)]",
    body: [
      {
        type: "p",
        text: "Both can be the right answer. The mistake is choosing based on habit instead of on how people will actually use the product.",
      },
      { type: "h2", text: "Questions to ask" },
      {
        type: "ul",
        items: [
          "Will people use it daily, or only now and then?",
          "Does it need the camera, notifications, offline use or other device features?",
          "Do you need to be found through search engines?",
          "How quickly do you need to launch and learn?",
        ],
      },
      { type: "h2", text: "A practical way to start" },
      {
        type: "p",
        text: "A web app is often the fastest way to reach users and learn from them. If the product proves itself and needs deeper device features, a mobile app can follow. Cross-platform tools also let one codebase serve both iOS and Android.",
      },
    ],
  },

  {
    slug: "what-a-fixed-scope-quote-should-include",
    title: "What a Fixed-Scope Quote Should Include",
    category: "Product",
    excerpt:
      "A fixed quote only works when both sides agree on what is being built. Here is what a clear quote covers.",
    cover: "/images/insights/what-a-fixed-scope-quote-should-include.jpg",
    gradient: "bg-[linear-gradient(135deg,#8a5e8a,#2d1d3a)]",
    body: [
      {
        type: "p",
        text: "A quote is more than a number. It is a shared understanding of what will be delivered, how, and by when. The clearer it is, the fewer surprises later.",
      },
      { type: "h2", text: "What to look for" },
      {
        type: "ul",
        items: [
          "A written list of features and pages that are included.",
          "What is not included, so nothing is assumed.",
          "A timeline with clear milestones and review points.",
          "How changes to the scope are handled and priced.",
          "What you receive at the end: code, designs and access.",
        ],
      },
      { type: "h2", text: "Clarity protects both sides" },
      {
        type: "p",
        text: "When the scope is written down, you know what you are paying for, and the team knows what to build. Change is still possible, it simply becomes a conversation instead of a dispute.",
      },
    ],
  },

  {
    slug: "building-software-that-lasts",
    title: "Building Software That Lasts",
    category: "Engineering",
    excerpt:
      "Software is never finished. The choices made in the first weeks decide how easy it is to change a year later.",
    cover: "/images/insights/building-software-that-lasts.jpg",
    gradient: "bg-[linear-gradient(135deg,#7a8a4a,#2b3200)]",
    body: [
      {
        type: "p",
        text: "Most of a product’s life happens after launch. Code that is easy to read and change keeps costs low and lets you respond to what your users need.",
      },
      { type: "h2", text: "Habits that make a difference" },
      {
        type: "ul",
        items: [
          "Keep things simple. Add complexity only when it is needed.",
          "Write automated tests for the parts that matter most.",
          "Use clear names and short, focused pieces of code.",
          "Document decisions, not only code.",
        ],
      },
      { type: "h2", text: "Think about the next developer" },
      {
        type: "p",
        text: "The next person to open the code might be you in six months. Building so that someone new can understand it quickly is the best way to make software last.",
      },
      {
        type: "quote",
        text: "Good software is easy to change, because the world around it always will.",
      },
    ],
  },
];

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const getArticle = (slug: string) =>
  articles.find((a) => a.slug === slug);

/** Estimated reading time, computed from the article text */
export function readTime(a: Article) {
  const words = [
    a.excerpt,
    ...a.body.map((b) => ("text" in b ? b.text : b.items.join(" "))),
  ]
    .join(" ")
    .split(/\s+/).length;

  return Math.max(1, Math.round(words / 200));
}

/** Other articles, same category first */
export function getRelated(slug: string, count = 3) {
  const current = getArticle(slug);
  const others = articles.filter((a) => a.slug !== slug);
  const same = others.filter((a) => a.category === current?.category);

  return [...same, ...others.filter((a) => !same.includes(a))].slice(0, count);
}
