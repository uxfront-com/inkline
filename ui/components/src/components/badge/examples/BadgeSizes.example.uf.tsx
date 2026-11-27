import "virtual:styleframe.css";
import IBadge from "../styled/IBadge.uf.tsx";

/** @category Components/Feedback/Badge */
export default function BadgeSizes() {
	return (
		<div>
			<IBadge size="xs">Extra Small</IBadge>
			<IBadge size="sm">Small</IBadge>
			<IBadge size="md">Medium</IBadge>
			<IBadge size="lg">Large</IBadge>
			<IBadge size="xl">Extra Large</IBadge>
		</div>
	);
}
