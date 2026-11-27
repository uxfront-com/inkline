import { createUseRecipe } from "@styleframe/theme";

/**
 * Radio group recipe — sits on the `<fieldset>` that holds multiple `.radio`
 * rows, its `<legend>`, and an optional hint and error message. Supports
 * orientation (vertical / horizontal) and a size axis that controls the gap
 * between items. The fieldset's own border, padding and margin are reset, and
 * its minimum width too, so it never overflows a narrow column.
 *
 * The parts are plain elements, so they are styled from the `setup` callback:
 * the `<legend>`, and the hint and error message by their `data-slot`. The
 * legend and hint keep 4.5:1 against the page in both themes, and so does the
 * error message, which takes a lighter red on a dark page
 * (`radioGroupContrast.test.ts`). In a horizontal group the hint and error take a
 * row of their own.
 *
 * The group's `[aria-invalid="true"]` — which screen readers announce with its
 * error message — turns every ring red, doubled by an inset shadow so no
 * circle grows. `:invalid` isn't used, since it matches a required group
 * before anyone has answered it.
 */
export const useRadioGroupRecipe = createUseRecipe(
  "radio-group",
  {
    base: {
      display: "flex",
      minWidth: "0",
      margin: "0",
      padding: "0",
      borderWidth: "0",
      color: "@color.text",
    },
    variants: {
      orientation: {
        vertical: {
          flexDirection: "column",
        },
        horizontal: {
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
        },
      },
      size: {
        sm: {
          gap: "@0.5",
        },
        md: {
          gap: "@0.75",
        },
        lg: {
          gap: "@1",
        },
      },
    },
    defaultVariants: {
      orientation: "vertical",
      size: "md",
    },
  },
  (s) => {
    const { selector } = s;

    selector(".radio-group > legend", {
      padding: "0",
      marginBlockEnd: "@spacing.xs",
      fontSize: "@font-size.sm",
      fontWeight: "@font-weight.medium",
      color: "@color.text",
    });

    selector('.radio-group > [data-slot="hint"], .radio-group > [data-slot="error"]', {
      flexBasis: "100%",
      margin: "0",
      fontSize: "@font-size.sm",
    });

    selector('.radio-group > [data-slot="hint"]', {
      color: "@color.text-weak",
    });

    selector('.radio-group > [data-slot="error"]', {
      color: "@color.error",
      ':is(.dark-theme, [data-theme="dark"]) &': {
        color: "@color.error-400",
      },
    });

    selector('.radio-group[aria-invalid="true"] .radio > .radio-field', {
      borderColor: "@color.error",
      boxShadow: "inset 0 0 0 1px @color.error",
    });
  },
);
