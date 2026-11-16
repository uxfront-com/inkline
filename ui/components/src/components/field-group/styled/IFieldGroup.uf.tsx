import { defineSlots } from "@uxfront/unframework";
import type { Element } from "@uxfront/unframework";
import { fieldGroupRecipe } from "virtual:styleframe";

import IFieldGroupBase from "../headless/IFieldGroupBase.uf.tsx";
import type { FieldGroupProps } from "../types.ts";

/**
 * The styled FieldGroup: joins the bordered controls placed as its direct children, like inputs,
 * buttons and badges, into one unit, merging their border radii and collapsing the inner seams.
 * `orientation` and `block` map to the recipe's axes.
 */
export default function IFieldGroup({ id, orientation, block }: FieldGroupProps) {
  const slots = defineSlots<{ default?(): Element }>();

  return (
    <IFieldGroupBase id={id} class={fieldGroupRecipe({ orientation, block })}>
      {slots.default?.() ?? null}
    </IFieldGroupBase>
  );
}
