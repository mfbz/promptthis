import { describe, it, expect, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { PromptButton } from "../prompt-button";

afterEach(cleanup);

describe("PromptButton", () => {
  it('renders a button with default label "Prompt"', () => {
    render(<PromptButton content="Test content" />);
    expect(screen.getByText("Prompt")).toBeTruthy();
  });

  it("renders custom label", () => {
    render(<PromptButton content="Test" label="Share" />);
    expect(screen.getByText("Share")).toBeTruthy();
  });

  it("shows popover on click", () => {
    render(<PromptButton content="Test" />);
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByRole("menu")).toBeTruthy();
  });

  it("shows default providers in popover", () => {
    render(<PromptButton content="Test" />);
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByText("Claude")).toBeTruthy();
    expect(screen.getByText("ChatGPT")).toBeTruthy();
  });

  it("filters providers with openIn", () => {
    render(<PromptButton content="Test" openIn={["claude"]} />);
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByText("Claude")).toBeTruthy();
    expect(screen.queryByText("ChatGPT")).toBeNull();
  });

  it("includes Copy prompt option", () => {
    render(<PromptButton content="Test" />);
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByText("Copy prompt")).toBeTruthy();
  });

  it("closes popover on Escape", () => {
    render(<PromptButton content="Test" />);
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByRole("menu")).toBeTruthy();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("menu")).toBeNull();
  });

  it("accepts className for the trigger", () => {
    render(<PromptButton content="Test" className="custom-btn" />);
    const btn = screen.getByRole("button");
    expect(btn.classList.contains("custom-btn")).toBe(true);
  });

  it("accepts popoverClassName", () => {
    render(<PromptButton content="Test" popoverClassName="custom-popover" />);
    fireEvent.click(screen.getByRole("button"));
    const menu = screen.getByRole("menu");
    expect(menu.classList.contains("custom-popover")).toBe(true);
  });
});
