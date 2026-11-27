import "virtual:styleframe.css";
import IButton from "../styled/IButton.uf.tsx";

/**
 * A long German label in a narrow column, and an Arabic label right to left, its arrow pointing the way it reads.
 *
 * @category Components/Actions/Button
 */
export default function ButtonLanguages() {
	return (
		<div style="display: flex; flex-direction: column; gap: var(--spacing--sm)">
			<div lang="de" style="width: 10rem">
				<IButton color="primary" label="Alle Änderungen speichern" />
			</div>
			<div dir="rtl" lang="ar">
				<IButton variant="outline" label="متابعة">
					{{
						trailing: () => (
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
								<path d="M19 12H5" />
								<path d="m12 19-7-7 7-7" />
							</svg>
						),
					}}
				</IButton>
			</div>
		</div>
	);
}
