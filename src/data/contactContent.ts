import { footer } from "./landingContent";

// Contact page content. Phone, email and location come from the footer data (one source).

export const contactHero = {
  eyebrow: "Contact",
  title: "Let’s build something great together.",
  text: "Tell us about your project. We’ll review it and get back to you with the next steps.",
};

export const contactDetails = [
  { label: "Email", value: footer.email, href: `mailto:${footer.email}` },
  {
    label: "Phone",
    value: footer.phone,
    href: `tel:${footer.phone.replace(/\s/g, "")}`,
  },
  {
    label: "Location",
    value: footer.location,
    href: undefined as string | undefined,
  },
];

export const contactForm = {
  title: "Start a project",
  text: "A few details are enough. You can share more later.",
  types: [
    "Website",
    "Mobile app",
    "SaaS or software platform",
    "E-commerce",
    "Something else",
  ],
  submit: "Send message",
  success: {
    title: "Message sent",
    text: "Thanks for reaching out. We’ll get back to you soon.",
  },
};

export const nextSteps = {
  title: "What happens next",
  text: "A simple, clear path from your message to a project plan.",
  items: [
    {
      title: "We review",
      text: "We read your message and look at what you want to build.",
    },
    {
      title: "We reply",
      text: "You hear back from us with questions, or an invitation to talk it through.",
    },
    {
      title: "You get a plan",
      text: "A clear scope and a fixed quote, so you know exactly what to expect.",
    },
  ],
};
