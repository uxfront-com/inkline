import { createUseRecipe } from "@styleframe/theme";

/**
 * Field group recipe for joining bordered controls (button, input, select,
 * badge) into a single visual unit, the way Nuxt UI's FieldGroup does. The
 * group's direct children are merged at the seams — adjacent border radii and
 * the inner border width are flattened so neighbours read as one control.
 *
 * Supports orientation (horizontal/vertical) and a block mode that makes the
 * group fill its container. Children are targeted generically (`& > *`): every
 * intended child carries border + radius tokens, and zeroing a border on a
 * borderless child is a visual no-op.
 *
 * Children must be visible controls rendered as *direct* children. Conditional
 * children should be removed from the DOM (e.g. `v-if`), not hidden, since the
 * seam rules rely on `:first-child` / `:last-child` position.
 */
export const useFieldGroupRecipe = createUseRecipe(
  "field-group",
  {
    base: {
      display: "inline-flex",
      verticalAlign: "middle",
      position: "relative",
    },
    variants: {
      orientation: {
        horizontal: {
          flexDirection: "row",
        },
        vertical: {
          flexDirection: "column",
        },
      },
      block: {
        true: {
          display: "flex",
          width: "100%",
        },
        false: {},
      },
    },
    compoundVariants: [
      {
        match: { orientation: "horizontal" as const },
        className: "-horizontal",
      },
      {
        match: { orientation: "vertical" as const },
        className: "-vertical",
      },
      {
        match: { block: "true" as const },
        className: "-block",
      },
    ],
    defaultVariants: {
      orientation: "horizontal",
      block: "false",
    },
  },
  (s) => {
    const { selector } = s;

    const fieldGroupChildren = [".input", ".textarea", ".select", ".button", ".dropdown"];
    const C = `:where(${fieldGroupChildren.join(", ")})`; // subject anchor, 0 specificity
    const K = `:is(${fieldGroupChildren.join(", ")})`; // adjacency key, (0,1,0) specificity

    // Horizontal: join controls side-by-side and let fields take the slack.
    selector(".field-group.-horizontal", {
      // non-last control (has a following control) → merge right edge into the next
      [`& > ${C}:has(~ ${K})`]: {
        borderTopRightRadius: "0",
        borderBottomRightRadius: "0",
        borderRightWidth: "0",
      },
      // non-first control (preceded by a control) → square the left edge
      [`& > ${C} ~ ${K}`]: {
        borderTopLeftRadius: "0",
        borderBottomLeftRadius: "0",
      },
      "& > .input": { flexGrow: "1", minWidth: "0" },
      "& > .select": { flexGrow: "1", minWidth: "0" },
      "& > .textarea": { flexGrow: "1", minWidth: "0" },
    });

    // Vertical: join controls top-to-bottom.
    selector(".field-group.-vertical", {
      [`& > ${C}:has(~ ${K})`]: {
        borderBottomLeftRadius: "0",
        borderBottomRightRadius: "0",
        borderBottomWidth: "0",
      },
      [`& > ${C} ~ ${K}`]: {
        borderTopLeftRadius: "0",
        borderTopRightRadius: "0",
      },
    });

    // Block: buttons share the row equally; fields already flex-grow above.
    selector(".field-group.-block", {
      "& > .button": {
        flexBasis: "0",
        flexGrow: "1",
      },
    });
  },
);
