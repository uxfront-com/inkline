import { describeTargets, it, mountScenario } from "@unframework.dev/testing";
import { expect } from "vitest";

import FieldGroupCase from "./FieldGroupCase.uf.tsx";

describeTargets("field-group/field-group", () => {
	it("joins its controls side by side", async () => {
		const view = await mountScenario(FieldGroupCase, "horizontal");
		await view.expectParity("horizontal");
		await expect.element(view.locator).toHaveAriaTree(`
      - textbox "Search"
      - button "Search"
    `);
		const group = view.container.querySelector("#search");
		expect(group?.classList.contains("field-group")).toBe(true);
		expect(group?.classList.contains("-horizontal")).toBe(true);
	});

	it("stacks its controls when vertical", async () => {
		const view = await mountScenario(FieldGroupCase, "vertical");
		await view.expectParity("vertical");
		const group = view.container.querySelector("#search");
		expect(group?.classList.contains("-vertical")).toBe(true);
	});
});
