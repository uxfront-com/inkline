import { describeTargets, it, mountScenario } from "@unframework.dev/testing";
import { expect } from "vitest";

import InputCase from "./InputCase.uf.tsx";

describeTargets("input/input", () => {
	it("renders the bound model's value", async () => {
		const view = await mountScenario(InputCase, "filled");
		await view.expectParity("filled");
		await expect.element(view.getByRole("textbox", { name: "Name @ .dev" })).toHaveValue("Ada");
		await expect.element(view.getByRole("status")).toHaveTextContent("Ada");
		await expect.element(view.locator).toHaveNoAxeViolations();
	});

	it("writes the model as a person types", { requires: ["interactivity"] }, async () => {
		const view = await mountScenario(InputCase, "empty");
		await view.expectParity("empty");
		await view.user.fill(view.getByRole("textbox", { name: "Name @ .dev" }), "Grace");
		await view.expectParity("typed");
		await expect.element(view.getByRole("status")).toHaveTextContent("Grace");
		expect(view.emitted("input").at(-1)).toEqual(["Grace"]);
	});

	it("keeps a read-only value as a person types", { requires: ["interactivity"] }, async () => {
		const view = await mountScenario(InputCase, "readonly");
		await view.expectParity("readonly");
		const control = view.getByRole("textbox", { name: "Name @ .dev" });
		await expect.element(control).toHaveAttribute("readonly");
		await view.user.type(control, "x");
		await view.expectParity("readonly-typed");
		await expect.element(control).toHaveValue("Ada");
		expect(view.emitted("input")).toEqual([]);
	});

	it("disables the control", async () => {
		const view = await mountScenario(InputCase, "disabled");
		await view.expectParity("disabled");
		await expect.element(view.getByRole("textbox", { name: "Name @ .dev" })).toBeDisabled();
	});

	it("renders its prefix and suffix around the control, and a textarea for that type", async () => {
		const view = await mountScenario(InputCase, "empty");
		await view.expectParity("empty-2");
		await expect.element(view.getByText("@")).toBeVisible();
		await expect.element(view.getByText(".dev")).toBeVisible();
		expect(view.getByPlaceholder("Bio").element().tagName).toBe("TEXTAREA");
		expect(view.container.querySelectorAll(".input-prefix")).toHaveLength(1);
		expect(view.container.querySelectorAll(".input-suffix")).toHaveLength(1);
	});

	it("passes its required state, autofill hint, accessible name and description to each control", async () => {
		const view = await mountScenario(InputCase, "attributes");
		await view.expectParity("attributes");
		await expect.element(view.locator).toHaveNoAxeViolations();
		for (const [name, autocomplete, hint, description] of [
			["Email", "email", "email-hint", "We never share it."],
			["Bio", "off", "bio-hint", "A line or two."],
		]) {
			const field = view.getByRole("textbox", { name });
			await expect.element(field).toBeRequired();
			await expect.element(field).toHaveAttribute("autocomplete", autocomplete);
			await expect.element(field).toHaveAttribute("aria-label", name);
			await expect.element(field).toHaveAttribute("aria-describedby", hint);
			await expect.element(field).toHaveAccessibleDescription(description);
		}
	});

	it(
		"emits focus and blur once each as a control gains and loses focus",
		{ requires: ["interactivity"] },
		async () => {
			const view = await mountScenario(InputCase, "attributes");
			await view.expectParity("attributes-2");
			await view.user.click(view.getByRole("textbox", { name: "Email" }));
			await view.expectParity("email-focused");
			await view.user.click(view.getByRole("textbox", { name: "Bio" }));
			await view.expectParity("bio-focused");
			await view.user.click(view.getByText("A line or two."));
			await view.expectParity("blurred");
			expect(view.events()).toEqual([
				["focus", "email"],
				["blur", "email"],
				["focus", "bio"],
				["blur", "bio"],
			]);
		},
	);
});
