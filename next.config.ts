import type { NextConfig } from "next";

// GitHub Pages serves static files only, so the site is exported as static HTML.
// BASE_PATH lets the same build work on a project page (e.g. /repo-name) if needed.
const basePath = process.env.BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
