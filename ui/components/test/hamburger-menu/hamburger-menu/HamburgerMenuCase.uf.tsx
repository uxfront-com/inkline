// A harness parent: it binds the toggle's `open` model to its own state, shows the menu it controls
// while open, and emits `toggle` whenever the model writes it.
import { defineEmits, ref, watch } from "@uxfront/unframework";

import IHamburgerMenu from "../../../src/components/hamburger-menu/styled/IHamburgerMenu.uf.tsx";

export default function HamburgerMenuCase({
	initial = false,
	disabled = false,
	ariaLabel,
}: {
	initial?: boolean;
	disabled?: boolean;
	ariaLabel?: string;
}) {
	const emit = defineEmits<{ toggle: [open: boolean] }>();
	const open = ref(initial);
	watch(
		() => open.value,
		(value) => emit("toggle", value),
	);

	return (
		<div>
			<IHamburgerMenu
				ariaControls="menu"
				ariaLabel={ariaLabel}
				disabled={disabled}
				color="dark"
				size="lg"
				animation="arrow-up"
				v-model:open={open.value}
			/>
			{open.value ? (
				<nav id="menu" aria-label="Main">
					<a href="#home">Home</a>
				</nav>
			) : null}
		</div>
	);
}
