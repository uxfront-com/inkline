import { ref } from "@uxfront/unframework";

import "virtual:styleframe.css";
import IRadioGroup from "../styled/IRadioGroup.uf.tsx";

// Group-level `disabled`: the selection ("apple") stays visible but nothing can be clicked, that's
// the point of the example. The ref still backs `value` so the default selection renders.
/** @category Components/Forms/Radio */
export default function RadioDisabled() {
	const value = ref<string | undefined>("apple");
	return (
		<div>
			<IRadioGroup
				disabled={true}
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
