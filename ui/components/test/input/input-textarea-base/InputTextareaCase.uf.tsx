// A harness parent: it binds the control's `value` model to its own state, shows that state, and
// emits `input` whenever the model writes it. With `attributes`, it renders a control that
// takes the declared props, and emits `focus` and `blur` whenever the control does.
import { defineEmits, ref, watch } from "@uxfront/unframework";

import IInputTextareaBase from "../../../src/components/input/headless/IInputTextareaBase.uf.tsx";

export default function InputTextareaCase({
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
          <IInputTextareaBase
            required={true}
            autocomplete="off"
            ariaLabel="Bio"
            ariaDescribedby="bio-hint"
            onFocus={() => emit("focus")}
            onBlur={() => emit("blur")}
          />
          <p id="bio-hint">A line or two.</p>
        </div>
      ) : (
        <div>
          <label>
            Name
            <IInputTextareaBase
              id="name"
              name="name"
              placeholder="Your name"
              disabled={disabled}
              readonly={readonly}
              v-model:value={value.value}
            />
          </label>
          <output>{value.value}</output>
        </div>
      )}
    </>
  );
}
