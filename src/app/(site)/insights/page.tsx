import type { Metadata } from "next";

import InsightsHero from "@/components/insights/InsightsHero";
import FeaturedArticle from "@/components/insights/FeaturedArticle";
import ArticleGrid from "@/components/insights/ArticleGrid";
import Cta from "@/components/sections/CTA";

import { articles } from "@/data/insightsContent";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "");

const canonicalUrl = siteUrl ? `${siteUrl}/insights` : undefined;

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Practical notes on design, engineering and building digital products from StackEthic, a digital engineering studio.",

  alternates: canonicalUrl
    ? {
        canonical: canonicalUrl,
      }
    : undefined,

  openGraph: {
    type: "website",
    title: "Insights",
    description:
      "Practical notes on design, engineering and building digital products from StackEthic.",
    url: canonicalUrl,
    siteName: "StackEthic",
    locale: "en_US",
    ...(siteUrl
      ? {
          images: [
            {
              url: `${siteUrl}/images/insights/hero.jpg`,
              alt: "StackEthic Insights",
            },
          ],
        }
      : {}),
  },

  twitter: {
    card: siteUrl ? "summary_large_image" : "summary",
    title: "Insights",
    description:
      "Practical notes on design, engineering and building digital products from StackEthic.",
    ...(siteUrl
      ? {
          images: [`${siteUrl}/images/insights/hero.jpg`],
        }
      : {}),
  },

  robots: {
    index: true,
    follow: true,
  },
};

const insightsStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": canonicalUrl ? `${canonicalUrl}/#webpage` : undefined,
      name: "Insights | StackEthic",
      description:
        "Practical notes on design, engineering and building digital products from StackEthic.",
      url: canonicalUrl,
      inLanguage: "en",
      isPartOf: siteUrl
        ? {
            "@id": `${siteUrl}/#website`,
          }
        : undefined,
      mainEntity: {
        "@id": canonicalUrl ? `${canonicalUrl}/#articles` : undefined,
      },
      ...(siteUrl
        ? {
            primaryImageOfPage: {
              "@type": "ImageObject",
              url: `${siteUrl}/images/insights/hero.jpg`,
            },
          }
        : {}),
    },
    {
      "@type": "ItemList",
      "@id": canonicalUrl ? `${canonicalUrl}/#articles` : undefined,
      name: "StackEthic Insights Articles",
      numberOfItems: articles.length,
      itemListOrder: "https://schema.org/ItemListOrderDescending",
      itemListElement: articles.map((article, index) => {
        const articleUrl = siteUrl
          ? `${siteUrl}/insights/${article.slug}`
          : undefined;

        const image = article.heroImage || article.cover;

        const imageUrl =
          siteUrl && image
            ? image.startsWith("http")
              ? image
              : `${siteUrl}${image.startsWith("/") ? "" : "/"}${image}`
            : undefined;

        return {
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "BlogPosting",
            "@id": articleUrl ? `${articleUrl}/#article` : undefined,
            headline: article.title,
            description: article.excerpt,
            url: articleUrl,
            articleSection: article.category,
            inLanguage: "en",
            author: {
              "@type": "Organization",
              name: "StackEthic",
              ...(siteUrl ? { url: siteUrl } : {}),
            },
            publisher: {
              "@type": "Organization",
              name: "StackEthic",
              ...(siteUrl ? { url: siteUrl } : {}),
            },
            mainEntityOfPage: articleUrl
              ? {
                  "@type": "WebPage",
                  "@id": articleUrl,
                }
              : undefined,
            ...(imageUrl ? { image: imageUrl } : {}),
          },
        };
      }),
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
          name: "Insights",
          item: canonicalUrl,
        },
      ],
    },
  ],
};

export default function InsightsPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(insightsStructuredData).replace(
            /</g,
            "\\u003c",
          ),
        }}
      />

      <InsightsHero />
      <FeaturedArticle />
      <ArticleGrid />
      <Cta />
    </main>
  );
}
