// A harness parent: `mount` takes props but no slots, so this fills one badge's slot.
import IBadgeBase from "../../../src/components/badge/headless/IBadgeBase.uf.tsx";

export default function BadgeBaseCase() {
	return (
		<div>
			<IBadgeBase label="From the prop" />
			<IBadgeBase label="Overridden">From the slot</IBadgeBase>
		</div>
	);
}
