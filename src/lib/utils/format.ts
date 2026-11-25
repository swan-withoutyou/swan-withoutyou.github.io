import { siteConfig } from "@/config/site";

export function formatNumber(n: number, locale = "vi-VN"): string {
  return new Intl.NumberFormat(locale).format(n);
}

export function formatCompact(n: number): string {
  return new Intl.NumberFormat("vi-VN", { notation: "compact", maximumFractionDigits: 1 }).format(n);
}

export function formatDateTime(iso: string, locale = "vi-VN"): string {
  return new Intl.DateTimeFormat(locale, {
    timeZone: siteConfig.timezone,
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(iso));
}

export function formatDate(iso: string, locale = "vi-VN"): string {
  return new Intl.DateTimeFormat(locale, { timeZone: siteConfig.timezone, dateStyle: "long" }).format(new Date(iso));
}
