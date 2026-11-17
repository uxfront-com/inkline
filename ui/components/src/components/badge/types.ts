import type { BadgeRecipeProps } from "../../recipes.ts";

export interface BadgeBaseProps {
  /** Label text; the default slot overrides it. */
  label?: string;
}

export interface BadgeProps
  extends BadgeBaseProps, Pick<BadgeRecipeProps, "color" | "variant" | "size"> {}
