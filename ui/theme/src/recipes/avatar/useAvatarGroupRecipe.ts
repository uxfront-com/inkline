import { createUseRecipe } from "@styleframe/theme";

/**
 * Avatar group recipe — lays out multiple `.avatar` items in an overlapping
 * stack. Each avatar gets a ring (in the page background color) so overlapping
 * items read as separate, and a per-size negative margin controls the overlap
 * amount. Models the `button-group` coordination pattern: the size axis emits a
 * `-<size>` marker class that the setup selectors target.
 */
export const useAvatarGroupRecipe = createUseRecipe(
  "avatar-group",
  {
    base: {
      display: "inline-flex",
      alignItems: "center",
    },
    variants: {
      size: {
        xs: {},
        sm: {},
        md: {},
        lg: {},
        xl: {},
      },
    },
    compoundVariants: [
      {
        match: { size: "xs" as const },
        className: "-xs",
      },
      {
        match: { size: "sm" as const },
        className: "-sm",
      },
      {
        match: { size: "md" as const },
        className: "-md",
      },
      {
        match: { size: "lg" as const },
        className: "-lg",
      },
      {
        match: { size: "xl" as const },
        className: "-xl",
      },
    ],
    defaultVariants: {
      size: "md",
    },
  },
  (s) => {
    const { selector } = s;

    // Ring around each avatar so overlapping items stay visually separate.
    selector(".avatar-group > .avatar", {
      borderWidth: "@border-width.medium",
      borderStyle: "@border-style.solid",
      borderColor: "@color.background",
      boxSizing: "border-box",
    });

    // Bring the hovered avatar to the front of the stack.
    selector(".avatar-group > .avatar:hover", {
      zIndex: "1",
    });

    // Per-size overlap — negative margin on every avatar except the first.
    selector(".avatar-group.-xs > .avatar:not(:first-child)", {
      marginLeft: "-0.375rem",
    });
    selector(".avatar-group.-sm > .avatar:not(:first-child)", {
      marginLeft: "-0.5rem",
    });
    selector(".avatar-group.-md > .avatar:not(:first-child)", {
      marginLeft: "-0.625rem",
    });
    selector(".avatar-group.-lg > .avatar:not(:first-child)", {
      marginLeft: "-0.75rem",
    });
    selector(".avatar-group.-xl > .avatar:not(:first-child)", {
      marginLeft: "-1rem",
    });
  },
);
