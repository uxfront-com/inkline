import { createUseRecipe } from "@styleframe/theme";

/**
 * Breadcrumb container recipe for navigation hierarchies.
 * Renders a horizontal list with size-controlled gap and typography.
 */
export const useBreadcrumbRecipe = createUseRecipe(
  "breadcrumb",
  {
    base: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      listStyle: "none",
      paddingLeft: "0",
      marginTop: "0",
      marginBottom: "0",
    },
    variants: {
      size: {
        sm: {
          fontSize: "@font-size.xs",
          gap: "@0.5",
        },
        md: {
          fontSize: "@font-size.sm",
          gap: "@0.75",
        },
        lg: {
          fontSize: "@font-size.md",
          gap: "@1",
        },
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
  (s) => {
    s.selector(".breadcrumb-separator", {
      display: "flex",
      alignItems: "center",
      opacity: "0.6",
      userSelect: "none",
      pointerEvents: "none",
    });
  },
);
