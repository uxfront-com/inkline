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

  it("passes its id, accessible name and description to the native button", async () => {
    const view = await mountScenario(ButtonBaseCase, "attributes");
    await view.expectParity("attributes");
    await expect.element(view.locator).toHaveAriaTree(`
      - button "Save"
      - button "Close"
      - paragraph: Saves the draft.
    `);
    await expect.element(view.locator).toHaveNoAxeViolations();
    const save = view.getByRole("button", { name: "Save" });
    await expect.element(save).toHaveAttribute("id", "save");
    await expect.element(save).toHaveAttribute("aria-describedby", "save-hint");
    await expect.element(save).toHaveAccessibleDescription("Saves the draft.");
    await expect
      .element(view.getByRole("button", { name: "Close" }))
      .toHaveAttribute("aria-label", "Close");
  });

  it(
    "emits click once for each click and each Enter",
    { requires: ["interactivity"] },
    async () => {
      const view = await mountScenario(ButtonBaseCase, "attributes");
      await view.expectParity("attributes-2");
      await view.user.click(view.getByRole("button", { name: "Save" }));
      await view.expectParity("clicked");
      await view.user.keyboard("{Enter}");
      await view.expectParity("entered");
      await view.user.click(view.getByRole("button", { name: "Close" }));
      await view.expectParity("closed");
      expect(view.emitted("click")).toEqual([["save"], ["save"], ["close"]]);
    },
  );
});
