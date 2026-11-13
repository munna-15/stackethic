import type { Metadata } from "next";

import Articles from "@/components/sections/Articles";
import Calculator from "@/components/sections/Calculator";
import Cta from "@/components/sections/CTA";
import Faq from "@/components/sections/FAQ";
import Growth from "@/components/sections/Growth";
import Hero from "@/components/sections/Hero";
import LogoMarquee from "@/components/sections/LogoMarquee";
import Services from "@/components/sections/Services";
import Testimonial from "@/components/sections/Testimonial";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "");



export const metadata: Metadata = {
  title: "Digital Engineering Studio",
  description:
    "StackEthic is a digital engineering studio building high-performance websites, custom software, AI automation, and scalable digital solutions for businesses in Bangladesh and worldwide.",
  keywords: [
    "digital engineering studio",
    "web development company in Bangladesh",
    "web development agency",
    "custom software development",
    "AI automation services",
    "business website development",
    "scalable web applications",
    "software development company Bangladesh",
    "international web development agency",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "StackEthic",
    title: "StackEthic | Digital Engineering Studio",
    description:
      "We design and engineer high-performance websites, custom software, and AI-powered solutions for ambitious businesses.",
    url: siteUrl ? `${siteUrl}/` : "https://stackethic.vercel.app/",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "StackEthic — Digital Engineering Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "StackEthic | Digital Engineering Studio",
    description:
      "Digital engineering, custom software, web development, and AI automation for businesses worldwide.",
    images: ["/opengraph-image.png"],
  },
  alternates: {
    canonical: siteUrl ? `${siteUrl}/` : "https://stackethic.vercel.app/",
  },
  robots: {
    index: true,
    follow: true,
  },
};



const homeStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": siteUrl ? `${siteUrl}/#webpage` : undefined,
      url: siteUrl || undefined,
      name: "StackEthic | Digital Engineering Studio",
      description:
        "StackEthic is a digital engineering studio building high-performance websites, custom software, AI automation, and scalable digital solutions for businesses in Bangladesh and worldwide.",
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
    },
    {
      "@type": "BreadcrumbList",
      "@id": siteUrl ? `${siteUrl}/#breadcrumb` : undefined,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteUrl || undefined,
        },
      ],
    },
  ],
};

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homeStructuredData).replace(/</g, "\\u003c"),
        }}
      />

      <Hero />
      <LogoMarquee />
      <Services />
      <Growth />
      <Calculator />
      <Faq />
      <Testimonial />
      <Articles />
      <Cta />
    </main>
  );
}
