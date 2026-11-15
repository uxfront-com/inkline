import { describeTargets, it, mountScenario } from "@unframework.dev/testing";
import { expect } from "vitest";

import RadioGroupCase from "./RadioGroupCase.uf.tsx";

describeTargets("radio/radio-group", () => {
  it("renders a radio for each option, and checks the model's value", async () => {
    const view = await mountScenario(RadioGroupCase, "default");
    await view.expectParity("default");
    await expect.element(view.getByRole("radiogroup", { name: "Fruit" })).toHaveAriaTree(`
      - radiogroup "Fruit":
        - radio "Apple" [checked]
        - text: Apple
        - radio "Pear"
        - text: Pear
        - radio "Plum" [disabled]
        - text: Plum
        - radio "fig"
        - text: fig
    `);
    await expect.element(view.locator).toHaveNoAxeViolations();
  });

  it("writes the model on a click and an arrow key", { requires: ["interactivity"] }, async () => {
    const view = await mountScenario(RadioGroupCase, "default");
    await view.expectParity("default-2");
    await view.user.click(view.getByRole("radio", { name: "Pear" }));
    await view.expectParity("pear");
    await expect.element(view.getByRole("status")).toHaveTextContent("pear");
    await view.user.keyboard("{ArrowRight}");
    await view.expectParity("fig");
    await expect.element(view.getByRole("radio", { name: "fig" })).toBeChecked();
    expect(view.emitted("change")).toEqual([["pear"], ["fig"]]);
  });

  it(
    "keeps a read-only selection on a click, Space and the arrow keys",
    { requires: ["interactivity"] },
    async () => {
      const view = await mountScenario(RadioGroupCase, "readonly");
      await view.expectParity("readonly");
      await expect
        .element(view.getByRole("radiogroup", { name: "Fruit" }))
        .toHaveAttribute("aria-readonly", "true");
      const apple = view.getByRole("radio", { name: "Apple" });
      const pear = view.getByRole("radio", { name: "Pear" });
      await view.user.click(pear);
      await view.expectParity("readonly-clicked");
      await view.user.keyboard(" ");
      await view.expectParity("readonly-spaced");
      await view.user.focus(apple);
      await view.expectParity("readonly-focused");
      await view.user.keyboard("{ArrowRight}");
      await view.expectParity("readonly-arrowed");
      await expect.element(apple).toBeChecked();
      await expect.element(pear).not.toBeChecked();
      await expect.element(view.getByRole("status")).toHaveTextContent("apple");
      expect(view.emitted("change")).toEqual([]);
    },
  );

  it("disables every option", async () => {
    const view = await mountScenario(RadioGroupCase, "disabled");
    await view.expectParity("disabled");
    await expect.element(view.getByRole("radio", { name: "Apple" })).toBeDisabled();
    await expect.element(view.getByRole("radio", { name: "Pear" })).toBeDisabled();
  });
});
