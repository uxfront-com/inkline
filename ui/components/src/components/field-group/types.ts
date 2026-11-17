import type { FieldGroupRecipeProps } from "../../recipes.ts";

export interface FieldGroupBaseProps {
  /** Id of the field group element. */
  id?: string;
}

export interface FieldGroupProps
  extends FieldGroupBaseProps, Pick<FieldGroupRecipeProps, "orientation" | "block"> {}
