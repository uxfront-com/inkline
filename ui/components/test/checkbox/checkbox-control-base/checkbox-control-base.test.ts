import { describeTargets, it, mountScenario } from "@unframework.dev/testing";
import { expect } from "vitest";

import CheckboxControlCase from "./CheckboxControlCase.uf.tsx";

describeTargets("checkbox/checkbox-control-base", () => {
  it("renders the control with its name and state", async () => {
    const view = await mountScenario(CheckboxControlCase, "unchecked");
    await view.expectParity("unchecked");
    await expect.element(view.getByRole("checkbox", { name: "Accept" })).not.toBeChecked();
    await expect.element(view.getByRole("status")).toHaveTextContent("off");
    await expect.element(view.locator).toHaveNoAxeViolations();
  });

  it("renders the bound model's value", async () => {
    const view = await mountScenario(CheckboxControlCase, "checked");
    await view.expectParity("checked");
    await expect.element(view.getByRole("checkbox", { name: "Accept" })).toBeChecked();
    await expect.element(view.getByRole("status")).toHaveTextContent("on");
  });

  it("writes the model on a click and on Space", { requires: ["interactivity"] }, async () => {
    const view = await mountScenario(CheckboxControlCase, "unchecked");
    await view.expectParity("unchecked-2");
    const control = view.getByRole("checkbox", { name: "Accept" });
    await view.user.click(control);
    await view.expectParity("clicked");
    await expect.element(control).toBeChecked();
    await expect.element(view.getByRole("status")).toHaveTextContent("on");
    await view.user.keyboard(" ");
    await view.expectParity("spaced");
    await expect.element(control).not.toBeChecked();
    expect(view.emitted("change")).toEqual([[true], [false]]);
  });

  it(
    "marks a read-only control and keeps its value on a click and on Space",
    { requires: ["interactivity"] },
    async () => {
      const view = await mountScenario(CheckboxControlCase, "readonly");
      await view.expectParity("readonly");
      const control = view.getByRole("checkbox", { name: "Accept" });
      await expect.element(control).toHaveAttribute("aria-readonly", "true");
      await expect.element(control).toBeChecked();
      await view.user.click(control);
      await view.expectParity("readonly-clicked");
      await expect.element(control).toBeChecked();
      await view.user.keyboard(" ");
      await view.expectParity("readonly-spaced");
      await expect.element(control).toBeChecked();
      await expect.element(view.getByRole("status")).toHaveTextContent("on");
      expect(view.emitted("change")).toEqual([]);
    },
  );

  it("disables the control", async () => {
    const view = await mountScenario(CheckboxControlCase, "disabled");
    await view.expectParity("disabled");
    await expect.element(view.getByRole("checkbox", { name: "Accept" })).toBeDisabled();
  });

  it("shows the mixed state", { requires: ["interactivity"] }, async () => {
    const view = await mountScenario(CheckboxControlCase, "indeterminate");
    await view.expectParity("indeterminate");
    const control = view.getByRole("checkbox", { name: "Accept" });
    expect((control.element() as HTMLInputElement).indeterminate).toBe(true);
    await expect.element(control).toBePartiallyChecked();
  });

  it("passes its id, name and required state to the native box", async () => {
    const view = await mountScenario(CheckboxControlCase, "disabled");
    await view.expectParity("disabled-2");
    const control = view.getByRole("checkbox", { name: "Accept" });
    await expect.element(control).toHaveAttribute("id", "terms");
    await expect.element(control).toHaveAttribute("name", "terms");
    await expect.element(control).toBeRequired();
  });
});
