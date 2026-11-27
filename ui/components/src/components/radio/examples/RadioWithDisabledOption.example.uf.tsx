import { ref } from "@uxfront/unframework";

import "virtual:styleframe.css";
import IRadioGroup from "../styled/IRadioGroup.uf.tsx";

// One option is disabled at the option level while the group stays interactive: the enabled options
// ("apple", "cherry") are clickable, "banana" isn't. The ref defaults to "apple".
/** @category Components/Forms/Radio */
export default function RadioWithDisabledOption() {
	const value = ref<string | undefined>("apple");
	return (
		<div>
			<IRadioGroup
				name="fruit"
				v-model:value={value.value}
				options={[
					{ value: "apple", label: "Apple" },
					{ value: "banana", label: "Banana", disabled: true },
					{ value: "cherry", label: "Cherry" },
				]}
			/>
		</div>
	);
}
