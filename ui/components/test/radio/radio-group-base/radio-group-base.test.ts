import { describeTargets, it, mountScenario } from "@unframework.dev/testing";
import { expect } from "vitest";

import RadioGroupBaseCase from "./RadioGroupBaseCase.uf.tsx";

describeTargets("radio/radio-group-base", () => {
  it("groups its radios under its label", async () => {
    const view = await mountScenario(RadioGroupBaseCase, "default");
    await view.expectParity("default");
    await expect.element(view.locator).toHaveAriaTree(`
      - radiogroup "Fruit":
        - radio "Apple"
        - text: Apple
        - radio "Pear"
        - text: Pear
    `);
    await expect.element(view.locator).toHaveNoAxeViolations();
    await expect.element(view.getByRole("radiogroup")).not.toHaveAttribute("aria-readonly");
  });

  it("marks a read-only group", async () => {
    const view = await mountScenario(RadioGroupBaseCase, "readonly");
    await view.expectParity("readonly");
    await expect
      .element(view.getByRole("radiogroup", { name: "Fruit" }))
      .toHaveAttribute("aria-readonly", "true");
  });
});
