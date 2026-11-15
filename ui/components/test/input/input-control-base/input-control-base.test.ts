import { describeTargets, it, mountScenario } from "@unframework.dev/testing";
import { expect } from "vitest";

import InputControlCase from "./InputControlCase.uf.tsx";

describeTargets("input/input-control-base", () => {
  it("renders the bound model's value", async () => {
    const view = await mountScenario(InputControlCase, "filled");
    await view.expectParity("filled");
    await expect.element(view.getByRole("textbox", { name: "Name" })).toHaveValue("Ada");
    await expect.element(view.getByRole("status")).toHaveTextContent("Ada");
    await expect.element(view.locator).toHaveNoAxeViolations();
  });

  it("writes the model as a person types", { requires: ["interactivity"] }, async () => {
    const view = await mountScenario(InputControlCase, "empty");
    await view.expectParity("empty");
    await view.user.fill(view.getByRole("textbox", { name: "Name" }), "Grace");
    await view.expectParity("typed");
    await expect.element(view.getByRole("status")).toHaveTextContent("Grace");
    expect(view.emitted("input").at(-1)).toEqual(["Grace"]);
  });

  it("keeps a read-only value as a person types", { requires: ["interactivity"] }, async () => {
    const view = await mountScenario(InputControlCase, "readonly");
    await view.expectParity("readonly");
    const control = view.getByRole("textbox", { name: "Name" });
    await expect.element(control).toHaveAttribute("readonly");
    await view.user.type(control, "x");
    await view.expectParity("readonly-typed");
    await expect.element(control).toHaveValue("Ada");
    expect(view.emitted("input")).toEqual([]);
  });

  it("disables the control", async () => {
    const view = await mountScenario(InputControlCase, "disabled");
    await view.expectParity("disabled");
    await expect.element(view.getByRole("textbox", { name: "Name" })).toBeDisabled();
  });

  it("passes its type, id, name and placeholder to the native input", async () => {
    const view = await mountScenario(InputControlCase, "empty");
    await view.expectParity("empty-2");
    const control = view.getByRole("textbox", { name: "Name" });
    await expect.element(control).toHaveAttribute("type", "text");
    await expect.element(control).toHaveAttribute("id", "name");
    await expect.element(control).toHaveAttribute("name", "name");
    await expect.element(control).toHaveAttribute("placeholder", "Your name");
    await expect.element(view.getByPlaceholder("Email")).toHaveAttribute("type", "email");
  });
});
