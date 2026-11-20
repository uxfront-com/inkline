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

  it("renders no data attributes or state until they're set", async () => {
    const view = await mountScenario(ButtonBaseCase, "default");
    await view.expectParity("default-2");
    const save = view.getByRole("button", { name: "Save" });
    for (const name of [
      "data-variant",
      "data-color",
      "data-size",
      "data-icon-only",
      "data-loading",
      "aria-disabled",
      "aria-pressed",
      "aria-expanded",
      "aria-busy",
    ]) {
      await expect.element(save).not.toHaveAttribute(name);
    }
    expect(save.element().querySelector('[data-slot="label"]')?.textContent).toBe("Save");
    expect(save.element().querySelector('[data-slot="spinner"]')).toBeNull();
  });

  it(
    "keeps a loading button focusable, marks it and shows its spinner last",
    { requires: ["interactivity"] },
    async () => {
      const view = await mountScenario(ButtonBaseCase, "loading");
      await view.expectParity("loading");
      const loading = view.getByRole("button", { name: "Wait" });
      await expect.element(loading).toHaveAttribute("aria-disabled", "true");
      await expect.element(loading).toHaveAttribute("data-loading", "");
      await expect.element(loading).not.toHaveAttribute("disabled");
      await expect.element(view.locator).toHaveNoAxeViolations();
      const element = loading.element();
      expect([...element.children].map((child) => child.getAttribute("data-slot"))).toEqual([
        "leading",
        "label",
        "trailing",
        "spinner",
      ]);
      for (const part of ["leading", "trailing", "spinner"]) {
        expect(element.querySelector(`[data-slot="${part}"]`)?.getAttribute("aria-hidden")).toBe(
          "true",
        );
      }
    },
  );

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
    "emits click once for each click, each Enter and each Space",
    { requires: ["interactivity"] },
    async () => {
      const view = await mountScenario(ButtonBaseCase, "attributes");
      await view.expectParity("attributes-2");
      await view.user.click(view.getByRole("button", { name: "Save" }));
      await view.expectParity("clicked");
      await view.user.keyboard("{Enter}");
      await view.expectParity("entered");
      await view.user.keyboard("{Space}");
      await view.expectParity("spaced");
      await view.user.click(view.getByRole("button", { name: "Close" }));
      await view.expectParity("closed");
      expect(view.emitted("click")).toEqual([["save"], ["save"], ["save"], ["close"]]);
    },
  );
});
