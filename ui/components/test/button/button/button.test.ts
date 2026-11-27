import { describeTargets, it, mount, mountScenario } from "@unframework.dev/testing";
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

  it("shows the variant, colour and size in effect, and each state only when set", async () => {
    const view = await mount(ButtonCase);
    await view.expectParity("default-2");
    const save = view.getByRole("button", { name: "Save" });
    await expect.element(save).toHaveAttribute("data-variant", "solid");
    await expect.element(save).toHaveAttribute("data-color", "neutral");
    await expect.element(save).toHaveAttribute("data-size", "md");
    for (const name of [
      "data-icon-only",
      "data-loading",
      "disabled",
      "aria-disabled",
      "aria-pressed",
      "aria-expanded",
      "aria-haspopup",
      "aria-controls",
      "aria-busy",
    ]) {
      await expect.element(save).not.toHaveAttribute(name);
    }
  });

  it("passes its type and disabled state to the native button", async () => {
    const view = await mount(ButtonCase, { props: { type: "submit", disabled: true } });
    await view.expectParity("disabled");
    const save = view.getByRole("button", { name: "Save" });
    await expect.element(save).toHaveAttribute("type", "submit");
    await expect.element(save).toBeDisabled();
    await expect.element(save).not.toHaveAttribute("aria-disabled");
    await expect.element(view.locator).toHaveNoAxeViolations();
  });

  it("styles the button with the recipe, and stretches it when block", async () => {
    const plain = await mount(ButtonCase);
    await plain.expectParity("default-3");
    const base = plain.getByRole("button", { name: "Save" }).element().className;
    await plain.unmount();
    const view = await mount(ButtonCase, {
      props: { color: "primary", variant: "outline", size: "lg", block: true },
    });
    await view.expectParity("styled");
    const save = view.getByRole("button", { name: "Save" });
    await expect.element(save).toHaveClass("button", "button--block");
    expect(save.element().className).not.toBe(base);
    await expect.element(save).toHaveAttribute("data-variant", "outline");
    await expect.element(save).toHaveAttribute("data-color", "primary");
    await expect.element(save).toHaveAttribute("data-size", "lg");
  });

  it("passes its id, accessible name and description to the native button", async () => {
    const view = await mount(ButtonCase, { props: { scenario: "attributes" } });
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

  it("names an icon-only button by its hidden label, and hides its icons", async () => {
    const view = await mount(ButtonCase, { props: { scenario: "icons" } });
    await view.expectParity("icons");
    await expect.element(view.locator).toHaveAriaTree(`
      - button "Settings"
      - button "Continue"
    `);
    await expect.element(view.locator).toHaveNoAxeViolations();
    const settings = view.getByRole("button", { name: "Settings" });
    await expect.element(settings).toHaveAttribute("data-icon-only", "");
    const label = settings.element().querySelector('[data-slot="label"]');
    expect(label?.textContent).toBe("Settings");
    // An icon-only button shows only its leading icon.
    expect(settings.element().querySelector('[data-slot="trailing"]')).toBeNull();
    const continued = view.getByRole("button", { name: "Continue" });
    await expect.element(continued).not.toHaveAttribute("data-icon-only");
    for (const part of ["leading", "trailing"]) {
      const icon = continued.element().querySelector(`[data-slot="${part}"]`);
      expect(icon?.getAttribute("aria-hidden")).toBe("true");
    }
    // The parts come in a fixed order: leading, label, trailing.
    expect(
      [...continued.element().children].map((child) => child.getAttribute("data-slot")),
    ).toEqual(["leading", "label", "trailing"]);
  });

  it("passes the toggle and popup states to the native button", async () => {
    const view = await mount(ButtonCase, {
      props: { scenario: "toggles", ariaPressed: true, ariaExpanded: false },
    });
    await view.expectParity("toggles");
    await expect.element(view.locator).toHaveNoAxeViolations();
    const mute = view.getByRole("button", { name: "Mute" });
    await expect.element(mute).toHaveAttribute("aria-pressed", "true");
    await expect.element(mute).not.toHaveAttribute("aria-expanded");
    const options = view.getByRole("button", { name: "Options" });
    await expect.element(options).toHaveAttribute("aria-haspopup", "menu");
    await expect.element(options).toHaveAttribute("aria-expanded", "false");
    await expect.element(options).toHaveAttribute("aria-controls", "options-menu");
    await expect.element(options).not.toHaveAttribute("aria-pressed");
    await view.rerender({ scenario: "toggles", ariaPressed: false, ariaExpanded: true });
    await view.expectParity("toggled");
    await expect.element(mute).toHaveAttribute("aria-pressed", "false");
    await expect.element(options).toHaveAttribute("aria-expanded", "true");
    await expect.element(view.locator).toHaveNoAxeViolations();
  });

  it(
    "emits click once for each click, each Enter and each Space",
    { requires: ["interactivity"] },
    async () => {
      const view = await mount(ButtonCase, { props: { scenario: "attributes" } });
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

  it("keeps a disabled button out of the tab order", { requires: ["interactivity"] }, async () => {
    const view = await mount(ButtonCase, { props: { disabled: true } });
    await view.user.tab();
    await view.expectParity("disabled-tabbed");
    await expect.element(view.getByRole("button", { name: "Save" })).toBeDisabled();
    await expect.element(view.getByRole("button", { name: "Slotted" })).toHaveFocus();
    expect(view.emitted("click")).toEqual([]);
  });

  it(
    "keeps a focusable disabled button in the tab order, and emits nothing",
    { requires: ["interactivity"] },
    async () => {
      const view = await mount(ButtonCase, {
        props: { disabled: true, focusableWhenDisabled: true },
      });
      await view.expectParity("focusable-disabled");
      const save = view.getByRole("button", { name: "Save" });
      await expect.element(save).toHaveAttribute("aria-disabled", "true");
      await expect.element(save).not.toHaveAttribute("disabled");
      await expect.element(view.locator).toHaveNoAxeViolations();
      await view.user.tab();
      await view.expectParity("focusable-disabled-tabbed");
      await expect.element(save).toHaveFocus();
      // Enter and Space dispatch the click that a pointer would.
      await view.user.keyboard("{Enter}");
      await view.expectParity("focusable-disabled-entered");
      await view.user.keyboard("{Space}");
      await view.expectParity("focusable-disabled-spaced");
      expect(view.emitted("click")).toEqual([]);
    },
  );

  it(
    "keeps its focus and name while loading, and emits nothing",
    { requires: ["interactivity"] },
    async () => {
      const view = await mount(ButtonCase, { props: { loadingLabel: "Saving" } });
      const save = view.getByRole("button", { name: "Save" });
      await view.user.tab();
      await view.expectParity("focused");
      const element = save.element();
      await expect.element(save).toHaveFocus();
      await view.rerender({ loadingLabel: "Saving", loading: true });
      await view.expectParity("loading");
      expect(document.activeElement).toBe(element);
      await expect.element(save).toHaveAccessibleName("Save");
      await expect.element(save).toHaveAttribute("aria-disabled", "true");
      await expect.element(save).toHaveAttribute("data-loading", "");
      await expect.element(save).not.toHaveAttribute("disabled");
      await expect.element(view.locator).toHaveNoAxeViolations();
      // The spinner comes last, and is hidden.
      expect([...element.children].map((child) => child.getAttribute("data-slot"))).toEqual([
        "label",
        "spinner",
      ]);
      expect(element.querySelector('[data-slot="spinner"]')?.getAttribute("aria-hidden")).toBe(
        "true",
      );
      await view.user.keyboard("{Enter}");
      await view.expectParity("loading-entered");
      await view.user.keyboard("{Space}");
      await view.expectParity("loading-spaced");
      expect(view.emitted("click")).toEqual([]);
    },
  );

  it(
    "announces its loading label in a polite live region",
    { requires: ["interactivity"] },
    async () => {
      const view = await mount(ButtonCase, { props: { loadingLabel: "Saving" } });
      await view.user.click(view.getByRole("button", { name: "Save" }));
      await view.expectParity("announcer-ready");
      const status = view.getByRole("status");
      await expect.element(status).toBeInTheDocument();
      await expect.element(status).toHaveTextContent("");
      await view.rerender({ loadingLabel: "Saving", loading: true });
      await view.expectParity("announced");
      await expect.element(status).toHaveTextContent("Saving");
      // The announcement isn't part of the button's name.
      await expect.element(view.getByRole("button", { name: "Save" })).toHaveAccessibleName("Save");
      expect(view.emitted("click")).toEqual([["save"]]);
    },
  );

  it(
    "prepares its live region before the click that starts loading",
    { requires: ["interactivity"] },
    async () => {
      for (const via of ["pointer", "keyboard"] as const) {
        const view = await mount(ButtonCase, { props: { scenario: "saving" } });
        const save = view.getByRole("button", { name: "Save" });
        // What the live region holds at the event just before the click: the pointer's release, or
        // the Enter key's press, which dispatches the click. A region the click itself creates
        // isn't there yet. Qwik runs the click's handlers from the document, so the click's own
        // capture phase can't tell.
        const seen: string[] = [];
        const record = () => {
          const region = document.querySelector("[data-inkline-announcer]");
          seen.push(region ? `ready: "${region.textContent}"` : "absent");
        };
        const before = via === "pointer" ? "pointerup" : "keydown";
        try {
          if (via === "pointer") {
            document.addEventListener(before, record, true);
            await view.user.click(save);
            await view.expectParity("saving-clicked");
          } else {
            await view.user.tab();
            await view.expectParity("saving-tabbed");
            document.addEventListener(before, record, true);
            await view.user.keyboard("{Enter}");
            await view.expectParity("saving-entered");
          }
        } finally {
          document.removeEventListener(before, record, true);
        }
        expect(seen).toEqual(['ready: ""']);
        await expect.element(view.getByRole("status")).toHaveTextContent("Saving");
        await expect.element(save).toHaveAttribute("data-loading", "");
        expect(view.emitted("click")).toEqual([["save"]]);
        await view.unmount();
      }
    },
  );

  it(
    "doesn't submit its form while loading or disabled",
    { requires: ["interactivity"] },
    async () => {
      for (const [name, props] of [
        ["form-loading", { loading: true }],
        ["form-disabled", { disabled: true, focusableWhenDisabled: true }],
      ] as const) {
        const view = await mount(ButtonCase, { props: { scenario: "form", ...props } });
        // Enter in the field clicks the form's submit button.
        await view.user.click(view.getByRole("textbox", { name: "Title" }));
        await view.user.keyboard("{Enter}");
        await view.expectParity(`${name}-field`);
        await view.user.tab();
        await expect.element(view.getByRole("button", { name: "Publish" })).toHaveFocus();
        await view.user.keyboard("{Enter}");
        await view.expectParity(`${name}-entered`);
        await view.user.keyboard("{Space}");
        await view.expectParity(`${name}-spaced`);
        expect(view.emitted("submit")).toEqual([]);
        expect(view.emitted("click")).toEqual([]);
        await view.unmount();
      }
      // The same form submits once the button can be used.
      const view = await mount(ButtonCase, { props: { scenario: "form" } });
      await view.user.click(view.getByRole("textbox", { name: "Title" }));
      await view.user.keyboard("{Enter}");
      await view.expectParity("form-field");
      await view.user.click(view.getByRole("button", { name: "Publish" }));
      await view.expectParity("form-clicked");
      expect(view.emitted("submit")).toEqual([[], []]);
      expect(view.emitted("click")).toEqual([["publish"], ["publish"]]);
    },
  );

  it(
    "switches an inert button from native disabled to aria-disabled once mounted",
    { requires: ["interactivity"] },
    async () => {
      const view = await mountScenario(ButtonCase, "inert");
      await view.expectParity("inert");
      for (const name of ["Publish", "Delete"]) {
        const button = view.getByRole("button", { name });
        await expect.element(button).toHaveAttribute("aria-disabled", "true");
        await expect.element(button).not.toHaveAttribute("disabled");
      }
      await expect
        .element(view.getByRole("button", { name: "Publish" }))
        .toHaveAttribute("data-loading", "");
    },
  );

  it("renders a link with the button's recipe and data attributes when it has an href", async () => {
    const styling = { color: "primary", variant: "outline", size: "lg", block: true } as const;
    const plain = await mount(ButtonCase, { props: styling });
    await plain.expectParity("link-button");
    const base = plain.getByRole("button", { name: "Save" }).element().className;
    await plain.unmount();
    const view = await mount(ButtonCase, {
      props: { scenario: "link", href: "/docs", ...styling },
    });
    await view.expectParity("link");
    await expect.element(view.locator).toHaveAriaTree(`
      - link "Docs":
        - /url: /docs
      - searchbox "Search"
    `);
    await expect.element(view.locator).toHaveNoAxeViolations();
    const docs = view.getByRole("link", { name: "Docs" });
    await expect.element(docs).toHaveAttribute("href", "/docs");
    expect(docs.element().tagName).toBe("A");
    expect(docs.element().className).toBe(base);
    await expect.element(docs).toHaveAttribute("data-variant", "outline");
    await expect.element(docs).toHaveAttribute("data-color", "primary");
    await expect.element(docs).toHaveAttribute("data-size", "lg");
    expect(view.locator.element().querySelector("button")).toBeNull();
  });

  it("renders no type, disabled state or toggle state on a link", async () => {
    const view = await mount(ButtonCase, {
      props: {
        scenario: "link",
        href: "/docs",
        type: "submit",
        ariaPressed: true,
        ariaExpanded: false,
      },
    });
    await view.expectParity("link-attributes");
    await expect.element(view.locator).toHaveNoAxeViolations();
    const docs = view.getByRole("link", { name: "Docs" });
    for (const name of ["type", "disabled", "aria-pressed", "aria-disabled", "role", "tabindex"]) {
      await expect.element(docs).not.toHaveAttribute(name);
    }
    await expect.element(docs).toHaveAttribute("aria-expanded", "false");
  });

  it("drops a link's href while it's disabled or loading, and says so", async () => {
    for (const [name, props, tabindex] of [
      ["link-disabled", { disabled: true }, null],
      ["link-focusable-disabled", { disabled: true, focusableWhenDisabled: true }, "0"],
      ["link-loading", { loading: true }, "0"],
    ] as const) {
      const view = await mount(ButtonCase, {
        props: { scenario: "link", href: "/docs", ...props },
      });
      await view.expectParity(name);
      await expect.element(view.locator).toHaveNoAxeViolations();
      const docs = view.getByRole("link", { name: "Docs" });
      await expect.element(docs).not.toHaveAttribute("href");
      await expect.element(docs).not.toHaveAttribute("disabled");
      await expect.element(docs).toHaveAttribute("role", "link");
      await expect.element(docs).toHaveAttribute("aria-disabled", "true");
      expect(docs.element().getAttribute("tabindex")).toBe(tabindex);
      await view.unmount();
    }
  });

  it(
    "keeps a loading or focusable disabled link's focus, and emits nothing",
    { requires: ["interactivity"] },
    async () => {
      const start = location.href;
      for (const [name, props, focused] of [
        ["link-disabled", { disabled: true }, "Search"],
        ["link-focusable-disabled", { disabled: true, focusableWhenDisabled: true }, "Docs"],
        ["link-loading", { loading: true }, "Docs"],
      ] as const) {
        const view = await mount(ButtonCase, {
          props: { scenario: "link", href: "/docs", ...props },
        });
        await view.user.tab();
        await view.expectParity(`${name}-tabbed`);
        const docs = view.getByRole("link", { name: "Docs" });
        if (focused === "Docs") await expect.element(docs).toHaveFocus();
        else await expect.element(view.getByRole("searchbox", { name: "Search" })).toHaveFocus();
        // Playwright refuses to click an `aria-disabled` element, so the click is the element's own.
        (docs.element() as HTMLElement).click();
        await view.expectParity(`${name}-clicked`);
        await view.user.keyboard("{Enter}");
        await view.expectParity(`${name}-entered`);
        expect(view.emitted("click")).toEqual([]);
        expect(location.href).toBe(start);
        await view.unmount();
      }
    },
  );

  it(
    "keeps a link's focus and name when it starts loading, and announces it",
    { requires: ["interactivity"] },
    async () => {
      const view = await mount(ButtonCase, {
        props: { scenario: "link", href: "/docs", loadingLabel: "Opening" },
      });
      const docs = view.getByRole("link", { name: "Docs" });
      await view.user.tab();
      await view.expectParity("link-focused");
      const element = docs.element();
      await expect.element(docs).toHaveFocus();
      await view.rerender({
        scenario: "link",
        href: "/docs",
        loadingLabel: "Opening",
        loading: true,
      });
      await view.expectParity("link-loading-started");
      expect(document.activeElement).toBe(element);
      await expect.element(docs).toHaveAccessibleName("Docs");
      await expect.element(docs).not.toHaveAttribute("href");
      await expect.element(view.getByRole("status")).toHaveTextContent("Opening");
      expect([...element.children].map((child) => child.getAttribute("data-slot"))).toEqual([
        "label",
        "spinner",
      ]);
    },
  );

  it("follows a link on Enter, and not on Space", { requires: ["interactivity"] }, async () => {
    // The harness fails a test whose link click goes unprevented, since it would leave the page.
    // So this listener, which runs after the component's, records whether the component let the
    // click through to the browser, and then stops the navigation itself.
    const followed: string[] = [];
    const follow = (event: MouseEvent) => {
      const link = (event.target as Element).closest("a[href]");
      if (!link || event.defaultPrevented) return;
      followed.push(link.getAttribute("href") ?? "");
      event.preventDefault();
    };
    document.addEventListener("click", follow);
    try {
      const view = await mount(ButtonCase, { props: { scenario: "link", href: "/docs" } });
      await view.user.tab();
      await view.expectParity("link-href-tabbed");
      await expect.element(view.getByRole("link", { name: "Docs" })).toHaveFocus();
      await view.user.keyboard("{Enter}");
      await view.expectParity("link-href-entered");
      expect(followed).toEqual(["/docs"]);
      expect(view.emitted("click")).toEqual([["docs"]]);
      await view.user.keyboard("{Space}");
      await view.expectParity("link-href-spaced");
      expect(followed).toEqual(["/docs"]);
      expect(view.emitted("click")).toEqual([["docs"]]);
    } finally {
      document.removeEventListener("click", follow);
    }
  });

  it("names an icon-only link by its hidden label, and hides its icons", async () => {
    const view = await mount(ButtonCase, { props: { scenario: "link-icons" } });
    await view.expectParity("link-icons");
    await expect.element(view.locator).toHaveAriaTree(`
      - link "Settings":
        - /url: /settings
      - link "Continue":
        - /url: /next
    `);
    await expect.element(view.locator).toHaveNoAxeViolations();
    const settings = view.getByRole("link", { name: "Settings" });
    await expect.element(settings).toHaveAttribute("href", "/settings");
    await expect.element(settings).toHaveAttribute("data-icon-only", "");
    expect(settings.element().querySelector('[data-slot="label"]')?.textContent).toBe("Settings");
    expect(settings.element().querySelector('[data-slot="trailing"]')).toBeNull();
    const continued = view.getByRole("link", { name: "Continue" });
    for (const part of ["leading", "trailing"]) {
      const icon = continued.element().querySelector(`[data-slot="${part}"]`);
      expect(icon?.getAttribute("aria-hidden")).toBe("true");
    }
    expect(
      [...continued.element().children].map((child) => child.getAttribute("data-slot")),
    ).toEqual(["leading", "label", "trailing"]);
  });

  it(
    "renders a link with no href on the server while it's disabled",
    { requires: ["interactivity"] },
    async () => {
      const view = await mountScenario(ButtonCase, "link-disabled");
      await view.expectParity("link-disabled-hydrated");
      const docs = view.getByRole("link", { name: "Docs" });
      await expect.element(docs).not.toHaveAttribute("href");
      await expect.element(docs).toHaveAttribute("aria-disabled", "true");
    },
  );
});
