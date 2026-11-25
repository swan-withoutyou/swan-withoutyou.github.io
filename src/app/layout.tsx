import type { Metadata, Viewport } from "next";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/cormorant-garamond/400-italic.css";
import "@fontsource/be-vietnam-pro/300.css";
import "@fontsource/be-vietnam-pro/400.css";
import "@fontsource/be-vietnam-pro/500.css";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Atmosphere } from "@/components/ui/Atmosphere";
import { Analytics } from "@/components/layout/Analytics";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: "SWAN — Thiếu Nàng | Trải nghiệm âm nhạc chính thức", template: "%s | SWAN — Thiếu Nàng" },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = { themeColor: "#17152F", colorScheme: "dark" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className="grain">
        <Atmosphere />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
