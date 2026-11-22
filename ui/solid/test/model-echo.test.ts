// @vitest-environment jsdom
import { createComponent, createSignal, type Component } from "solid-js";
import { render } from "solid-js/web";
import { afterEach, describe, expect, it, vi } from "vitest";

// A model's callback reports a change the component made, never one its parent made. Unframework's
// target tests can't see this on Solid: a parent's setter ignores a write of the value it already
// holds, so only a consumer's own callback tells the two apart.
type Control = Component<{
  ariaLabel?: string;
  checked?: boolean;
  onCheckedChange?: (value: boolean) => void;
}>;

// The package's build, as a consumer imports it. It ships no declarations, so each component takes
// the type of the props this test passes.
const load = (entry: string): Promise<Record<string, Control>> =>
  import(new URL(`../dist/${entry}.js`, import.meta.url).href);
const headless = await load("headless");
const styled = await load("index");

function exported(module: Record<string, Control>, name: string): [string, Control] {
  const control = module[name];
  if (!control) throw new Error(`the build doesn't export ${name}`);
  return [name, control];
}

const controls: [string, Control][] = [
  exported(headless, "ICheckboxControlBase"),
  exported(headless, "ISwitchControlBase"),
  exported(styled, "ICheckbox"),
  exported(styled, "ISwitch"),
];

let dispose: (() => void) | undefined;

// Unframework's Solid watchers run in a microtask, as Vue's scheduler does, so each step waits for
// them, and for the writes they make, before the test reads the result.
const settle = () => new Promise((resolve) => setTimeout(resolve));

afterEach(() => {
  dispose?.();
  document.body.replaceChildren();
});

describe.each(controls)("%s", (_name, Control) => {
  const mount = (onCheckedChange: (value: boolean) => void) => {
    const [checked, setChecked] = createSignal(false);
    const container = document.createElement("div");
    document.body.append(container);
    dispose = render(
      () =>
        createComponent(Control, {
          ariaLabel: "Accept",
          get checked() {
            return checked();
          },
          onCheckedChange,
        }),
      container,
    );
    return { setChecked, input: () => container.querySelector("input") as HTMLInputElement };
  };

  it("follows a parent's change of checked without calling onCheckedChange", async () => {
    const onCheckedChange = vi.fn();
    const { setChecked, input } = mount(onCheckedChange);
    setChecked(true);
    await settle();
    expect(input().checked).toBe(true);
    setChecked(false);
    await settle();
    expect(input().checked).toBe(false);
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it("calls onCheckedChange once for a click", async () => {
    const onCheckedChange = vi.fn();
    const { input } = mount(onCheckedChange);
    input().click();
    await settle();
    expect(onCheckedChange.mock.calls).toEqual([[true]]);
  });
});
