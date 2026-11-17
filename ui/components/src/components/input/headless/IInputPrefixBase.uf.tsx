import { defineSlots } from "@uxfront/unframework";
import type { Element } from "@uxfront/unframework";

export default function IInputPrefixBase() {
  const slots = defineSlots<{ default?(): Element }>();

  return <span>{slots.default?.()}</span>;
}
