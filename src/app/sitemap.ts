import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/content";
import { getAllInstruments } from "@/lib/screening/instruments";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://covered-iota.vercel.app";

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, changeFrequency: "monthly", priority: 1 },
    { url: `${baseUrl}/screen`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/providers`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/learn`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/about`, changeFrequency: "monthly", priority: 0.5 },
  ];

  const instruments = getAllInstruments().map((i) => ({
    url: `${baseUrl}/screen/${i.id}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const articles = (await getAllArticles()).map((a) => ({
    url: `${baseUrl}/learn/${a.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...instruments, ...articles];
}
