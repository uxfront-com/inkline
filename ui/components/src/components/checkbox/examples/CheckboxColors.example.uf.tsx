import { ref } from "@uxfront/unframework";

import "virtual:styleframe.css";
import ICheckbox from "../styled/ICheckbox.uf.tsx";

// Each box owns its own ref via `v-model:checked`, so every one toggles independently.
/** @category Components/Forms/Checkbox */
export default function CheckboxColors() {
	const light = ref(true);
	const dark = ref(true);
	const neutral = ref(true);
	return (
		<div>
			<ICheckbox color="light" label="Light" v-model:checked={light.value} />
			<ICheckbox color="dark" label="Dark" v-model:checked={dark.value} />
			<ICheckbox color="neutral" label="Neutral" v-model:checked={neutral.value} />
		</div>
	);
}
