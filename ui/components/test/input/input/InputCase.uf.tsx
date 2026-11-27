// A harness parent: it binds the control's `value` model to its own state, shows that state, and
// emits `input` whenever the model writes it. With `attributes`, it renders a text field and a
// textarea that take the declared props, and emits `focus` and `blur` with the field's id whenever
// either control does.
import { defineEmits, ref, watch } from "@uxfront/unframework";

import IInput from "../../../src/components/input/styled/IInput.uf.tsx";

export default function InputCase({
	initial = "",
	disabled = false,
	readonly = false,
	attributes = false,
}: {
	initial?: string;
	disabled?: boolean;
	readonly?: boolean;
	attributes?: boolean;
}) {
	const emit = defineEmits<{
		input: [value: string];
		focus: [field: string];
		blur: [field: string];
	}>();
	const value = ref(initial);
	watch(
		() => value.value,
		(current) => emit("input", current),
	);

	return (
		<>
			{attributes ? (
				<div>
					<IInput
						type="email"
						required={true}
						autocomplete="email"
						ariaLabel="Email"
						ariaDescribedby="email-hint"
						onFocus={() => emit("focus", "email")}
						onBlur={() => emit("blur", "email")}
					/>
					<IInput
						type="textarea"
						required={true}
						autocomplete="off"
						ariaLabel="Bio"
						ariaDescribedby="bio-hint"
						onFocus={() => emit("focus", "bio")}
						onBlur={() => emit("blur", "bio")}
					/>
					<p id="email-hint">We never share it.</p>
					<p id="bio-hint">A line or two.</p>
				</div>
			) : (
				<div>
					<label>
						Name
						<IInput
							id="name"
							name="name"
							color="dark"
							size="lg"
							invalid={false}
							disabled={disabled}
							readonly={readonly}
							v-model:value={value.value}
						>
							{{
								prefix: () => <>@</>,
								suffix: () => <>.dev</>,
							}}
						</IInput>
					</label>
					<IInput type="textarea" placeholder="Bio" />
					<output>{value.value}</output>
				</div>
			)}
		</>
	);
}
