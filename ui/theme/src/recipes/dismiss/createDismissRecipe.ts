import { createUseRecipe } from "@styleframe/theme";

/**
 * Shared recipe-definition builder for dismiss buttons, imported by consumers
 * (e.g. `callout`) via relative path — mirroring `modal/createOverlayRecipes.ts`.
 *
 * The `${name}` parameter prefixes the recipe name so each consumer gets its
 * own class namespace while sharing identical CSS. The button inherits the
 * host's text color and is sized in `em` so it scales with the host, while
 * `margin-inline-start: auto` pushes it to the end of a flex row. The "×"
 * glyph is supplied by the consumer.
 */
export function createDismissRecipe(name: string) {
	return createUseRecipe(`${name}-dismiss`, {
		base: {
			display: "inline-flex",
			alignItems: "center",
			justifyContent: "center",
			flexShrink: "0",
			width: "1em",
			height: "1em",
			marginInlineStart: "auto",
			padding: "0",
			borderWidth: "0",
			background: "transparent",
			color: "inherit",
			fontSize: "inherit",
			lineHeight: "1",
			borderRadius: "@border-radius.sm",
			cursor: "pointer",
			opacity: "0.7",
			transitionProperty: "opacity",
			transitionTimingFunction: "@easing.ease-in-out",
			transitionDuration: "150ms",
			"&:hover": {
				opacity: "1",
			},
			"&:focus-visible": {
				outlineWidth: "2px",
				outlineStyle: "solid",
				outlineColor: "@color.primary",
				outlineOffset: "1px",
			},
		},
	});
}
