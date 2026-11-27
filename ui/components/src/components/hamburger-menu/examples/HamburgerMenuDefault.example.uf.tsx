import { ref } from "@uxfront/unframework";

import "virtual:styleframe.css";
import IHamburgerMenu from "../styled/IHamburgerMenu.uf.tsx";

/** @category Components/Navigation/HamburgerMenu */
export default function HamburgerMenuDefault() {
	const open = ref(false);
	return (
		<div>
			<IHamburgerMenu ariaLabel="Toggle menu" v-model:open={open.value} />
		</div>
	);
}
