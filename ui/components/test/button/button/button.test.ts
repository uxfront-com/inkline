import { describeTargets, it, mount } from "@unframework.dev/testing";
import { expect } from "vitest";

import ButtonCase from "./ButtonCase.uf.tsx";

describeTargets("button/button", () => {
  it("renders a labelled button, and its slot over the label", async () => {
    const view = await mount(ButtonCase);
    await view.expectParity("default");
    await expect.element(view.locator).toHaveAriaTree(`
      - button "Save"
      - button "Slotted"
    `);
    await expect.element(view.locator).toHaveNoAxeViolations();
    const save = view.getByRole("button", { name: "Save" });
    await expect.element(save).toHaveAttribute("type", "button");
    await expect.element(save).not.toHaveClass("button--block");
  });

  it("passes its type, disabled and loading states to the native button", async () => {
    const view = await mount(ButtonCase, { props: { type: "submit", loading: true } });
    await view.expectParity("loading");
    const save = view.getByRole("button", { name: "Save" });
    await expect.element(save).toHaveAttribute("type", "submit");
    await expect.element(save).toHaveAttribute("aria-busy", "true");
    await expect.element(save).toBeDisabled();
    await view.unmount();
    const disabled = await mount(ButtonCase, { props: { disabled: true } });
    await disabled.expectParity("disabled");
    const off = disabled.getByRole("button", { name: "Save" });
    await expect.element(off).toHaveAttribute("aria-busy", "false");
    await expect.element(off).toBeDisabled();
  });

  it("styles the button with the recipe, and stretches it when block", async () => {
    const plain = await mount(ButtonCase);
    await plain.expectParity("default-2");
    const base = plain.getByRole("button", { name: "Save" }).element().className;
    await plain.unmount();
    const view = await mount(ButtonCase, {
      props: { color: "primary", variant: "outline", size: "lg", block: true },
    });
    await view.expectParity("styled");
    const save = view.getByRole("button", { name: "Save" });
    await expect.element(save).toHaveClass("button", "button--block");
    expect(save.element().className).not.toBe(base);
  });
});
