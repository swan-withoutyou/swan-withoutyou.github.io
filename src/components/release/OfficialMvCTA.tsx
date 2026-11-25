import { MUSIC_LINKS, PLACEHOLDER_MESSAGES } from "@/config/campaign";
import { PlaceholderLinkButton } from "@/components/ui/PlaceholderLinkButton";
import { cta } from "@/components/ui/ctaStyles";

/** "XEM MV CHÍNH THỨC" — shows one fixed notice while the URL is "#". No time checks, no timers. */
export function OfficialMvCTA({ variant = "primary" }: { variant?: keyof typeof cta }) {
  return (
    <PlaceholderLinkButton href={MUSIC_LINKS.officialMV} className={cta[variant]} testId="official-mv-cta" placeholderMessage={PLACEHOLDER_MESSAGES.mv}>
      ▶ XEM MV CHÍNH THỨC
    </PlaceholderLinkButton>
  );
}
