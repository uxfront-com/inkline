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

  it("passes its id, accessible name and description to the native button", async () => {
    const view = await mount(ButtonCase, { props: { attributes: true } });
    await view.expectParity("attributes");
    await expect.element(view.locator).toHaveAriaTree(`
      - button "Save"
      - button "Close"
      - paragraph: Saves the draft.
    `);
    await expect.element(view.locator).toHaveNoAxeViolations();
    const save = view.getByRole("button", { name: "Save" });
    await expect.element(save).toHaveAttribute("id", "save");
    await expect.element(save).toHaveAttribute("aria-describedby", "save-hint");
    await expect.element(save).toHaveAccessibleDescription("Saves the draft.");
    await expect
      .element(view.getByRole("button", { name: "Close" }))
      .toHaveAttribute("aria-label", "Close");
  });

  it(
    "emits click once for each click and each Enter",
    { requires: ["interactivity"] },
    async () => {
      const view = await mount(ButtonCase, { props: { attributes: true } });
      await view.expectParity("attributes-2");
      await view.user.click(view.getByRole("button", { name: "Save" }));
      await view.expectParity("clicked");
      await view.user.keyboard("{Enter}");
      await view.expectParity("entered");
      await view.user.click(view.getByRole("button", { name: "Close" }));
      await view.expectParity("closed");
      expect(view.emitted("click")).toEqual([["save"], ["save"], ["close"]]);
    },
  );
});
