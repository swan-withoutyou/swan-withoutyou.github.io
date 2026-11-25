import { describe, expect, it } from "vitest";
import { fixtureLyrics } from "./fixtures";
import {
  canPublishLyrics, findActiveLineId, getPublicLyrics, isLanguageAvailable, structureSignature,
  unavailableReason, validateLyricsStructure,
} from "@/lib/lyrics";
import { thieuNangLyrics } from "@/data/lyrics";
import { multilingualLyricsSchema } from "@/lib/validation/schemas";

describe("publication gating", () => {
  it("does not publish anything while rights are pending", () => {
    const l = fixtureLyrics({ publicationStatus: "pending_rights" });
    expect(canPublishLyrics(l)).toBe(false);
    expect(getPublicLyrics(l)).toEqual({});
    expect(unavailableReason(l, "vi")).toBe("pending_rights");
  });

  it("requires rightsConfirmed even when status is published", () => {
    expect(canPublishLyrics(fixtureLyrics({ rightsConfirmed: false }))).toBe(false);
  });

  it("hides draft/review translations independently per language", () => {
    const l = fixtureLyrics();
    l.languages.en = { ...l.languages.en, translationStatus: "review" };
    expect(isLanguageAvailable(l, "vi")).toBe(true);
    expect(isLanguageAvailable(l, "en")).toBe(false);
    expect(unavailableReason(l, "en")).toBe("not_approved");
    expect(Object.keys(getPublicLyrics(l))).toEqual(["vi", "zh-CN"]);
  });

  it("treats an approved but empty translation as unavailable", () => {
    const l = fixtureLyrics();
    l.languages["zh-CN"] = { ...l.languages["zh-CN"], sections: [] };
    expect(unavailableReason(l, "zh-CN")).toBe("empty");
  });

  it("ships no lyrics publicly in the current site data", () => {
    expect(getPublicLyrics(thieuNangLyrics)).toEqual({});
    expect(multilingualLyricsSchema.safeParse(thieuNangLyrics).success).toBe(true);
    expect(validateLyricsStructure(thieuNangLyrics)).toEqual([]);
  });
});

describe("structure consistency", () => {
  it("all three languages share identical section + line ids and order", () => {
    const l = fixtureLyrics();
    const vi = structureSignature(l.languages.vi);
    expect(structureSignature(l.languages.en)).toEqual(vi);
    expect(structureSignature(l.languages["zh-CN"])).toEqual(vi);
    expect(validateLyricsStructure(l)).toEqual([]);
  });

  it("flags a translation whose ids or order differ", () => {
    const l = fixtureLyrics();
    l.languages.en = { ...l.languages.en, sections: [...l.languages.en.sections].reverse() };
    expect(validateLyricsStructure(l)).toContain("en structure does not match vi (ids/order differ)");
  });

  it("flags invalid timestamps", () => {
    const l = fixtureLyrics();
    l.languages.vi.sections[0].lines[0] = { id: "verse-1-l1", text: "x", startTime: 5, endTime: 4 };
    expect(validateLyricsStructure(l).some((p) => p.includes("endTime must be after startTime"))).toBe(true);
  });
});

describe("synchronised highlighting", () => {
  const l = fixtureLyrics();
  it("finds the active line by time and falls through to the next start time", () => {
    expect(findActiveLineId(l.languages.vi, 5)).toBeNull();
    expect(findActiveLineId(l.languages.vi, 12)).toBe("verse-1-l1");
    expect(findActiveLineId(l.languages.vi, 20)).toBe("chorus-1-l1");
    expect(findActiveLineId(l.languages.vi, 99)).toBe("chorus-1-l2");
  });
  it("returns the same line id for every language at the same timestamp", () => {
    const ids = (["vi", "en", "zh-CN"] as const).map((k) => findActiveLineId(l.languages[k], 15));
    expect(new Set(ids)).toEqual(new Set(["verse-1-l2"]));
  });
});
