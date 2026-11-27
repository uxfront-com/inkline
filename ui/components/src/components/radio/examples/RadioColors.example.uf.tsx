import { ref } from "@uxfront/unframework";

import "virtual:styleframe.css";
import IRadioGroup from "../styled/IRadioGroup.uf.tsx";

// Each group owns a ref for `value`, two-way bound via `v-model:value`, so a click actually
// moves the selection. Distinct `name`s keep the groups mutually independent.
/** @category Components/Forms/Radio */
export default function RadioColors() {
	const light = ref<string | undefined>("apple");
	const dark = ref<string | undefined>("apple");
	const neutral = ref<string | undefined>("apple");
	return (
		<div>
			<IRadioGroup
				color="light"
				name="color-light"
				v-model:value={light.value}
				options={[
					{ value: "apple", label: "Apple" },
					{ value: "banana", label: "Banana" },
					{ value: "cherry", label: "Cherry" },
				]}
			/>
			<IRadioGroup
				color="dark"
				name="color-dark"
				v-model:value={dark.value}
				options={[
					{ value: "apple", label: "Apple" },
					{ value: "banana", label: "Banana" },
					{ value: "cherry", label: "Cherry" },
				]}
			/>
			<IRadioGroup
				color="neutral"
				name="color-neutral"
				v-model:value={neutral.value}
				options={[
					{ value: "apple", label: "Apple" },
					{ value: "banana", label: "Banana" },
					{ value: "cherry", label: "Cherry" },
				]}
			/>
		</div>
	);
}
