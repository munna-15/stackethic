import type { Metadata } from "next";

import WorkHero from "@/components/work/WorkHero";
import FeaturedProject from "@/components/work/FeaturedProject";
import ProjectGrid from "@/components/work/ProjectGrid";
import TestimonialSection from "@/components/sections/Testimonial";
import Cta from "@/components/sections/CTA";

import { projects } from "@/data/workContent";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "");

export const metadata: Metadata = {
  title: "Selected Work",
  description:
    "Explore StackEthic's selected portfolio of web development, e-commerce, restaurant, real estate and SaaS software projects.",
};

const workStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": siteUrl ? `${siteUrl}/work/#webpage` : undefined,
      name: "Selected Work | StackEthic",
      description:
        "A collection of selected websites, e-commerce experiences and software platforms developed by StackEthic.",
      url: siteUrl ? `${siteUrl}/work` : undefined,
      inLanguage: "en",
      isPartOf: siteUrl
        ? {
            "@id": `${siteUrl}/#website`,
          }
        : undefined,
      mainEntity: {
        "@id": siteUrl ? `${siteUrl}/work/#projects` : undefined,
        "@type": "ItemList",
        name: "StackEthic Selected Projects",
        numberOfItems: projects.length,
        itemListOrder: "https://schema.org/ItemListOrderAscending",
        itemListElement: projects.map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "CreativeWork",
            name: project.title,
            description: project.description,
            url: project.url,
            genre: project.category,
            creator: {
              "@type": "Organization",
              name: "StackEthic",
              url: siteUrl || undefined,
            },
            ...(siteUrl && project.image
              ? { image: `${siteUrl}${project.image}` }
              : {}),
          },
        })),
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": siteUrl ? `${siteUrl}/work/#breadcrumb` : undefined,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteUrl || undefined,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Work",
          item: siteUrl ? `${siteUrl}/work` : undefined,
        },
      ],
    },
  ],
};

export default function WorkPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(workStructuredData).replace(/</g, "\\u003c"),
        }}
      />

      <WorkHero />
      <FeaturedProject />
      <ProjectGrid />
      <TestimonialSection />
      <Cta />
    </main>
  );
}
