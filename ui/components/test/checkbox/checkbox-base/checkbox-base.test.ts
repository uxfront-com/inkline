import { describeTargets, it, mountScenario } from "@unframework.dev/testing";
import { expect } from "vitest";

import CheckboxBaseCase from "./CheckboxBaseCase.uf.tsx";

describeTargets("checkbox/checkbox-base", () => {
  it("names the control it wraps", async () => {
    const view = await mountScenario(CheckboxBaseCase, "default");
    await view.expectParity("default");
    await expect.element(view.locator).toHaveAriaTree(`
      - checkbox "Accept the terms"
      - text: Accept the terms
    `);
    await expect.element(view.locator).toHaveNoAxeViolations();
    expect(view.container.querySelector("label input")).not.toBeNull();
  });

  it("toggles the control from a click on its text", { requires: ["interactivity"] }, async () => {
    const view = await mountScenario(CheckboxBaseCase, "default");
    await view.expectParity("default-2");
    await view.user.click(view.getByText("Accept the terms"));
    await view.expectParity("checked");
    await expect.element(view.getByRole("checkbox")).toBeChecked();
  });
});
