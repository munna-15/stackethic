import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getAdjacent, getProject, projects } from "@/data/workContent";

import CaseHero from "@/components/case-study/CaseHero";
import CaseOverview from "@/components/case-study/CaseOverview";
import CaseDetails from "@/components/case-study/CaseDetails";
import NextProject from "@/components/case-study/NextProject";
import Cta from "@/components/sections/CTA";

type Props = {
  params: Promise<{ slug: string }>;
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "");

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return {};

  const canonicalUrl = siteUrl ? `${siteUrl}/work/${project.slug}` : undefined;

  const image = project.image || project.details?.gallery?.[0];

  const imageUrl =
    siteUrl && image
      ? image.startsWith("http")
        ? image
        : `${siteUrl}${image.startsWith("/") ? "" : "/"}${image}`
      : undefined;

  return {
    title: project.title,
    description: project.description,

    alternates: canonicalUrl
      ? {
          canonical: canonicalUrl,
        }
      : undefined,

    openGraph: {
      type: "website",
      title: project.title,
      description: project.description,
      url: canonicalUrl,
      siteName: "StackEthic",
      locale: "en_US",
      ...(imageUrl
        ? {
            images: [
              {
                url: imageUrl,
                alt: `${project.title} — ${project.category}`,
              },
            ],
          }
        : {}),
    },

    twitter: {
      card: imageUrl ? "summary_large_image" : "summary",
      title: project.title,
      description: project.description,
      ...(imageUrl
        ? {
            images: [
              {
                url: imageUrl,
                alt: `${project.title} — ${project.category}`,
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

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const { prev, next } = getAdjacent(slug);

  const canonicalUrl = siteUrl ? `${siteUrl}/work/${project.slug}` : undefined;

  const image = project.image || project.details?.gallery?.[0];

  const imageUrl =
    siteUrl && image
      ? image.startsWith("http")
        ? image
        : `${siteUrl}${image.startsWith("/") ? "" : "/"}${image}`
      : undefined;

  const caseStudyStructuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": canonicalUrl ? `${canonicalUrl}/#webpage` : undefined,
        name: `${project.title} — StackEthic`,
        description: project.description,
        url: canonicalUrl,
        inLanguage: "en",
        isPartOf: siteUrl
          ? {
              "@id": `${siteUrl}/#website`,
            }
          : undefined,
        mainEntity: {
          "@id": canonicalUrl ? `${canonicalUrl}/#project` : undefined,
        },
        ...(imageUrl
          ? {
              primaryImageOfPage: {
                "@type": "ImageObject",
                url: imageUrl,
              },
            }
          : {}),
      },
      {
        "@type": "CreativeWork",
        "@id": canonicalUrl ? `${canonicalUrl}/#project` : undefined,
        name: project.title,
        description: project.description,
        genre: project.category,
        keywords: project.focus,
        url: canonicalUrl,
        creator: {
          "@type": "Organization",
          name: "StackEthic",
          ...(siteUrl ? { url: siteUrl } : {}),
        },
        ...(imageUrl ? { image: imageUrl } : {}),
        ...(project.details?.stack?.length
          ? {
              programmingLanguage: project.details.stack,
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
            name: "Work",
            item: siteUrl ? `${siteUrl}/work` : undefined,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: project.title,
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
          __html: JSON.stringify(caseStudyStructuredData).replace(
            /</g,
            "\\u003c",
          ),
        }}
      />

      <CaseHero project={project} />
      <CaseOverview project={project} />
      <CaseDetails project={project} />
      <NextProject prev={prev} next={next} />
      <Cta />
    </main>
  );
}
