import { ref } from "@uxfront/unframework";

import "virtual:styleframe.css";
import IRadioGroup from "../styled/IRadioGroup.uf.tsx";

// Each group owns a ref for `value`, two-way bound via `v-model:value`, so a click actually
// moves the selection. Distinct `name`s keep the groups mutually independent.
/** @category Components/Forms/Radio */
export default function RadioSizes() {
	const sm = ref<string | undefined>("apple");
	const md = ref<string | undefined>("apple");
	const lg = ref<string | undefined>("apple");
	return (
		<div>
			<IRadioGroup
				size="sm"
				name="size-sm"
				v-model:value={sm.value}
				options={[
					{ value: "apple", label: "Apple" },
					{ value: "banana", label: "Banana" },
					{ value: "cherry", label: "Cherry" },
				]}
			/>
			<IRadioGroup
				size="md"
				name="size-md"
				v-model:value={md.value}
				options={[
					{ value: "apple", label: "Apple" },
					{ value: "banana", label: "Banana" },
					{ value: "cherry", label: "Cherry" },
				]}
			/>
			<IRadioGroup
				size="lg"
				name="size-lg"
				v-model:value={lg.value}
				options={[
					{ value: "apple", label: "Apple" },
					{ value: "banana", label: "Banana" },
					{ value: "cherry", label: "Cherry" },
				]}
			/>
		</div>
	);
}
