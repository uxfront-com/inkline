// A harness parent: it binds the group's `value` model to its own state, shows that state, and emits
// `change` whenever the model writes it. With `attributes`, it renders a group described by the
// declared prop. With `none`, it renders a second group, which nothing binds, whose options include
// one with an empty value, beside the bound group, which gains the same option.
import { defineEmits, ref, watch } from "@uxfront/unframework";

import IRadioGroup from "../../../src/components/radio/styled/IRadioGroup.uf.tsx";

export default function RadioGroupCase({
	initial = "apple",
	readonly = false,
	disabled = false,
	attributes = false,
	none = false,
}: {
	initial?: string;
	readonly?: boolean;
	disabled?: boolean;
	attributes?: boolean;
	none?: boolean;
}) {
	const emit = defineEmits<{ change: [value: string | undefined] }>();
	const value = ref<string | undefined>(initial);
	watch(
		() => value.value,
		(current) => emit("change", current),
	);

	return (
		<div>
			<IRadioGroup
				id="fruit"
				label="Fruit"
				name="fruit"
				color="dark"
				size="lg"
				orientation="horizontal"
				readonly={readonly}
				disabled={disabled}
				ariaDescribedby={attributes ? "fruit-hint" : undefined}
				options={[
					{ value: "apple", label: "Apple" },
					{ value: "pear", label: "Pear" },
					{ value: "plum", label: "Plum", disabled: true },
					{ value: "fig" },
					...(none ? [{ value: "", label: "None" }] : []),
				]}
				v-model:value={value.value}
			/>
			{none && (
				<IRadioGroup
					id="veg"
					label="Vegetable"
					name="veg"
					options={[
						{ value: "leek", label: "Leek" },
						{ value: "", label: "No vegetable" },
					]}
				/>
			)}
			{attributes ? <p id="fruit-hint">Pick one.</p> : null}
			<output>{value.value}</output>
		</div>
	);
}
