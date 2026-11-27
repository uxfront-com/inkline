import { defineModel, onMounted, ref, useTemplateRef, watch } from "@uxfront/unframework";

import type { CheckboxControlBaseProps } from "../types.ts";

// The native `<input type="checkbox">` control. `checked` is a model, so a parent can bind it.
//
// `indeterminate` is a DOM property with no attribute, so the component sets it on the element once
// it's mounted, and again whenever the prop changes. It
// drives the recipe's `:indeterminate` box and the element's implicit `aria-checked="mixed"`.
//
// A checkbox ignores the HTML `readonly` attribute, so read-only is `aria-readonly`, and the click
// handler cancels the click while the element carries it. A click that's cancelled toggles nothing
// and fires no `change`. The handler reads only the element, so Qwik can run it synchronously,
// before the browser toggles the box. React fires its `change` from the click itself, though, before
// the click is cancelled, so the box binds a local `state`, which writes the model only while the
// control isn't read-only, and goes back to the model's value otherwise. It writes the model only
// when the two differ, so a parent's own change, which the first watcher copies into `state`, doesn't
// come back to the parent as a change the control made.
export default function ICheckboxControlBase({
	id,
	name,
	disabled = false,
	required = false,
	readonly = false,
	indeterminate = false,
	ariaLabel,
	ariaDescribedby,
}: CheckboxControlBaseProps) {
	const checked = defineModel<boolean>("checked", { default: false });
	const state = ref(checked.value);
	const control = useTemplateRef<HTMLInputElement>();

	watch(
		() => checked.value,
		(value) => {
			state.value = value;
		},
	);
	watch(
		() => state.value,
		(value) => {
			if (readonly) state.value = checked.value;
			else if (value !== checked.value) checked.value = value;
		},
	);

	onMounted(() => {
		if (control.value) control.value.indeterminate = indeterminate;
	});
	watch(
		() => indeterminate,
		(value) => {
			if (control.value) control.value.indeterminate = value;
		},
		{ flush: "post" },
	);

	return (
		<input
			ref={control}
			type="checkbox"
			id={id}
			name={name}
			v-model={state.value}
			disabled={disabled}
			required={required}
			aria-readonly={readonly ? "true" : undefined}
			aria-label={ariaLabel}
			aria-describedby={ariaDescribedby}
			onClick={(event: MouseEvent) => {
				if ((event.currentTarget as HTMLElement).getAttribute("aria-readonly") === "true") {
					event.preventDefault();
				}
			}}
		/>
	);
}
