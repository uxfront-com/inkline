import { describeTargets, it, mount } from "@unframework.dev/testing";
import { expect } from "vitest";

import BadgeCase from "./BadgeCase.uf.tsx";

describeTargets("badge/badge", () => {
	it("shows its label, and its slot over the label", async () => {
		const view = await mount(BadgeCase);
		await view.expectParity("default");
		await expect.element(view.locator).toHaveAriaTree(`
      - text: From the prop From the slot
    `);
		await expect.element(view.locator).toHaveNoAxeViolations();
		await expect.element(view.getByText("Overridden")).not.toBeInTheDocument();
	});

	it("styles the headless root with the recipe", async () => {
		const plain = await mount(BadgeCase);
		await plain.expectParity("default-2");
		const base = plain.getByText("From the prop").element().className;
		await plain.unmount();
		const view = await mount(BadgeCase, {
			props: { color: "error", variant: "outline", size: "xl" },
		});
		await view.expectParity("styled");
		const badge = view.getByText("From the prop");
		expect(badge.element().className).not.toBe(base);
	});
});
