import "virtual:styleframe.css";
import IButton from "../styled/IButton.uf.tsx";

/**
 * Each size, with a leading icon, and icon-only.
 *
 * @category Components/Actions/Button
 */
export default function ButtonSizes() {
	return (
		<div style="display: flex; flex-direction: column; gap: var(--spacing--sm)">
			<div style="display: flex; flex-wrap: wrap; align-items: center; gap: var(--spacing--xs)">
				<IButton size="xs" color="primary" variant="soft" label="Add xs">
					{{
						leading: () => (
							<svg
								viewBox="0 0 24 24"
								width="1em"
								height="1em"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path d="M5 12h14" />
								<path d="M12 5v14" />
							</svg>
						),
					}}
				</IButton>
				<IButton size="sm" color="primary" variant="soft" label="Add sm">
					{{
						leading: () => (
							<svg
								viewBox="0 0 24 24"
								width="1em"
								height="1em"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path d="M5 12h14" />
								<path d="M12 5v14" />
							</svg>
						),
					}}
				</IButton>
				<IButton size="md" color="primary" variant="soft" label="Add md">
					{{
						leading: () => (
							<svg
								viewBox="0 0 24 24"
								width="1em"
								height="1em"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path d="M5 12h14" />
								<path d="M12 5v14" />
							</svg>
						),
					}}
				</IButton>
				<IButton size="lg" color="primary" variant="soft" label="Add lg">
					{{
						leading: () => (
							<svg
								viewBox="0 0 24 24"
								width="1em"
								height="1em"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path d="M5 12h14" />
								<path d="M12 5v14" />
							</svg>
						),
					}}
				</IButton>
				<IButton size="xl" color="primary" variant="soft" label="Add xl">
					{{
						leading: () => (
							<svg
								viewBox="0 0 24 24"
								width="1em"
								height="1em"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path d="M5 12h14" />
								<path d="M12 5v14" />
							</svg>
						),
					}}
				</IButton>
			</div>
			<div style="display: flex; flex-wrap: wrap; align-items: center; gap: var(--spacing--xs)">
				<IButton size="xs" variant="outline" iconOnly={true} label="Settings (xs)">
					{{
						leading: () => (
							<svg
								viewBox="0 0 24 24"
								width="1em"
								height="1em"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path d="M20 7h-9" />
								<path d="M14 17H5" />
								<circle cx="17" cy="17" r="3" />
								<circle cx="7" cy="7" r="3" />
							</svg>
						),
					}}
				</IButton>
				<IButton size="sm" variant="outline" iconOnly={true} label="Settings (sm)">
					{{
						leading: () => (
							<svg
								viewBox="0 0 24 24"
								width="1em"
								height="1em"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path d="M20 7h-9" />
								<path d="M14 17H5" />
								<circle cx="17" cy="17" r="3" />
								<circle cx="7" cy="7" r="3" />
							</svg>
						),
					}}
				</IButton>
				<IButton size="md" variant="outline" iconOnly={true} label="Settings (md)">
					{{
						leading: () => (
							<svg
								viewBox="0 0 24 24"
								width="1em"
								height="1em"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path d="M20 7h-9" />
								<path d="M14 17H5" />
								<circle cx="17" cy="17" r="3" />
								<circle cx="7" cy="7" r="3" />
							</svg>
						),
					}}
				</IButton>
				<IButton size="lg" variant="outline" iconOnly={true} label="Settings (lg)">
					{{
						leading: () => (
							<svg
								viewBox="0 0 24 24"
								width="1em"
								height="1em"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path d="M20 7h-9" />
								<path d="M14 17H5" />
								<circle cx="17" cy="17" r="3" />
								<circle cx="7" cy="7" r="3" />
							</svg>
						),
					}}
				</IButton>
				<IButton size="xl" variant="outline" iconOnly={true} label="Settings (xl)">
					{{
						leading: () => (
							<svg
								viewBox="0 0 24 24"
								width="1em"
								height="1em"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path d="M20 7h-9" />
								<path d="M14 17H5" />
								<circle cx="17" cy="17" r="3" />
								<circle cx="7" cy="7" r="3" />
							</svg>
						),
					}}
				</IButton>
			</div>
		</div>
	);
}
