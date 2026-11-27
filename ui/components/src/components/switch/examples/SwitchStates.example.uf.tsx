import { ref } from "@uxfront/unframework";

import "virtual:styleframe.css";
import ISwitch from "../styled/ISwitch.uf.tsx";

// The two enabled switches are live; the disabled pair keep their seeded state (disabled controls
// don't take input) to show the off/on disabled appearance.
/** @category Components/Forms/Switch */
export default function SwitchStates() {
	const off = ref(false);
	const on = ref(true);
	const disabledOff = ref(false);
	const disabledOn = ref(true);
	return (
		<div>
			<ISwitch label="Off" v-model:checked={off.value} />
			<ISwitch label="On" v-model:checked={on.value} />
			<ISwitch label="Disabled off" disabled={true} v-model:checked={disabledOff.value} />
			<ISwitch label="Disabled on" disabled={true} v-model:checked={disabledOn.value} />
		</div>
	);
}
