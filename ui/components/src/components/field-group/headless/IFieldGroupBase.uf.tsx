import { defineSlots } from "@uxfront/unframework";
import type { Element } from "@uxfront/unframework";

import type { FieldGroupBaseProps } from "../types.ts";

export default function IFieldGroupBase({ id }: FieldGroupBaseProps) {
  const slots = defineSlots<{ default?(): Element }>();

  return <div id={id}>{slots.default?.()}</div>;
}
