import { defineSlots } from "@uxfront/unframework";
import type { Element } from "@uxfront/unframework";

import type { InputBaseProps } from "../types.ts";

export default function IInputBase({ id }: InputBaseProps) {
  const slots = defineSlots<{ default?(): Element }>();

  return <div id={id}>{slots.default?.()}</div>;
}
