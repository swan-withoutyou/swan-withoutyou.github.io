/** Shared CTA class strings, matching components/ui/Button.tsx. */
const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-wide transition duration-500 ease-cine hover:-translate-y-0.5";
export const cta = {
  primary: `${base} bg-cloud text-night hover:bg-lilac shadow-[0_10px_40px_-10px_rgb(169_155_239/0.7)] hover:shadow-[0_14px_50px_-8px_rgb(169_155_239/0.9)]`,
  ghost: `${base} border border-lilac/30 text-cloud hover:border-lilac/70 hover:bg-white/5`,
  glow: `${base} bg-gradient-to-r from-lavender via-soft to-lilac text-night font-semibold shadow-[0_14px_50px_-10px_rgb(169_155_239/0.95)] hover:brightness-110`,
} as const;
