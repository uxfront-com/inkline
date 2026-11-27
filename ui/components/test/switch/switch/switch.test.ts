import { describeTargets, it, mountScenario } from "@unframework.dev/testing";
import { expect } from "vitest";

import SwitchCase from "./SwitchCase.uf.tsx";

describeTargets("switch/switch", () => {
	it("renders the control with its name and state", async () => {
		const view = await mountScenario(SwitchCase, "unchecked");
		await view.expectParity("unchecked");
		await expect.element(view.getByRole("switch", { name: "Accept" })).not.toBeChecked();
		await expect.element(view.getByRole("status")).toHaveTextContent("off");
		await expect.element(view.locator).toHaveNoAxeViolations();
	});

	it("renders the bound model's value", async () => {
		const view = await mountScenario(SwitchCase, "checked");
		await view.expectParity("checked");
		await expect.element(view.getByRole("switch", { name: "Accept" })).toBeChecked();
		await expect.element(view.getByRole("status")).toHaveTextContent("on");
	});

	it(
		"follows its parent's change of the model and writes nothing back",
		{ requires: ["interactivity"] },
		async () => {
			const view = await mountScenario(SwitchCase, "parent");
			await view.expectParity("parent");
			const control = view.getByRole("switch", { name: "Accept" });
			await view.user.click(view.getByRole("button", { name: "Select all" }));
			await view.expectParity("parent-checked");
			await expect.element(control).toBeChecked();
			await expect.element(view.getByRole("status")).toHaveTextContent("on");
			await view.user.click(view.getByRole("button", { name: "Select all" }));
			await view.expectParity("parent-unchecked");
			await expect.element(control).not.toBeChecked();
			await expect.element(view.getByRole("status")).toHaveTextContent("off");
			// Only the parent's own two changes. A write back of the same value is invisible here, since
			// the parent's setter ignores it: `ui/react` and `ui/solid` test the change callback itself.
			expect(view.emitted("change")).toEqual([[true], [false]]);
		},
	);

	it("writes the model on a click and on Space", { requires: ["interactivity"] }, async () => {
		const view = await mountScenario(SwitchCase, "unchecked");
		await view.expectParity("unchecked-2");
		const control = view.getByRole("switch", { name: "Accept" });
		await view.user.click(control);
		await view.expectParity("clicked");
		await expect.element(control).toBeChecked();
		await expect.element(view.getByRole("status")).toHaveTextContent("on");
		await view.user.keyboard(" ");
		await view.expectParity("spaced");
		await expect.element(control).not.toBeChecked();
		expect(view.emitted("change")).toEqual([[true], [false]]);
	});

	it("writes the model on Enter", { requires: ["interactivity"] }, async () => {
		const view = await mountScenario(SwitchCase, "unchecked");
		await view.expectParity("unchecked-3");
		await view.user.focus(view.getByRole("switch", { name: "Accept" }));
		await view.expectParity("focused");
		await view.user.keyboard("{Enter}");
		await view.expectParity("entered");
		await expect.element(view.getByRole("switch", { name: "Accept" })).toBeChecked();
		expect(view.emitted("change")).toEqual([[true]]);
	});

	it(
		"marks a read-only control and keeps its value on a click, on Space and on Enter",
		{ requires: ["interactivity"] },
		async () => {
			const view = await mountScenario(SwitchCase, "readonly");
			await view.expectParity("readonly");
			const control = view.getByRole("switch", { name: "Accept" });
			await expect.element(control).toHaveAttribute("aria-readonly", "true");
			await expect.element(control).toBeChecked();
			await view.user.click(control);
			await view.expectParity("readonly-clicked");
			await expect.element(control).toBeChecked();
			await view.user.keyboard(" ");
			await view.expectParity("readonly-spaced");
			await view.user.keyboard("{Enter}");
			await view.expectParity("readonly-entered");
			await expect.element(control).toBeChecked();
			await expect.element(view.getByRole("status")).toHaveTextContent("on");
			expect(view.emitted("change")).toEqual([]);
		},
	);

	it("disables the control", async () => {
		const view = await mountScenario(SwitchCase, "disabled");
		await view.expectParity("disabled");
		await expect.element(view.getByRole("switch", { name: "Accept" })).toBeDisabled();
	});

	it("labels a switch with its slot over its label", async () => {
		const view = await mountScenario(SwitchCase, "unchecked");
		await view.expectParity("unchecked-4");
		await expect.element(view.getByRole("switch", { name: "From the slot" })).toBeInTheDocument();
		await expect.element(view.getByText("Overridden")).not.toBeInTheDocument();
	});

	it("passes its accessible name and description to the native control", async () => {
		const view = await mountScenario(SwitchCase, "attributes");
		await view.expectParity("attributes");
		await expect.element(view.locator).toHaveNoAxeViolations();
		const control = view.getByRole("switch", { name: "Wi-Fi" });
		await expect.element(control).toHaveAttribute("aria-label", "Wi-Fi");
		await expect.element(control).toHaveAttribute("aria-describedby", "wifi-hint");
		await expect.element(control).toHaveAccessibleDescription("Joins known networks.");
	});
});
