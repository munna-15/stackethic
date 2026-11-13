import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { articles, getArticle, getRelated } from "@/data/insightsContent";

import ArticleHero from "@/components/insights/ArticleHero";
import ArticleBody from "@/components/insights/ArticleBody";
import RelatedArticles from "@/components/insights/RelatedArticles";
import Cta from "@/components/sections/CTA";

type Props = {
  params: Promise<{ slug: string }>;
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "");

export function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

function getAbsoluteImageUrl(image?: string) {
  if (!image || !siteUrl) return undefined;

  if (image.startsWith("http")) return image;

  return `${siteUrl}${image.startsWith("/") ? "" : "/"}${image}`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) return {};

  const canonicalUrl = siteUrl
    ? `${siteUrl}/insights/${article.slug}`
    : undefined;

  const imageUrl = getAbsoluteImageUrl(article.heroImage || article.cover);

  return {
    title: article.title,
    description: article.excerpt,

    alternates: canonicalUrl
      ? {
          canonical: canonicalUrl,
        }
      : undefined,

    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      url: canonicalUrl,
      siteName: "StackEthic",
      locale: "en_US",
      ...(article.date ? { publishedTime: article.date } : {}),
      ...(imageUrl
        ? {
            images: [
              {
                url: imageUrl,
                alt: article.title,
              },
            ],
          }
        : {}),
    },

    twitter: {
      card: imageUrl ? "summary_large_image" : "summary",
      title: article.title,
      description: article.excerpt,
      ...(imageUrl
        ? {
            images: [
              {
                url: imageUrl,
                alt: article.title,
              },
            ],
          }
        : {}),
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) notFound();

  const canonicalUrl = siteUrl
    ? `${siteUrl}/insights/${article.slug}`
    : undefined;

  const imageUrl = getAbsoluteImageUrl(article.heroImage || article.cover);

  const articleStructuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": canonicalUrl ? `${canonicalUrl}/#article` : undefined,
        headline: article.title,
        description: article.excerpt,
        url: canonicalUrl,
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
        mainEntityOfPage: canonicalUrl
          ? {
              "@type": "WebPage",
              "@id": canonicalUrl,
            }
          : undefined,
        ...(imageUrl ? { image: imageUrl } : {}),
        ...(article.date
          ? {
              datePublished: article.date,
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
            name: "Insights",
            item: siteUrl ? `${siteUrl}/insights` : undefined,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: article.title,
            item: canonicalUrl,
          },
        ],
      },
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleStructuredData).replace(
            /</g,
            "\\u003c",
          ),
        }}
      />

      <ArticleHero article={article} />
      <ArticleBody article={article} />
      <RelatedArticles articles={getRelated(slug)} />
      <Cta />
    </main>
  );
}
