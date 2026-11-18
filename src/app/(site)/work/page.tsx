import type { Metadata } from "next";

import WorkHero from "@/components/work/WorkHero";
import FeaturedProject from "@/components/work/FeaturedProject";
import ProjectGrid from "@/components/work/ProjectGrid";
import TestimonialSection from "@/components/sections/Testimonial";
import Cta from "@/components/sections/CTA";

import { projects } from "@/data/workContent";

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://stackethic.com"
).replace(/\/+$/, "");

export const metadata: Metadata = {
  title: "Selected Work",

  description:
    "Explore StackEthic's selected portfolio of web development, e-commerce, restaurant, real estate and SaaS software projects.",

  alternates: {
    canonical: `${siteUrl}/work`,
  },

  openGraph: {
    type: "website",
    siteName: "StackEthic",
    title: "Selected Work | StackEthic",

    description:
      "Explore selected websites, e-commerce experiences and software platforms developed by StackEthic.",

    url: `${siteUrl}/work`,

    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "StackEthic — Selected Work",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Selected Work | StackEthic",

    description:
      "Explore selected websites, e-commerce experiences and software platforms developed by StackEthic.",

    images: ["/opengraph-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

const workStructuredData = {
  "@context": "https://schema.org",

  "@graph": [
    {
      "@type": "CollectionPage",

      "@id": `${siteUrl}/work/#webpage`,

      name: "Selected Work | StackEthic",

      description:
        "A collection of selected websites, e-commerce experiences and software platforms developed by StackEthic.",

      url: `${siteUrl}/work`,

      inLanguage: "en",

      isPartOf: {
        "@id": `${siteUrl}/#website`,
      },

      breadcrumb: {
        "@id": `${siteUrl}/work/#breadcrumb`,
      },

      mainEntity: {
        "@type": "ItemList",

        "@id": `${siteUrl}/work/#projects`,

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
              "@id": `${siteUrl}/#organization`,
            },

            ...(project.image
              ? {
                  image: project.image.startsWith("http")
                    ? project.image
                    : `${siteUrl}${project.image.startsWith("/") ? "" : "/"}${project.image}`,
                }
              : {}),
          },
        })),
      },
    },

    {
      "@type": "BreadcrumbList",

      "@id": `${siteUrl}/work/#breadcrumb`,

      itemListElement: [
        {
          "@type": "ListItem",

          position: 1,

          name: "Home",

          item: siteUrl,
        },

        {
          "@type": "ListItem",

          position: 2,

          name: "Work",

          item: `${siteUrl}/work`,
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
