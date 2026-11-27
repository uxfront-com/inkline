import { describeTargets, it, mountScenario } from "@unframework.dev/testing";
import { expect } from "vitest";

import RadioBaseCase from "./RadioBaseCase.uf.tsx";

describeTargets("radio/radio-base", () => {
	it("names the radio it wraps", async () => {
		const view = await mountScenario(RadioBaseCase, "default");
		await view.expectParity("default");
		await expect.element(view.locator).toHaveAriaTree(`
      - radio "Apple"
      - text: Apple
    `);
		await expect.element(view.locator).toHaveNoAxeViolations();
		expect(view.container.querySelector("#apple-row input")).not.toBeNull();
	});
});
