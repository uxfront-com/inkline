import { describeTargets, it, mountScenario } from "@unframework.dev/testing";
import { expect } from "vitest";

import InputTextareaCase from "./InputTextareaCase.uf.tsx";

describeTargets("input/input-textarea-base", () => {
	it("renders the bound model's value", async () => {
		const view = await mountScenario(InputTextareaCase, "filled");
		await view.expectParity("filled");
		await expect.element(view.getByRole("textbox", { name: "Name" })).toHaveValue("Ada");
		await expect.element(view.getByRole("status")).toHaveTextContent("Ada");
		await expect.element(view.locator).toHaveNoAxeViolations();
	});

	it("writes the model as a person types", { requires: ["interactivity"] }, async () => {
		const view = await mountScenario(InputTextareaCase, "empty");
		await view.expectParity("empty");
		await view.user.fill(view.getByRole("textbox", { name: "Name" }), "Grace");
		await view.expectParity("typed");
		await expect.element(view.getByRole("status")).toHaveTextContent("Grace");
		expect(view.emitted("input").at(-1)).toEqual(["Grace"]);
	});

	it("keeps a read-only value as a person types", { requires: ["interactivity"] }, async () => {
		const view = await mountScenario(InputTextareaCase, "readonly");
		await view.expectParity("readonly");
		const control = view.getByRole("textbox", { name: "Name" });
		await expect.element(control).toHaveAttribute("readonly");
		await view.user.type(control, "x");
		await view.expectParity("readonly-typed");
		await expect.element(control).toHaveValue("Ada");
		expect(view.emitted("input")).toEqual([]);
	});

	it("disables the control", async () => {
		const view = await mountScenario(InputTextareaCase, "disabled");
		await view.expectParity("disabled");
		await expect.element(view.getByRole("textbox", { name: "Name" })).toBeDisabled();
	});

	it("renders a native textarea", async () => {
		const view = await mountScenario(InputTextareaCase, "empty");
		await view.expectParity("empty-2");
		expect(view.getByRole("textbox", { name: "Name" }).element().tagName).toBe("TEXTAREA");
	});

	it("passes its required state, autofill hint, accessible name and description", async () => {
		const view = await mountScenario(InputTextareaCase, "attributes");
		await view.expectParity("attributes");
		await expect.element(view.locator).toHaveNoAxeViolations();
		const field = view.getByRole("textbox", { name: "Bio" });
		await expect.element(field).toBeRequired();
		await expect.element(field).toHaveAttribute("autocomplete", "off");
		await expect.element(field).toHaveAttribute("aria-label", "Bio");
		await expect.element(field).toHaveAttribute("aria-describedby", "bio-hint");
		await expect.element(field).toHaveAccessibleDescription("A line or two.");
	});

	it(
		"emits focus and blur once each as it gains and loses focus",
		{ requires: ["interactivity"] },
		async () => {
			const view = await mountScenario(InputTextareaCase, "attributes");
			await view.expectParity("attributes-2");
			await view.user.click(view.getByRole("textbox", { name: "Bio" }));
			await view.expectParity("focused");
			await view.user.click(view.getByText("A line or two."));
			await view.expectParity("blurred");
			expect(view.events()).toEqual([["focus"], ["blur"]]);
		},
	);
});
