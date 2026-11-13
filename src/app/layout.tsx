import type { Metadata } from "next";
import { DM_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-sans-next",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "");

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,

  title: {
    default: "StackEthic — Digital Engineering Studio",
    template: "%s | StackEthic",
  },

  description:
    "StackEthic is a digital engineering studio building thoughtful websites, custom software, AI-powered automation and reliable cloud solutions for businesses worldwide.",

  applicationName: "StackEthic",

  keywords: [
    "StackEthic",
    "Digital Engineering Studio",
    "Software Development Agency",
    "Web Development Agency",
    "Custom Software Development",
    "AI Automation",
    "Cloud Solutions",
    "Software Development Company Bangladesh",
    "Web Development Bangladesh",
  ],

  category: "technology",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "StackEthic",
    title: "StackEthic — Digital Engineering Studio",
    description:
      "Thoughtful websites, custom software, AI-powered automation and reliable cloud solutions for businesses worldwide.",
  },

  twitter: {
    card: "summary_large_image",
    title: "StackEthic — Digital Engineering Studio",
    description:
      "Thoughtful websites, custom software, AI-powered automation and reliable cloud solutions for businesses worldwide.",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": siteUrl ? `${siteUrl}/#organization` : undefined,
      name: "StackEthic",
      description:
        "StackEthic is a digital engineering studio building thoughtful websites, custom software, AI-powered automation and reliable cloud solutions.",
      url: siteUrl || undefined,
      telephone: "+8801792960610",
      areaServed: ["Bangladesh", "Worldwide"],
      knowsAbout: [
        "Web Development",
        "Custom Software Development",
        "AI Automation",
        "Cloud Solutions",
        "Software Engineering",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+8801792960610",
        contactType: "business inquiries",
        availableLanguage: ["English", "Bengali"],
      },
    },
    {
      "@type": "WebSite",
      "@id": siteUrl ? `${siteUrl}/#website` : undefined,
      name: "StackEthic",
      description:
        "Digital Engineering Studio for web development, custom software, AI automation and cloud solutions.",
      url: siteUrl || undefined,
      inLanguage: "en",
      publisher: {
        "@id": siteUrl ? `${siteUrl}/#organization` : undefined,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${dmSans.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        <SmoothScroll />

        {children}
      </body>
    </html>
  );
}
