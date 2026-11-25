import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { LyricsViewer } from "@/components/lyrics/LyricsViewer";
import { allUnavailableReasons, getPublicLyrics } from "@/lib/lyrics";
import { fixtureLyrics } from "./fixtures";
import { thieuNangLyrics } from "@/data/lyrics";

afterEach(() => {
  cleanup();
  localStorage.clear();
});

function setup(l = fixtureLyrics()) {
  render(<LyricsViewer lyrics={getPublicLyrics(l)} reasons={allUnavailableReasons(l)} allowCopy={l.allowCopy} />);
}

describe("LyricsViewer language switching", () => {
  it("renders Vietnamese first and switches to English and Chinese without reload", () => {
    setup();
    const body = () => screen.getByTestId("lyrics-body");
    expect(body().dataset.lang).toBe("vi");
    expect(within(body()).getByText("VI line A")).toBeTruthy();

    fireEvent.click(screen.getByRole("radio", { name: "English" }));
    expect(body().dataset.lang).toBe("en");
    expect(body().getAttribute("lang")).toBe("en");
    expect(within(body()).getByText("EN line A")).toBeTruthy();
    expect(screen.getByRole("radio", { name: "English" }).getAttribute("aria-checked")).toBe("true");

    fireEvent.click(screen.getByRole("radio", { name: "中文" }));
    expect(body().getAttribute("lang")).toBe("zh-CN");
    expect(within(body()).getByText("ZH line A")).toBeTruthy();
  });

  it("keeps identical line ids and section order after switching", () => {
    setup();
    const ids = () => Array.from(document.querySelectorAll("[data-line-id]")).map((e) => e.getAttribute("data-line-id"));
    const sections = () => Array.from(document.querySelectorAll("[data-section-id]")).map((e) => e.getAttribute("data-section-id"));
    const vi = [ids(), sections()];
    fireEvent.click(screen.getByRole("radio", { name: "English" }));
    expect([ids(), sections()]).toEqual(vi);
    fireEvent.click(screen.getByRole("radio", { name: "中文" }));
    expect([ids(), sections()]).toEqual(vi);
  });

  it("supports arrow-key navigation between languages", () => {
    setup();
    fireEvent.keyDown(screen.getByRole("radio", { name: "Tiếng Việt" }), { key: "ArrowRight" });
    expect(screen.getByTestId("lyrics-body").dataset.lang).toBe("en");
  });

  it("shows a clear unavailable state for a missing translation while the selector keeps working", () => {
    const l = fixtureLyrics();
    l.languages.en = { ...l.languages.en, translationStatus: "draft" };
    setup(l);
    fireEvent.click(screen.getByRole("radio", { name: "English" }));
    expect(screen.getByTestId("lyrics-unavailable").dataset.reason).toBe("not_approved");
    fireEvent.click(screen.getByRole("radio", { name: "中文" }));
    expect(screen.queryByTestId("lyrics-unavailable")).toBeNull();
  });

  it("renders the published lyrics and keeps the same lines when switching language", () => {
    render(<LyricsViewer lyrics={getPublicLyrics(thieuNangLyrics)} reasons={allUnavailableReasons(thieuNangLyrics)} allowCopy={false} />);
    expect(screen.queryByTestId("lyrics-unavailable")).toBeNull();
    const ids = () => Array.from(document.querySelectorAll("[data-line-id]")).map((e) => e.getAttribute("data-line-id"));
    const vi = ids();
    expect(vi).toHaveLength(40);
    fireEvent.click(screen.getByRole("radio", { name: "English" }));
    expect(ids()).toEqual(vi);
    fireEvent.click(screen.getByRole("radio", { name: "中文" }));
    expect(ids()).toEqual(vi);
  });
});
