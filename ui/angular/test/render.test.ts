import "@angular/compiler";

import { Component, provideZonelessChangeDetection } from "@angular/core";
import type { Type } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import { provideServerRendering, renderApplication } from "@angular/platform-server";
import { expect, it } from "vitest";

// The bundles ship no declarations of their own, so they're typed here.
const { IButton }: { IButton: Type<unknown> } = await import("../dist/fesm2022/index.mjs");
const { IButtonBase }: { IButtonBase: Type<unknown> } =
  await import("../dist/fesm2022/headless.mjs");

// Server-renders a styled and a headless component from the built package, with a static input
// and a bound one. A component the Angular compiler skipped renders its markup with neither.

async function render(component: Type<unknown>, selector: string): Promise<string> {
  // A decorator call, not `@Component`, so the test doesn't depend on how Vitest transforms
  // decorators. The JIT compiler loaded above compiles the host.
  const Host = Component({
    selector: "test-host",
    imports: [component],
    template: `<${selector} label="Save" [id]="'save'"></${selector}>`,
  })(class {});

  return renderApplication(
    (context) =>
      bootstrapApplication(
        Host,
        { providers: [provideZonelessChangeDetection(), provideServerRendering()] },
        context,
      ),
    { document: "<!DOCTYPE html><html><head></head><body><test-host></test-host></body></html>" },
  );
}

function button(html: string): { id: string | null; text: string } {
  const match = html.match(/<button\b([^>]*)>([\s\S]*?)<\/button>/);
  if (!match) {
    throw new Error(`no <button> in ${html}`);
  }
  const [, attributes = "", content = ""] = match;
  return {
    id: attributes.match(/\bid="([^"]*)"/)?.[1] ?? null,
    text: content.replaceAll(/<[^>]*>/g, "").trim(),
  };
}

it.each([
  ["IButton", IButton, "uf-i-button"],
  ["IButtonBase", IButtonBase, "uf-i-button-base"],
] as const)(
  "server-renders the built %s with its label and bound id",
  async (_, component, selector) => {
    expect(button(await render(component, selector))).toEqual({ id: "save", text: "Save" });
  },
);
