import { describeTargets, it, mountScenario } from "@unframework.dev/testing";
import { expect } from "vitest";

import RadioGroupBaseCase from "./RadioGroupBaseCase.uf.tsx";

describeTargets("radio/radio-group-base", () => {
  it("groups its radios under its label", async () => {
    const view = await mountScenario(RadioGroupBaseCase, "default");
    await view.expectParity("default");
    await expect.element(view.locator).toHaveAriaTree(`
      - radiogroup "Fruit":
        - radio "Apple"
        - text: Apple
        - radio "Pear"
        - text: Pear
    `);
    await expect.element(view.locator).toHaveNoAxeViolations();
    await expect.element(view.getByRole("radiogroup")).not.toHaveAttribute("aria-readonly");
  });

  it("marks a read-only group", async () => {
    const view = await mountScenario(RadioGroupBaseCase, "readonly");
    await view.expectParity("readonly");
    await expect
      .element(view.getByRole("radiogroup", { name: "Fruit" }))
      .toHaveAttribute("aria-readonly", "true");
  });

  it("passes its description to the radiogroup", async () => {
    const view = await mountScenario(RadioGroupBaseCase, "attributes");
    await view.expectParity("attributes");
    await expect.element(view.locator).toHaveNoAxeViolations();
    const group = view.getByRole("radiogroup", { name: "Fruit" });
    await expect.element(group).toHaveAttribute("aria-describedby", "fruit-hint");
    await expect.element(group).toHaveAccessibleDescription("Pick one.");
  });

  it(
    "lets its radio fields write the selection on a click and an arrow key",
    { requires: ["interactivity"] },
    async () => {
      const view = await mountScenario(RadioGroupBaseCase, "fields");
      await view.expectParity("fields");
      await expect.element(view.getByRole("radio", { name: "Apple" })).toBeChecked();
      await view.user.click(view.getByRole("radio", { name: "Pear" }));
      await view.expectParity("fields-pear");
      await view.user.keyboard("{ArrowRight}");
      await view.expectParity("fields-fig");
      await expect.element(view.getByRole("radio", { name: "Fig" })).toBeChecked();
      await expect.element(view.getByRole("status")).toHaveTextContent("fig");
      expect(view.emitted("change")).toEqual([["pear"], ["fig"]]);
    },
  );

  it(
    "keeps a read-only group's selection on a click, Space and the arrow keys",
    { requires: ["interactivity"] },
    async () => {
      const view = await mountScenario(RadioGroupBaseCase, "fields-readonly");
      await view.expectParity("fields-readonly");
      const apple = view.getByRole("radio", { name: "Apple" });
      const pear = view.getByRole("radio", { name: "Pear" });
      await view.user.click(pear);
      await view.expectParity("fields-readonly-clicked");
      await view.user.keyboard(" ");
      await view.expectParity("fields-readonly-spaced");
      await view.user.focus(apple);
      await view.expectParity("fields-readonly-focused");
      await view.user.keyboard("{ArrowRight}");
      await view.expectParity("fields-readonly-arrowed");
      await view.user.keyboard("{ArrowLeft}");
      await view.expectParity("fields-readonly-arrowed-back");
      await view.user.click(apple);
      await view.expectParity("fields-readonly-clicked-checked");
      await view.user.keyboard(" ");
      await view.expectParity("fields-readonly-spaced-checked");
      await expect.element(apple).toBeChecked();
      await expect.element(pear).not.toBeChecked();
      await expect.element(view.getByRole("status")).toHaveTextContent("apple");
      expect(view.emitted("change")).toEqual([]);
    },
  );
});
