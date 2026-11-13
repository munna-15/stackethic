import type { Metadata } from "next";

import ContactHero from "@/components/contact/ContactHero";
import NextSteps from "@/components/contact/NextSteps";
import FaqSection from "@/components/sections/FAQ";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "");
const canonicalUrl = siteUrl ? `${siteUrl}/contact` : undefined;

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell StackEthic about your project. We build premium digital experiences and practical software platforms for businesses in Bangladesh and worldwide.",

  alternates: canonicalUrl
    ? {
        canonical: canonicalUrl,
      }
    : undefined,

  openGraph: {
    type: "website",
    title: "Contact StackEthic",
    description:
      "Have a project in mind? Get in touch with StackEthic to discuss your website, software platform or digital product.",
    url: canonicalUrl,
    siteName: "StackEthic",
    locale: "en_US",
  },

  twitter: {
    card: "summary",
    title: "Contact StackEthic",
    description:
      "Have a project in mind? Get in touch with StackEthic to discuss your next digital product.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

const contactStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": canonicalUrl ? `${canonicalUrl}/#webpage` : undefined,
      name: "Contact StackEthic",
      description:
        "Get in touch with StackEthic to discuss your website, software platform or digital product.",
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
          name: "Contact",
          item: canonicalUrl,
        },
      ],
    },
  ],
};

export default function ContactPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactStructuredData).replace(
            /</g,
            "\\u003c",
          ),
        }}
      />

      <ContactHero />
      <NextSteps />
      <div className="mb-12">
        <FaqSection />
      </div>
    </main>
  );
}
