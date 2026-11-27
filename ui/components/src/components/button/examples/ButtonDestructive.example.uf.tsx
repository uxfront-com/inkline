import "virtual:styleframe.css";
import IButton from "../styled/IButton.uf.tsx";

/**
 * A destructive action in the error colour, with a label that names what it deletes.
 *
 * @category Components/Actions/Button
 */
export default function ButtonDestructive() {
	return (
		<div style="display: flex; flex-wrap: wrap; align-items: center; gap: var(--spacing--xs)">
			<IButton variant="outline" label="Keep project" />
			<IButton color="error" label="Delete project" />
		</div>
	);
}
