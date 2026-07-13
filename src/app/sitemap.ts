import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { categories } from "@/data/categories";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = [
    "",
    "/sobre",
    "/servicos",
    "/campanhas",
    "/contato",
    "/faq",
    "/politica-de-privacidade",
    "/termos-de-uso",
  ];

  const routes = staticRoutes.map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const categoryRoutes = categories.map((c) => ({
    url: `${site.url}/servicos/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...routes, ...categoryRoutes];
}
