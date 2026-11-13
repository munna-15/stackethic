import type { Metadata } from "next";

import AboutHero from "@/components/about/AboutHero";
import ManifestoSection from "@/components/about/ManifestoSection";
import PrinciplesSection from "@/components/about/PrinciplesSection";
import ParallaxGallery from "@/components/about/ParallaxGallery";
import CapabilitiesSection from "@/components/about/CapabilitiesSection";
import WorkMarquee from "@/components/about/WorkMarquee";
import Cta from "@/components/sections/CTA";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "");

const canonicalUrl = siteUrl ? `${siteUrl}/about` : undefined;

export const metadata: Metadata = {
  title: "About",
  description:
    "StackEthic is a digital engineering studio building premium digital experiences and practical software platforms.",

  alternates: canonicalUrl
    ? {
        canonical: canonicalUrl,
      }
    : undefined,

  openGraph: {
    type: "website",
    title: "About StackEthic",
    description:
      "Learn about StackEthic, our approach to design, engineering and building practical digital products.",
    url: canonicalUrl,
    siteName: "StackEthic",
    locale: "en_US",
    ...(siteUrl
      ? {
          images: [
            {
              url: `${siteUrl}/images/about/about-hero.jpg`,
              alt: "The StackEthic studio",
            },
          ],
        }
      : {}),
  },

  twitter: {
    card: siteUrl ? "summary_large_image" : "summary",
    title: "About StackEthic",
    description:
      "Learn about StackEthic, our approach to design, engineering and building practical digital products.",
    ...(siteUrl
      ? {
          images: [`${siteUrl}/images/about/about-hero.jpg`],
        }
      : {}),
  },

  robots: {
    index: true,
    follow: true,
  },
};

const aboutStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": canonicalUrl ? `${canonicalUrl}/#webpage` : undefined,
      name: "About StackEthic",
      description:
        "StackEthic is a digital engineering studio building premium digital experiences and practical software platforms.",
      url: canonicalUrl,
      inLanguage: "en",
      isPartOf: siteUrl
        ? {
            "@id": `${siteUrl}/#website`,
          }
        : undefined,
      about: {
        "@id": siteUrl ? `${siteUrl}/#organization` : undefined,
      },
      mainEntity: {
        "@id": siteUrl ? `${siteUrl}/#organization` : undefined,
      },
      ...(siteUrl
        ? {
            primaryImageOfPage: {
              "@type": "ImageObject",
              url: `${siteUrl}/images/about/about-hero.jpg`,
            },
          }
        : {}),
    },
    {
      "@type": "BreadcrumbList",
      "@id": canonicalUrl ? `${canonicalUrl}/#breadcrumb` : undefined,
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
          name: "About",
          item: canonicalUrl,
        },
      ],
    },
  ],
};

export default function AboutPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aboutStructuredData).replace(/</g, "\\u003c"),
        }}
      />

      <AboutHero />
      <ManifestoSection />
      <PrinciplesSection />
      <ParallaxGallery />
      <CapabilitiesSection />
      <WorkMarquee />
      <Cta />
    </main>
  );
}
