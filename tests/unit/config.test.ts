import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { socialLinks } from "@/config/social-links";
import { fansites } from "@/data/fansites";
import { thieuNang, featuredVideo } from "@/data/music";
import { fansiteSchema } from "@/lib/validation/schemas";

describe("official links & assets", () => {
  it("keeps the teaser and the other YouTube destination separate", () => {
    expect(socialLinks.thieuNangTeaser.url).toBe("https://www.youtube.com/watch?v=B8cb4a-iNco");
    expect(socialLinks.youtubeSupplied.url).toBe("https://youtu.be/XlhmFJ1ZqxU?si=Kzo0QPp2t39GBmNA");
    expect(thieuNang.teaser?.youtubeId).not.toBe(thieuNang.otherVideos[0].youtubeId);
  });

  it("features the verified official MV and keeps the teaser separate", () => {
  expect(thieuNang.officialMv?.youtubeId).toBe("uTrRuWajO68");
  expect(thieuNang.officialMv?.role).toBe("official_mv");
  expect(featuredVideo()?.youtubeId).toBe("uTrRuWajO68");
  expect(thieuNang.teaser?.youtubeId).toBe("B8cb4a-iNco");
});

  it("has two valid fansites with no fabricated Messenger invite URLs", () => {
    expect(fansites).toHaveLength(2);
    for (const f of fansites) {
      expect(fansiteSchema.safeParse(f).success).toBe(true);
      expect(f.messengerInviteUrl).toBeNull();
    }
  });

  it("preserves the original QR image files byte-for-byte", () => {
    const md5 = (p: string) => createHash("md5").update(readFileSync(`public${p}`)).digest("hex");
    expect(md5(fansites[0].qrImage!)).toBe("3fed43ff333c4e6e542fc9e628a5113c");
    expect(md5(fansites[1].qrImage!)).toBe("084682e726acc6fe0607d3dbcf2f8143");
  });
});
