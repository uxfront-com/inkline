import type { AtRule, Styleframe } from "@styleframe/core";
import { expect } from "vitest";

/**
 * Assert that a `@keyframes <name>` at-rule was registered on the instance
 * root — i.e. a recipe's `setup()` callback actually called
 * `s.keyframes(name, …)`.
 *
 * Recipes reference keyframes indirectly, by a string `animationName` in their
 * base/variants. That string is opaque to the base/variant object assertions,
 * so if the matching `s.keyframes(...)` registration is deleted the animation
 * silently goes inert and nothing red catches it. This helper closes that
 * blind spot: any recipe that names an animation must prove the keyframes
 * behind it exist.
 *
 * Returns the matched at-rule so callers can further assert its steps.
 */
export function expectKeyframesRegistered(s: Styleframe, name: string): AtRule {
	const keyframes = s.root.children.filter(
		(child): child is AtRule => child.type === "at-rule" && child.identifier === "keyframes",
	);

	expect(keyframes.map((rule) => rule.rule)).toContain(name);

	return keyframes.find((rule) => rule.rule === name) as AtRule;
}
