import { describeTargets, it, mountScenario } from "@unframework.dev/testing";
import { expect } from "vitest";

import SwitchLabelCase from "./SwitchLabelCase.uf.tsx";

describeTargets("switch/switch-label-base", () => {
	it("renders its text, which names the switch", async () => {
		const view = await mountScenario(SwitchLabelCase, "default");
		await view.expectParity("default");
		await expect.element(view.getByRole("switch", { name: "Dark mode" })).toBeInTheDocument();
		await expect.element(view.getByText("Dark mode")).toHaveClass("switch-label");
		await expect.element(view.locator).toHaveNoAxeViolations();
	});
});
