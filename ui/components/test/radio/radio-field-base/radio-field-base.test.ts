import { describeTargets, it, mountScenario } from "@unframework.dev/testing";
import { expect } from "vitest";

import RadioFieldCase from "./RadioFieldCase.uf.tsx";

describeTargets("radio/radio-field-base", () => {
  it("checks the radio whose value the model holds", async () => {
    const view = await mountScenario(RadioFieldCase, "default");
    await view.expectParity("default");
    await expect.element(view.getByRole("radio", { name: "Apple" })).toBeChecked();
    await expect.element(view.getByRole("radio", { name: "Pear" })).not.toBeChecked();
    await expect.element(view.getByRole("radio", { name: "Apple" })).toBeRequired();
    await expect.element(view.locator).toHaveNoAxeViolations();
  });

  it("writes the model on a click and an arrow key", { requires: ["interactivity"] }, async () => {
    const view = await mountScenario(RadioFieldCase, "default");
    await view.expectParity("default-2");
    await view.user.click(view.getByRole("radio", { name: "Pear" }));
    await view.expectParity("pear");
    await expect.element(view.getByRole("radio", { name: "Pear" })).toBeChecked();
    await view.user.keyboard("{ArrowUp}");
    await view.expectParity("apple");
    await expect.element(view.getByRole("radio", { name: "Apple" })).toBeChecked();
    await expect.element(view.getByRole("status")).toHaveTextContent("apple");
    expect(view.emitted("select")).toEqual([["pear"], ["apple"]]);
  });

  it("disables the radios", async () => {
    const view = await mountScenario(RadioFieldCase, "disabled");
    await view.expectParity("disabled");
    await expect.element(view.getByRole("radio", { name: "Pear" })).toBeDisabled();
  });
});
