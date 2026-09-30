import type { MetadataRoute } from "next";
import { clinic } from "@/data/clinic";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: clinic.url, changeFrequency: "monthly", priority: 1 },
    { url: `${clinic.url}/privacy`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
