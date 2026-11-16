import { describeTargets, it, mountScenario } from "@unframework.dev/testing";
import { expect } from "vitest";

import FieldGroupBaseCase from "./FieldGroupBaseCase.uf.tsx";

describeTargets("field-group/field-group-base", () => {
  it("holds its controls under its id", async () => {
    const view = await mountScenario(FieldGroupBaseCase, "default");
    await view.expectParity("default");
    await expect.element(view.locator).toHaveAriaTree(`
      - textbox "Query"
      - button "Search"
    `);
    await expect.element(view.locator).toHaveNoAxeViolations();
    const group = view.container.querySelector("#search");
    expect(group?.querySelector("input")).not.toBeNull();
    expect(group?.querySelector("button")).not.toBeNull();
  });
});
