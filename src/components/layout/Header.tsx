"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { campaignNav, navItems } from "@/config/site";
import { SwanMark } from "@/components/ui/SwanMark";

function isActive(pathname: string, href: string) {
  const norm = (p: string) => (p.endsWith("/") ? p : `${p}/`);
  if (href === "/") return pathname === "/";
  return norm(pathname).startsWith(norm(href));
}

export function Header() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition duration-700 ease-cine ${
        scrolled || open ? "bg-night/75 backdrop-blur-xl border-b border-lilac/10" : "bg-transparent"
      }`}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded focus:bg-cloud focus:px-3 focus:py-2 focus:text-night">
        Bỏ qua tới nội dung
      </a>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="group flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <img src="/images/swan logo.png" alt=" " className="h-8 w-auto" />
          
        </Link>

        <nav aria-label="Điều hướng chính" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {navItems.map((n) => {
              const active = isActive(pathname, n.href);
              return (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative whitespace-nowrap rounded-full px-3 py-2 text-[0.72rem] font-medium uppercase tracking-[0.18em] transition ${
                      active ? "text-cloud" : "text-lilac/65 hover:text-cloud"
                    }`}
                  >
                    {n.label}
                    {active && <span className="absolute inset-x-3.5 -bottom-0.5 h-px bg-soft" />}
                  </Link>
                </li>
              );
            })}
            <li className="ml-2">
              <Link
                href={campaignNav.href}
                title={campaignNav.label}
                data-testid="nav-campaign"
                aria-current={isActive(pathname, campaignNav.href) ? "page" : undefined}
                className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.16em] transition ${
                  isActive(pathname, campaignNav.href)
                    ? "border-cloud bg-cloud text-night"
                    : "border-soft/50 bg-soft/10 text-cloud hover:bg-soft/25"
                }`}
              >
                <span aria-hidden>#1</span> {campaignNav.shortLabel}
              </Link>
            </li>
          </ul>
        </nav>

        <button
          type="button"
          className="relative grid size-10 place-items-center rounded-full border border-lilac/20 xl:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Đóng menu" : "Mở menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`absolute h-px w-4 bg-cloud transition ${open ? "rotate-45" : "-translate-y-1"}`} />
          <span className={`absolute h-px w-4 bg-cloud transition ${open ? "-rotate-45" : "translate-y-1"}`} />
        </button>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Điều hướng di động"
        hidden={!open}
        className="border-t border-lilac/10 px-5 pb-8 pt-4 xl:hidden"
      >
        <ul className="space-y-1">
          {navItems.map((n) => (
            <li key={n.href}>
              <Link
                href={n.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(pathname, n.href) ? "page" : undefined}
                className="block rounded-xl px-3 py-3 font-serif text-2xl text-lilac/85 transition hover:bg-white/5 hover:text-cloud aria-[current=page]:text-cloud"
              >
                {n.label}
              </Link>
            </li>
          ))}
          <li className="pt-2">
            <Link
              href={campaignNav.href}
              onClick={() => setOpen(false)}
              data-testid="nav-campaign-mobile"
              aria-current={isActive(pathname, campaignNav.href) ? "page" : undefined}
              className="block rounded-2xl border border-soft/50 bg-soft/10 px-4 py-4 font-serif text-xl leading-snug text-cloud transition hover:bg-soft/20"
            >
              <span aria-hidden className="mr-2 text-soft">#1</span>
              {campaignNav.shortLabel}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
