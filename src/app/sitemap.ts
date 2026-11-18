import type { MetadataRoute } from "next";

import { projects } from "@/data/workContent";
import { articles } from "@/data/insightsContent";

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://stackethic.com"
).replace(/\/+$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/services",
    "/work",
    "/about",
    "/contact",
    "/insights",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map(
    (route): MetadataRoute.Sitemap[number] => ({
      url: `${siteUrl}${route}`,
      changeFrequency: route === "" ? "weekly" : "monthly",
      priority:
        route === ""
          ? 1
          : route === "/services" || route === "/work"
            ? 0.9
            : 0.7,
    }),
  );

  const projectEntries: MetadataRoute.Sitemap = projects.map(
    (project): MetadataRoute.Sitemap[number] => ({
      url: `${siteUrl}/work/${project.slug}`,
      changeFrequency: "monthly",
      priority: 0.8,
    }),
  );

  const articleEntries: MetadataRoute.Sitemap = articles.map(
    (article): MetadataRoute.Sitemap[number] => ({
      url: `${siteUrl}/insights/${article.slug}`,
      changeFrequency: "monthly",
      priority: 0.7,
    }),
  );

  return [...staticEntries, ...projectEntries, ...articleEntries];
}
