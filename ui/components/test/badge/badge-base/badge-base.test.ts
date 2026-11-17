import { describeTargets, it, mountScenario } from "@unframework.dev/testing";
import { expect } from "vitest";

import BadgeBaseCase from "./BadgeBaseCase.uf.tsx";

describeTargets("badge/badge-base", () => {
  it("shows its label, and its slot over the label", async () => {
    const view = await mountScenario(BadgeBaseCase, "default");
    await view.expectParity("default");
    await expect.element(view.locator).toHaveAriaTree(`
      - text: From the prop From the slot
    `);
    await expect.element(view.locator).toHaveNoAxeViolations();
    await expect.element(view.getByText("Overridden")).not.toBeInTheDocument();
  });
});
