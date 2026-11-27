import { styleframe } from "@styleframe/core";

import { expectKeyframesRegistered } from "./expectKeyframesRegistered";

describe("expectKeyframesRegistered", () => {
	it("returns the matching at-rule when the keyframes are registered", () => {
		const s = styleframe();
		s.keyframes("fade", {
			"0%": { opacity: "0" },
			"100%": { opacity: "1" },
		});

		const rule = expectKeyframesRegistered(s, "fade");

		expect(rule.type).toBe("at-rule");
		expect(rule.identifier).toBe("keyframes");
		expect(rule.rule).toBe("fade");
	});

	it("resolves the right keyframes when several are registered", () => {
		const s = styleframe();
		s.keyframes("spin", { "100%": { transform: "rotate(360deg)" } });
		s.keyframes("pulse", { "50%": { opacity: "0.5" } });

		expect(expectKeyframesRegistered(s, "pulse").rule).toBe("pulse");
		expect(expectKeyframesRegistered(s, "spin").rule).toBe("spin");
	});

	it("fails when the named keyframes were never registered", () => {
		const s = styleframe();
		s.keyframes("fade", { "0%": { opacity: "0" } });

		expect(() => expectKeyframesRegistered(s, "missing")).toThrow();
	});
});
