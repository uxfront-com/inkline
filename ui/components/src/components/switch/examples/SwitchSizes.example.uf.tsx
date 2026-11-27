import { ref } from "@uxfront/unframework";

import "virtual:styleframe.css";
import ISwitch from "../styled/ISwitch.uf.tsx";

// Each size switch is live via `v-model:checked`; toggle any of them and the bound ref flips.
/** @category Components/Forms/Switch */
export default function SwitchSizes() {
	const sm = ref(false);
	const md = ref(false);
	const lg = ref(false);
	return (
		<div>
			<ISwitch size="sm" label="Small" v-model:checked={sm.value} />
			<ISwitch size="md" label="Medium" v-model:checked={md.value} />
			<ISwitch size="lg" label="Large" v-model:checked={lg.value} />
		</div>
	);
}
