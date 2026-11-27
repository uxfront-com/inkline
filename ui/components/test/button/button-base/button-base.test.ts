import { describeTargets, it, mountScenario } from "@unframework.dev/testing";
import { expect } from "vitest";

import ButtonBaseCase from "./ButtonBaseCase.uf.tsx";

describeTargets("button/button-base", () => {
  it("renders a native button for each state", async () => {
    const view = await mountScenario(ButtonBaseCase, "default");
    await view.expectParity("default");
    await expect.element(view.locator).toHaveAriaTree(`
      - button "Save"
      - button "Send"
      - button "Off" [disabled]
      - button "Slotted"
    `);
    await expect.element(view.locator).toHaveNoAxeViolations();
    await expect
      .element(view.getByRole("button", { name: "Save" }))
      .toHaveAttribute("type", "button");
    await expect
      .element(view.getByRole("button", { name: "Send" }))
      .toHaveAttribute("type", "submit");
  });

  it("renders no data attributes or state until they're set", async () => {
    const view = await mountScenario(ButtonBaseCase, "default");
    await view.expectParity("default-2");
    const save = view.getByRole("button", { name: "Save" });
    for (const name of [
      "data-variant",
      "data-color",
      "data-size",
      "data-icon-only",
      "data-loading",
      "aria-disabled",
      "aria-pressed",
      "aria-expanded",
      "aria-busy",
    ]) {
      await expect.element(save).not.toHaveAttribute(name);
    }
    expect(save.element().querySelector('[data-slot="label"]')?.textContent).toBe("Save");
    expect(save.element().querySelector('[data-slot="spinner"]')).toBeNull();
  });

  it(
    "keeps a loading button focusable, marks it and shows its spinner last",
    { requires: ["interactivity"] },
    async () => {
      const view = await mountScenario(ButtonBaseCase, "loading");
      await view.expectParity("loading");
      const loading = view.getByRole("button", { name: "Wait" });
      await expect.element(loading).toHaveAttribute("aria-disabled", "true");
      await expect.element(loading).toHaveAttribute("data-loading", "");
      await expect.element(loading).not.toHaveAttribute("disabled");
      await expect.element(view.locator).toHaveNoAxeViolations();
      const element = loading.element();
      expect([...element.children].map((child) => child.getAttribute("data-slot"))).toEqual([
        "leading",
        "label",
        "trailing",
        "spinner",
      ]);
      for (const part of ["leading", "trailing", "spinner"]) {
        expect(element.querySelector(`[data-slot="${part}"]`)?.getAttribute("aria-hidden")).toBe(
          "true",
        );
      }
    },
  );

  it("passes its id, accessible name and description to the native button", async () => {
    const view = await mountScenario(ButtonBaseCase, "attributes");
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
    "emits click once for each click, each Enter and each Space",
    { requires: ["interactivity"] },
    async () => {
      const view = await mountScenario(ButtonBaseCase, "attributes");
      await view.expectParity("attributes-2");
      await view.user.click(view.getByRole("button", { name: "Save" }));
      await view.expectParity("clicked");
      await view.user.keyboard("{Enter}");
      await view.expectParity("entered");
      await view.user.keyboard("{Space}");
      await view.expectParity("spaced");
      await view.user.click(view.getByRole("button", { name: "Close" }));
      await view.expectParity("closed");
      expect(view.emitted("click")).toEqual([["save"], ["save"], ["save"], ["close"]]);
    },
  );

  it("renders a link for each state, with an href only while it's active", async () => {
    const view = await mountScenario(ButtonBaseCase, "link");
    await view.expectParity("link");
    await expect.element(view.locator).toHaveAriaTree(`
      - link "Docs":
        - /url: /docs
      - link "Off" [disabled]
      - link "Held" [disabled]
      - link "Wait" [disabled]
    `);
    await expect.element(view.locator).toHaveNoAxeViolations();
    expect(view.locator.element().querySelector("button")).toBeNull();
    for (const [name, href, tabindex] of [
      ["Docs", "/docs", null],
      ["Off", null, null],
      ["Held", null, "0"],
      ["Wait", null, "0"],
    ] as const) {
      const link = view.getByRole("link", { name }).element();
      expect(link.tagName).toBe("A");
      expect(link.getAttribute("href")).toBe(href);
      expect(link.getAttribute("role")).toBe(href ? null : "link");
      expect(link.getAttribute("aria-disabled")).toBe(href ? null : "true");
      expect(link.getAttribute("tabindex")).toBe(tabindex);
      for (const attribute of ["type", "disabled", "aria-pressed"]) {
        expect(link.hasAttribute(attribute)).toBe(false);
      }
    }
  });

  it(
    "emits click only from an active link, and cancels the click of one that isn't",
    { requires: ["interactivity"] },
    async () => {
      // The harness fails a test whose link click goes unprevented, since it would leave the page.
      // So this listener, which runs after the component's, records whether the component let the
      // click through, and then stops the navigation itself.
      const unprevented: Array<string> = [];
      const record = (event: MouseEvent) => {
        const link = (event.target as Element).closest("a");
        if (!link || event.defaultPrevented) {
          return;
        }
        unprevented.push(link.textContent ?? "");
        event.preventDefault();
      };
      document.addEventListener("click", record);
      try {
        const view = await mountScenario(ButtonBaseCase, "link");
        await view.expectParity("link-2");
        await view.user.click(view.getByRole("link", { name: "Docs" }));
        await view.expectParity("link-clicked");
        // Playwright refuses to click an `aria-disabled` element, so these clicks are the element's own.
        for (const name of ["Off", "Held", "Wait"]) {
          (view.getByRole("link", { name }).element() as HTMLElement).click();
        }
        await view.expectParity("link-inert-clicked");
        expect(unprevented).toEqual(["Docs"]);
        expect(view.emitted("click")).toEqual([["docs"]]);
      } finally {
        document.removeEventListener("click", record);
      }
    },
  );
});
