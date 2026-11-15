import type { InputRecipeProps } from "../../recipes.ts";

export interface InputBaseProps {
  /** Id of the field shell element. */
  id?: string;
}

/** The `type` of a text-like `<input>`, whose value is its text. */
export type InputType = "text" | "email" | "password" | "search" | "tel" | "url";

export interface InputControlBaseProps {
  /** Id of the native control. */
  id?: string;
  /** Name of the native control. */
  name?: string;
  /** Input type, like `"text"` or `"email"`. Use `IInputTextareaBase` for a `<textarea>`. */
  type?: InputType;
  /** Placeholder text. */
  placeholder?: string;
  /** Disables the control. */
  disabled?: boolean;
  /** Marks the control as read-only. */
  readonly?: boolean;
}

export interface InputTextareaBaseProps {
  /** Id of the native control. */
  id?: string;
  /** Name of the native control. */
  name?: string;
  /** Placeholder text. */
  placeholder?: string;
  /** Disables the control. */
  disabled?: boolean;
  /** Marks the control as read-only. */
  readonly?: boolean;
}

// `disabled` and `readonly` come from the control: the recipe's `"true" | "false" | boolean` takes
// its `boolean`.
export interface InputProps
  extends
    Omit<InputControlBaseProps, "type">,
    Pick<InputRecipeProps, "color" | "variant" | "size" | "invalid"> {
  /** Input type, like `"text"` or `"email"`, or `"textarea"` for a `<textarea>`. */
  type?: InputType | "textarea";
}
