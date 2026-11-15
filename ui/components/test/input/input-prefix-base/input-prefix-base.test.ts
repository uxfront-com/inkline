import { describeTargets, it, mountScenario } from "@unframework.dev/testing";
import { expect } from "vitest";

import InputAffixPrefixCase from "./InputAffixPrefixCase.uf.tsx";

describeTargets("input/input-prefix-base", () => {
  it("renders its text inline", async () => {
    const view = await mountScenario(InputAffixPrefixCase, "default");
    await view.expectParity("default");
    await expect.element(view.locator).toHaveAriaTree(`
      - text: $
    `);
    await expect.element(view.locator).toHaveNoAxeViolations();
    expect(view.getByText("$").element().tagName).toBe("SPAN");
  });
});
