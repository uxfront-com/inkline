import { describeTargets, it, mountScenario } from "@unframework.dev/testing";
import { expect } from "vitest";

import HamburgerMenuCase from "./HamburgerMenuCase.uf.tsx";

describeTargets("hamburger-menu/hamburger-menu", () => {
  it("renders a closed toggle with its default name", async () => {
    const view = await mountScenario(HamburgerMenuCase, "closed");
    await view.expectParity("closed");
    await expect.element(view.locator).toHaveAriaTree(`
      - button "Toggle menu"
    `);
    await expect.element(view.locator).toHaveNoAxeViolations();
    const toggle = view.getByRole("button", { name: "Toggle menu" });
    await expect.element(toggle).toHaveAttribute("aria-controls", "menu");
    await expect.element(toggle).toHaveAttribute("type", "button");
  });

  it("renders the bound model's value and its own name", async () => {
    const view = await mountScenario(HamburgerMenuCase, "open");
    await view.expectParity("open");
    await expect
      .element(view.getByRole("button", { name: "Close navigation" }))
      .toHaveAttribute("aria-expanded", "true");
    await expect.element(view.getByRole("navigation", { name: "Main" })).toBeVisible();
  });

  it("toggles the model on a click, Enter and Space", { requires: ["interactivity"] }, async () => {
    const view = await mountScenario(HamburgerMenuCase, "closed");
    await view.expectParity("closed-2");
    const toggle = view.getByRole("button", { name: "Toggle menu" });
    await view.user.click(toggle);
    await view.expectParity("clicked");
    await expect.element(toggle).toHaveAttribute("aria-expanded", "true");
    await expect.element(view.getByRole("navigation", { name: "Main" })).toBeVisible();
    await view.user.keyboard("{Enter}");
    await view.expectParity("entered");
    await expect.element(toggle).toHaveAttribute("aria-expanded", "false");
    await view.user.keyboard(" ");
    await view.expectParity("spaced");
    await expect.element(toggle).toHaveAttribute("aria-expanded", "true");
    expect(view.emitted("toggle")).toEqual([[true], [false], [true]]);
  });

  it("disables the toggle", { requires: ["interactivity"] }, async () => {
    const view = await mountScenario(HamburgerMenuCase, "disabled");
    await view.expectParity("disabled");
    const toggle = view.getByRole("button", { name: "Toggle menu" });
    await expect.element(toggle).toBeDisabled();
    expect(view.emitted("toggle")).toEqual([]);
  });
});
