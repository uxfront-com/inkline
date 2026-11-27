import { createUseRecipe } from "@styleframe/theme";

/**
 * Sidebar panel recipe. The `.sidebar` class sits on the persistent navigation surface
 * (`<aside>`) of an application shell — a fixed-width, full-height flex column that holds a
 * header, a scrollable content region, and a footer.
 *
 * Supports color (light, dark, neutral), variant (solid, soft, subtle), size, and a
 * `collapsed` boolean that switches the panel to the icon-rail layout. Width is driven by the
 * `@sidebar.width` / `@sidebar.width-icon` component variables (registered in setup). Toggling
 * the collapsed state is the consumer's responsibility (it carries no behavior); the recipe
 * only ships the CSS, keyed off the `.-collapsed` class — see the setup callback.
 */
export const useSidebarRecipe = createUseRecipe(
  "sidebar",
  {
    base: {
      display: "flex",
      flexDirection: "column",
      flexShrink: "0",
      width: "@sidebar.width",
      height: "100%",
      borderWidth: "@border-width.thin",
      borderStyle: "@border-style.solid",
      borderColor: "transparent",
      overflow: "hidden",
      lineHeight: "@line-height.normal",
    },
    variants: {
      color: {
        light: {},
        dark: {},
        neutral: {},
      },
      variant: {
        solid: {},
        soft: {},
        subtle: {},
      },
      size: {
        sm: {
          fontSize: "@font-size.xs",
        },
        md: {
          fontSize: "@font-size.sm",
        },
        lg: {
          fontSize: "@font-size.md",
        },
      },
      collapsed: {
        true: {},
        false: {},
      },
    },
    compoundVariants: [
      // Light color (fixed across themes)
      {
        match: { color: "light" as const, variant: "solid" as const },
        css: {
          background: "@color.white",
          color: "@color.gray-900",
          borderColor: "@color.gray-200",
          "&:dark": {
            background: "@color.white",
            color: "@color.gray-900",
            borderColor: "@color.gray-200",
          },
        },
      },
      {
        match: { color: "light" as const, variant: "soft" as const },
        css: {
          background: "@color.gray-100",
          color: "@color.gray-700",
          "&:dark": {
            background: "@color.gray-100",
            color: "@color.gray-700",
          },
        },
      },
      {
        match: { color: "light" as const, variant: "subtle" as const },
        css: {
          background: "@color.gray-100",
          color: "@color.gray-700",
          borderColor: "@color.gray-200",
          "&:dark": {
            background: "@color.gray-100",
            color: "@color.gray-700",
            borderColor: "@color.gray-200",
          },
        },
      },

      // Dark color (fixed across themes)
      {
        match: { color: "dark" as const, variant: "solid" as const },
        css: {
          background: "@color.gray-900",
          color: "@color.gray-100",
          borderColor: "@color.gray-700",
          "&:dark": {
            background: "@color.gray-900",
            color: "@color.gray-100",
            borderColor: "@color.gray-700",
          },
        },
      },
      {
        match: { color: "dark" as const, variant: "soft" as const },
        css: {
          background: "@color.gray-800",
          color: "@color.gray-300",
          "&:dark": {
            background: "@color.gray-800",
            color: "@color.gray-300",
          },
        },
      },
      {
        match: { color: "dark" as const, variant: "subtle" as const },
        css: {
          background: "@color.gray-800",
          color: "@color.gray-300",
          borderColor: "@color.gray-700",
          "&:dark": {
            background: "@color.gray-800",
            color: "@color.gray-300",
            borderColor: "@color.gray-700",
          },
        },
      },

      // Neutral color (adaptive: light in light mode, dark in dark mode)
      {
        match: { color: "neutral" as const, variant: "solid" as const },
        css: {
          background: "@color.white",
          color: "@color.text",
          borderColor: "@color.gray-200",
          "&:dark": {
            background: "@color.gray-900",
            color: "@color.white",
            borderColor: "@color.gray-700",
          },
        },
      },
      {
        match: { color: "neutral" as const, variant: "soft" as const },
        css: {
          background: "@color.gray-100",
          color: "@color.gray-700",
          "&:dark": {
            background: "@color.gray-800",
            color: "@color.gray-300",
          },
        },
      },
      {
        match: { color: "neutral" as const, variant: "subtle" as const },
        css: {
          background: "@color.gray-100",
          color: "@color.gray-700",
          borderColor: "@color.gray-200",
          "&:dark": {
            background: "@color.gray-800",
            color: "@color.gray-300",
            borderColor: "@color.gray-700",
          },
        },
      },

      // Collapsed — emits the stable `.-collapsed` hook used by the setup selectors.
      {
        match: { collapsed: "true" as const },
        className: "-collapsed",
      },
    ],
    defaultVariants: {
      color: "neutral",
      variant: "solid",
      size: "md",
      collapsed: "false",
    },
  },
  (s) => {
    const { selector, variable } = s;

    // Component-scoped widths — the expanded panel and the collapsed icon rail.
    variable("sidebar.width", "16rem", { default: true });
    variable("sidebar.width-icon", "3rem", { default: true });

    // Collapsed icon-rail: narrow the panel, hide text labels and secondary
    // affordances, and center the menu-button icons. The consumer toggles
    // `.-collapsed` (or passes `collapsed: true`); the recipe ships only the CSS.
    selector(".sidebar.-collapsed", {
      width: "@sidebar.width-icon",
    });
    selector(".sidebar.-collapsed .sidebar-menu-button-label", {
      display: "none",
    });
    selector(".sidebar.-collapsed .sidebar-group-label", {
      display: "none",
    });
    selector(".sidebar.-collapsed .sidebar-menu-action", {
      display: "none",
    });
    selector(".sidebar.-collapsed .sidebar-menu-badge", {
      display: "none",
    });
    selector(".sidebar.-collapsed .sidebar-menu-sub", {
      display: "none",
    });
    selector(".sidebar.-collapsed .sidebar-group-action", {
      display: "none",
    });
    selector(".sidebar.-collapsed .sidebar-menu-button", {
      justifyContent: "center",
      paddingLeft: "0",
      paddingRight: "0",
    });
  },
);
