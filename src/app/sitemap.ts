import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/projects", "/services", "/about", "/contacts"];
  return [...pages.map((p) => ({ url: `${site.url}${p}`, priority: p ? 0.8 : 1 })), ...projects.map((p) => ({ url: `${site.url}/projects/${p.slug}`, priority: 0.7 }))];
}
