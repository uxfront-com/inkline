import { ref } from "@uxfront/unframework";

import "virtual:styleframe.css";
import IHamburgerMenu from "../styled/IHamburgerMenu.uf.tsx";

// The full disclosure pattern: clicking the toggle flips `open` (morphing the icon) and shows/hides
// the navigation it controls, linked via `aria-controls`.
/** @category Components/Navigation/HamburgerMenu */
export default function HamburgerMenuToggle() {
	const open = ref(false);
	return (
		<div>
			<IHamburgerMenu
				ariaControls="primary-nav"
				ariaLabel="Toggle navigation"
				v-model:open={open.value}
			/>
			{open.value ? (
				<nav id="primary-nav">
					<a href="#home">Home</a>
					<a href="#about">About</a>
					<a href="#contact">Contact</a>
				</nav>
			) : null}
		</div>
	);
}
