// @vitest-environment jsdom
import { act, createElement, type ComponentType } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// A model's callback reports a change the component made, never one its parent made. Unframework's
// target tests can't see this on React: a parent's setter ignores a write of the value it already
// holds, so only a consumer's own callback tells the two apart.
(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

type Control = ComponentType<{
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

const controls: [string, Control][] = [
  ["ICheckboxControlBase", headless.ICheckboxControlBase],
  ["ISwitchControlBase", headless.ISwitchControlBase],
  ["ICheckbox", styled.ICheckbox],
  ["ISwitch", styled.ISwitch],
];

let container: HTMLElement;
let root: Root;

beforeEach(() => {
  container = document.createElement("div");
  document.body.append(container);
  root = createRoot(container);
});

afterEach(async () => {
  await act(() => root.unmount());
  container.remove();
});

describe.each(controls)("%s", (_name, Control) => {
  const render = (checked: boolean, onCheckedChange: (value: boolean) => void) =>
    act(() =>
      root.render(createElement(Control, { ariaLabel: "Accept", checked, onCheckedChange })),
    );
  const input = () => container.querySelector("input") as HTMLInputElement;

  it("follows a parent's change of checked without calling onCheckedChange", async () => {
    const onCheckedChange = vi.fn();
    await render(false, onCheckedChange);
    await render(true, onCheckedChange);
    expect(input().checked).toBe(true);
    await render(false, onCheckedChange);
    expect(input().checked).toBe(false);
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it("calls onCheckedChange once for a click", async () => {
    const onCheckedChange = vi.fn();
    await render(false, onCheckedChange);
    await act(() => input().click());
    expect(onCheckedChange.mock.calls).toEqual([[true]]);
  });
});
