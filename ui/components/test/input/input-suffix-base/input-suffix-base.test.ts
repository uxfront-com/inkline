import { describeTargets, it, mountScenario } from "@unframework.dev/testing";
import { expect } from "vitest";

import InputAffixSuffixCase from "./InputAffixSuffixCase.uf.tsx";

describeTargets("input/input-suffix-base", () => {
  it("renders its text inline", async () => {
    const view = await mountScenario(InputAffixSuffixCase, "default");
    await view.expectParity("default");
    await expect.element(view.locator).toHaveAriaTree(`
      - text: USD
    `);
    await expect.element(view.locator).toHaveNoAxeViolations();
    expect(view.getByText("USD").element().tagName).toBe("SPAN");
  });
});
