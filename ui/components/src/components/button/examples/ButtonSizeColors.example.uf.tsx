import "virtual:styleframe.css";
import IButton from "../styled/IButton.uf.tsx";

/**
 * Each size in each semantic colour, one row per size.
 *
 * @category Components/Actions/Button
 */
export default function ButtonSizeColors() {
	return (
		<div style="display: flex; flex-direction: column; gap: var(--spacing--sm)">
			<div style="display: flex; flex-wrap: wrap; align-items: center; gap: var(--spacing--xs)">
				<IButton size="xs" color="primary" label="Primary" />
				<IButton size="xs" color="secondary" label="Secondary" />
				<IButton size="xs" color="success" label="Success" />
				<IButton size="xs" color="info" label="Info" />
				<IButton size="xs" color="warning" label="Warning" />
				<IButton size="xs" color="error" label="Error" />
			</div>
			<div style="display: flex; flex-wrap: wrap; align-items: center; gap: var(--spacing--xs)">
				<IButton size="sm" color="primary" label="Primary" />
				<IButton size="sm" color="secondary" label="Secondary" />
				<IButton size="sm" color="success" label="Success" />
				<IButton size="sm" color="info" label="Info" />
				<IButton size="sm" color="warning" label="Warning" />
				<IButton size="sm" color="error" label="Error" />
			</div>
			<div style="display: flex; flex-wrap: wrap; align-items: center; gap: var(--spacing--xs)">
				<IButton size="md" color="primary" label="Primary" />
				<IButton size="md" color="secondary" label="Secondary" />
				<IButton size="md" color="success" label="Success" />
				<IButton size="md" color="info" label="Info" />
				<IButton size="md" color="warning" label="Warning" />
				<IButton size="md" color="error" label="Error" />
			</div>
			<div style="display: flex; flex-wrap: wrap; align-items: center; gap: var(--spacing--xs)">
				<IButton size="lg" color="primary" label="Primary" />
				<IButton size="lg" color="secondary" label="Secondary" />
				<IButton size="lg" color="success" label="Success" />
				<IButton size="lg" color="info" label="Info" />
				<IButton size="lg" color="warning" label="Warning" />
				<IButton size="lg" color="error" label="Error" />
			</div>
			<div style="display: flex; flex-wrap: wrap; align-items: center; gap: var(--spacing--xs)">
				<IButton size="xl" color="primary" label="Primary" />
				<IButton size="xl" color="secondary" label="Secondary" />
				<IButton size="xl" color="success" label="Success" />
				<IButton size="xl" color="info" label="Info" />
				<IButton size="xl" color="warning" label="Warning" />
				<IButton size="xl" color="error" label="Error" />
			</div>
		</div>
	);
}
