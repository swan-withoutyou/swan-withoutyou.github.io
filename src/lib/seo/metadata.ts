import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

const OG_IMAGE = "/images/og/og-default.png";

/** Builds consistent page metadata with canonical URL, Open Graph and Twitter cards. */
export function pageMetadata({
  title,
  description,
  path,
  noindex = false,
}: {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
}): Metadata {
  const url = `${siteConfig.url}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      images: [{ url: `${siteConfig.url}${OG_IMAGE}`, width: 1200, height: 630, alt: "SWAN — Thiếu Nàng" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteConfig.url}${OG_IMAGE}`],
    },
  };
}
