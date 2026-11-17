import { describeTargets, it, mountScenario } from "@unframework.dev/testing";
import { expect } from "vitest";

import InputBaseCase from "./InputBaseCase.uf.tsx";

describeTargets("input/input-base", () => {
  it("holds its control under its id", async () => {
    const view = await mountScenario(InputBaseCase, "default");
    await view.expectParity("default");
    await expect.element(view.locator).toHaveAriaTree(`
      - textbox "Amount"
    `);
    await expect.element(view.locator).toHaveNoAxeViolations();
    expect(view.container.querySelector("#amount input")).not.toBeNull();
  });
});
