import App from "@src/App";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const genaiMocks = vi.hoisted(() => ({
  generateContent: vi.fn(),
}));

vi.mock("@google/genai", () => ({
  GoogleGenAI: vi.fn(function GoogleGenAIMock(this: unknown) {
    return {
      models: {
        generateContent: genaiMocks.generateContent,
      },
    };
  }),
}));

describe("App smoke tests", () => {
  beforeEach(() => {
    window.location.hash = "#/";
    genaiMocks.generateContent.mockReset();
    genaiMocks.generateContent.mockResolvedValue({
      text: "Package 2 costs $120.",
    });
  });

  it("renders the app shell by default", () => {
    render(<App />);

    expect(
      screen.getByRole("button", { name: "Open menu" }),
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("button", { name: "Plans" })[0],
    ).toBeInTheDocument();
  });

  it("switches to Plans when Plans nav is clicked", () => {
    render(<App />);

    fireEvent.click(screen.getAllByRole("button", { name: "Plans" })[0]);

    expect(window.location.hash).toBe("#/plans");
  });

  it("switches back to Home when Home nav is clicked", () => {
    render(<App />);

    fireEvent.click(screen.getAllByRole("button", { name: "Plans" })[0]);
    fireEvent.click(screen.getAllByRole("button", { name: "Home" })[0]);

    expect(window.location.hash).toBe("#/");
  });

  it("opens Contact from the side menu", async () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    fireEvent.click(screen.getByRole("button", { name: "Contact" }));

    expect(window.location.hash).toBe("#/contact");
    expect(
      await screen.findByRole("heading", { name: "Contact" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Get in Touch")).toBeInTheDocument();
  });

  it("opens and closes the chat assistant", () => {
    render(<App />);

    fireEvent.click(
      screen.getByRole("button", { name: "Open chat assistant" }),
    );

    expect(
      screen.getByRole("dialog", { name: "Gemini chat assistant" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Open chat assistant" }),
    ).not.toBeInTheDocument();

    fireEvent.click(
      screen.getByRole("button", { name: "Close chat assistant" }),
    );

    expect(
      screen.getByRole("button", { name: "Open chat assistant" }),
    ).toBeInTheDocument();
  });

  it("submits a plans question and clears the history", async () => {
    window.location.hash = "#/plans";
    const randomSpy = vi.spyOn(Math, "random").mockReturnValue(0);

    render(<App />);

    fireEvent.click(
      screen.getByRole("button", { name: "Open chat assistant" }),
    );

    fireEvent.change(
      screen.getByRole("textbox", { name: "Chat message input" }),
      {
        target: { value: "What does Package 2 cost?" },
      },
    );
    fireEvent.keyDown(
      screen.getByRole("textbox", { name: "Chat message input" }),
      {
        key: "Enter",
        code: "Enter",
        charCode: 13,
      },
    );

    expect(genaiMocks.generateContent).toHaveBeenCalledTimes(1);
    expect(genaiMocks.generateContent.mock.calls[0][0]).toMatchObject({
      model: "gemini-2.5-flash",
    });
    expect(
      String(genaiMocks.generateContent.mock.calls[0][0].contents),
    ).toContain("Package 2: The Collaborator Accelerator");
    expect(
      String(genaiMocks.generateContent.mock.calls[0][0].contents),
    ).toContain("What can I help with today?");

    expect(
      await screen.findByText("Package 2 costs $120."),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Clear chat history" }));

    expect(screen.queryByText("Package 2 costs $120.")).not.toBeInTheDocument();
    expect(screen.getByText("What can I help with today?")).toBeInTheDocument();

    randomSpy.mockRestore();
  });
});
