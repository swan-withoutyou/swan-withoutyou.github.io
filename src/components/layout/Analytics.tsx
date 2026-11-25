import Script from "next/script";
import { siteConfig } from "@/config/site";

/** Google Analytics 4 — only loads when NEXT_PUBLIC_GA_MEASUREMENT_ID is set at build time. */
export function Analytics() {
  const id = siteConfig.gaMeasurementId;
  if (!id || !/^G-[A-Z0-9]+$/.test(id)) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script id="ga4" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${id}',{anonymize_ip:true});`}
      </Script>
    </>
  );
}
