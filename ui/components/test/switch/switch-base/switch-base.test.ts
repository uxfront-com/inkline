import { describeTargets, it, mountScenario } from "@unframework.dev/testing";
import { expect } from "vitest";

import SwitchBaseCase from "./SwitchBaseCase.uf.tsx";

describeTargets("switch/switch-base", () => {
  it("names the control it wraps", async () => {
    const view = await mountScenario(SwitchBaseCase, "default");
    await view.expectParity("default");
    await expect.element(view.locator).toHaveAriaTree(`
      - switch "Wi-Fi"
      - text: Wi-Fi
    `);
    await expect.element(view.locator).toHaveNoAxeViolations();
  });
});
