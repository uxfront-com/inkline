import { describeTargets, it, mountScenario } from "@unframework.dev/testing";
import { expect } from "vitest";

import ButtonBaseCase from "./ButtonBaseCase.uf.tsx";

describeTargets("button/button-base", () => {
  it("renders a native button for each state", async () => {
    const view = await mountScenario(ButtonBaseCase, "default");
    await view.expectParity("default");
    await expect.element(view.locator).toHaveAriaTree(`
      - button "Save"
      - button "Send"
      - button "Off" [disabled]
      - button "Wait" [disabled]
      - button "Slotted"
    `);
    await expect.element(view.locator).toHaveNoAxeViolations();
    await expect
      .element(view.getByRole("button", { name: "Save" }))
      .toHaveAttribute("type", "button");
    await expect
      .element(view.getByRole("button", { name: "Send" }))
      .toHaveAttribute("type", "submit");
  });

  it("marks a loading button busy, disables it and shows its spinner", async () => {
    const view = await mountScenario(ButtonBaseCase, "default");
    await view.expectParity("default-2");
    const loading = view.getByRole("button", { name: "Wait" });
    await expect.element(loading).toHaveAttribute("aria-busy", "true");
    await expect.element(loading).toBeDisabled();
    expect(loading.element().querySelector(".button-spinner")?.getAttribute("aria-hidden")).toBe(
      "true",
    );
    const idle = view.getByRole("button", { name: "Save" });
    await expect.element(idle).toHaveAttribute("aria-busy", "false");
    expect(idle.element().querySelector(".button-spinner")).toBeNull();
  });
});
