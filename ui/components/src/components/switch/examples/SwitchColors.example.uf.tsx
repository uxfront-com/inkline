import { ref } from "@uxfront/unframework";

import "virtual:styleframe.css";
import ISwitch from "../styled/ISwitch.uf.tsx";

// Each colour switch is live and seeded off so its off-state track colour shows; toggle any of them
// and the bound ref flips.
/** @category Components/Forms/Switch */
export default function SwitchColors() {
	const light = ref(false);
	const dark = ref(false);
	const neutral = ref(false);
	return (
		<div>
			<ISwitch color="light" label="Light" v-model:checked={light.value} />
			<ISwitch color="dark" label="Dark" v-model:checked={dark.value} />
			<ISwitch color="neutral" label="Neutral" v-model:checked={neutral.value} />
		</div>
	);
}
