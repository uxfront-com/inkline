import "virtual:styleframe.css";
import IButton from "../styled/IButton.uf.tsx";

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
const variants = ["solid", "outline", "soft", "ghost"] as const;

/**
 * An icon-only button at every size, in four variants, each one named by its hidden label.
 *
 * @category Components/Actions/Button
 */
export default function ButtonIconOnly() {
	return (
		<div style="display: flex; flex-direction: column; gap: var(--spacing--sm)">
			{sizes.map((size) => (
				<div
					key={size}
					style="display: flex; flex-wrap: wrap; align-items: center; gap: var(--spacing--xs)"
				>
					{variants.map((variant) => (
						<IButton
							key={variant}
							size={size}
							color="primary"
							variant={variant}
							iconOnly={true}
							label={`Search (${size}, ${variant})`}
						>
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
										<circle cx="11" cy="11" r="8" />
										<path d="m21 21-4.3-4.3" />
									</svg>
								),
							}}
						</IButton>
					))}
				</div>
			))}
		</div>
	);
}
