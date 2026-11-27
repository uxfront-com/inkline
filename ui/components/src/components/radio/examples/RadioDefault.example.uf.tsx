import { ref } from "@uxfront/unframework";

import "virtual:styleframe.css";
import IRadioGroup from "../styled/IRadioGroup.uf.tsx";

// The group owns a ref for `value`, two-way bound via `v-model:value`, so a click actually
// moves the selection. It defaults to "apple" so one option is selected on load.
/** @category Components/Forms/Radio */
export default function RadioDefault() {
	const value = ref<string | undefined>("apple");
	return (
		<div>
			<IRadioGroup
				name="fruit"
				v-model:value={value.value}
				options={[
					{ value: "apple", label: "Apple" },
					{ value: "banana", label: "Banana" },
					{ value: "cherry", label: "Cherry" },
				]}
			/>
		</div>
	);
}
