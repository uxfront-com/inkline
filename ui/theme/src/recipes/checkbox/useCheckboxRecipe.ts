import { createUseRecipe } from "@styleframe/theme";

/**
 * Checkbox wrapper recipe — sits on the `<label>` that wraps a
 * `<input class="checkbox-field">` and its text. Owns the inline layout
 * (gap, alignment), label typography, the box's hit area, and dims the label
 * when the nested field is disabled. The visual box lives on `checkbox-field`.
 *
 * The box and the label's first line sit side by side at the top, so a label
 * that wraps keeps the box beside its first line, in either direction. Each
 * size pads the label to at least the 1.5rem hit area, so stacked checkboxes
 * never share one, and `&:before` draws that hit area around the box (WCAG
 * 2.5.8): a press anywhere in it toggles the box, since it's part of the
 * `<label>`.
 *
 * The disabled and read-only label states use `:has()`, which is a raw CSS
 * selector rather than a registered modifier, so they are declared via the
 * `setup` callback.
 */
export const useCheckboxRecipe = createUseRecipe(
  "checkbox",
  {
    base: {
      position: "relative",
      display: "inline-flex",
      alignItems: "flex-start",
      cursor: "pointer",
      userSelect: "none",
      color: "@color.text",
      lineHeight: "@line-height.normal",
      "&:before": {
        position: "absolute",
        width: "1.5rem",
        height: "1.5rem",
      },
    },
    variants: {
      size: {
        sm: {
          gap: "@0.375",
          fontSize: "@font-size.xs",
          paddingBlock: "max(0px, calc((1.5rem - @font-size.xs * @line-height.normal) / 2))",
          "&:before": {
            top: "max(0px, calc((@font-size.xs * @line-height.normal - 1.5rem) / 2))",
            insetInlineStart: "calc((0.875rem - 1.5rem) / 2)",
          },
        },
        md: {
          gap: "@0.5",
          fontSize: "@font-size.sm",
          paddingBlock: "max(0px, calc((1.5rem - @font-size.sm * @line-height.normal) / 2))",
          "&:before": {
            top: "max(0px, calc((@font-size.sm * @line-height.normal - 1.5rem) / 2))",
            insetInlineStart: "calc((1rem - 1.5rem) / 2)",
          },
        },
        lg: {
          gap: "@0.625",
          fontSize: "@font-size.md",
          paddingBlock: "max(0px, calc((1.5rem - @font-size.md * @line-height.normal) / 2))",
          "&:before": {
            top: "max(0px, calc((@font-size.md * @line-height.normal - 1.5rem) / 2))",
            insetInlineStart: "calc((1.25rem - 1.5rem) / 2)",
          },
        },
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
  (s) => {
    const { selector } = s;

    // Dim the label when the nested field is disabled, `<fieldset disabled>`
    // included. Forced colors mode marks it with `GrayText` instead.
    selector(".checkbox:has(.checkbox-field:disabled)", {
      opacity: "0.5",
      cursor: "not-allowed",
      "@media (forced-colors: active)": {
        opacity: "1",
        color: "GrayText",
      },
    });

    // The label already dims the box, so the box doesn't dim twice.
    selector(".checkbox .checkbox-field:disabled", {
      opacity: "1",
    });

    // A read-only box can't be toggled, so its label doesn't invite a press.
    selector('.checkbox:has(.checkbox-field[aria-readonly="true"])', {
      cursor: "default",
    });
  },
);
