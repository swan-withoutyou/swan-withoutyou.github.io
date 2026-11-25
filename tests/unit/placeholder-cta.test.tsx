import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { PlaceholderLinkButton } from "@/components/ui/PlaceholderLinkButton";
import { CampaignFAQ, FAQ_ITEMS } from "@/components/itunes/CampaignFAQ";

afterEach(cleanup);

describe("PlaceholderLinkButton", () => {
  it("shows a notice and prevents navigation when the URL is '#'", () => {
    render(<PlaceholderLinkButton href="#" className="" placeholderMessage="Sắp có" testId="x">MUA</PlaceholderLinkButton>);
    const a = screen.getByTestId("x");
    const notPrevented = fireEvent.click(a);
    expect(notPrevented).toBe(false); // default navigation prevented
    expect(screen.getByTestId("x-notice").textContent).toBe("Sắp có");
  });

  it("becomes a normal external link once a real URL is configured", () => {
    render(<PlaceholderLinkButton href="https://music.apple.com/vn/x" className="" placeholderMessage="Sắp có" testId="y">MUA</PlaceholderLinkButton>);
    const a = screen.getByTestId("y");
    expect(a.getAttribute("href")).toBe("https://music.apple.com/vn/x");
    expect(a.getAttribute("target")).toBe("_blank");
    expect(a.getAttribute("rel")).toBe("noopener noreferrer");
    fireEvent.click(a);
    expect(screen.queryByTestId("y-notice")).toBeNull();
  });
});

describe("CampaignFAQ", () => {
  it("renders all 7 questions as accordion items", () => {
    render(<CampaignFAQ />);
    expect(FAQ_ITEMS).toHaveLength(7);
    expect(document.querySelectorAll("details")).toHaveLength(7);
    expect(screen.getByText("Tôi có thể xem hướng dẫn Mass Buy ở đâu?")).toBeTruthy();
  });
});
