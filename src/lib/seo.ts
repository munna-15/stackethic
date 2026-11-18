import type { Metadata } from "next";

/** One place for your site-wide SEO facts. Set NEXT_PUBLIC_SITE_URL in .env.local and on Vercel. */
export const SITE = {
  name: "StackEthic",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://stackethic.com").replace(
    /\/$/,
    "",
  ),
  title: "StackEthic | Digital Engineering Studio",
  description:
    "StackEthic is a digital engineering studio building premium digital experiences and practical software platforms: websites, mobile apps, SaaS, e-commerce and AI automation.",
  email: "hello@stackethic.com",
  locale: "en_US",
  ogImage: "/og-image.png", // 1200x630, in /public
  ogImageAlt: "StackEthic: premium digital products, built to last.",
};

type PageMeta = {
  title: string; // WITHOUT "| StackEthic", the layout adds it
  description: string;
  path: string; // e.g. "/services"
  type?: "website" | "article";
  image?: string; // optional, defaults to the site share image
  imageAlt?: string;
};

/** Use in every page: export const metadata = pageMetadata({ ... }) */
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  image,
  imageAlt,
}: PageMeta): Metadata {
  const fullTitle = `${title} | ${SITE.name}`;
  const img = image ?? SITE.ogImage;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      siteName: SITE.name,
      locale: SITE.locale,
      title: fullTitle,
      description,
      images: [
        {
          url: img,
          width: 1200,
          height: 630,
          alt: imageAlt ?? SITE.ogImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [img],
    },
  };
}
