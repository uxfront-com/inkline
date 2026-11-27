// A harness parent: it binds the control's `value` model to its own state, shows that state, and
// emits `input` whenever the model writes it. With `attributes`, it renders a control that
// takes the declared props, and emits `focus` and `blur` whenever the control does.
import { defineEmits, ref, watch } from "@uxfront/unframework";

import IInputControlBase from "../../../src/components/input/headless/IInputControlBase.uf.tsx";

export default function InputControlCase({
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
	const emit = defineEmits<{ input: [value: string]; focus: []; blur: [] }>();
	const value = ref(initial);
	watch(
		() => value.value,
		(current) => emit("input", current),
	);

	return (
		<>
			{attributes ? (
				<div>
					<IInputControlBase
						type="email"
						required={true}
						autocomplete="email"
						ariaLabel="Email"
						ariaDescribedby="email-hint"
						onFocus={() => emit("focus")}
						onBlur={() => emit("blur")}
					/>
					<p id="email-hint">We never share it.</p>
				</div>
			) : (
				<div>
					<label>
						Name
						<IInputControlBase
							id="name"
							name="name"
							placeholder="Your name"
							disabled={disabled}
							readonly={readonly}
							v-model:value={value.value}
						/>
					</label>
					<IInputControlBase type="email" placeholder="Email" />
					<output>{value.value}</output>
				</div>
			)}
		</>
	);
}
