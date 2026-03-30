import type { MetadataRoute } from "next";
import { getDevAppOrigin } from "@/lib/site";

const baseUrl = getDevAppOrigin();

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
