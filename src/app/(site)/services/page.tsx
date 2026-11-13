import type { Metadata } from "next";

import ServicesHero from "@/components/services/ServicesHero";
import ServiceGrid from "@/components/services/ServiceGrid";
import ProcessSection from "@/components/services/ProcessSection";
import PackagesSection from "@/components/services/PackagesSection";
import FaqSection from "@/components/sections/FAQ";
import Cta from "@/components/sections/CTA";

import { serviceList } from "@/data/servicesContent";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore StackEthic's services including web development, mobile apps, UI/UX design, SaaS platforms, e-commerce and AI automation for businesses in Bangladesh and worldwide.",
};

const servicesStructuredData = {
  "@context": "https://schema.org",
  "@graph": serviceList.map((service) => ({
    "@type": "Service",
    name: service.title,
    description: service.text,
    serviceType: service.title,
    areaServed: ["Bangladesh", "International clients"],
    provider: {
      "@type": "Organization",
      name: "StackEthic",
      url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") || undefined,
    },
  })),
};

export default function ServicesPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(servicesStructuredData).replace(
            /</g,
            "\\u003c",
          ),
        }}
      />

      <ServicesHero />
      <ServiceGrid />
      <ProcessSection />
      <PackagesSection />
      <FaqSection />
      <Cta />
    </main>
  );
}
