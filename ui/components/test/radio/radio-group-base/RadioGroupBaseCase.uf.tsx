// A harness parent: `mount` takes props but no slots, so this fills the group with two radios. With
// `attributes`, the group is described by the declared prop. With `fields`, the group holds three
// `IRadioFieldBase` radios bound to the parent's selection, which it shows, and emits `change`
// whenever a radio writes it, so a spec can tell a write from no write.
import { defineEmits, ref, watch } from "@uxfront/unframework";

import IRadioFieldBase from "../../../src/components/radio/headless/IRadioFieldBase.uf.tsx";
import IRadioGroupBase from "../../../src/components/radio/headless/IRadioGroupBase.uf.tsx";

export default function RadioGroupBaseCase({
  readonly = false,
  attributes = false,
  fields = false,
}: {
  readonly?: boolean;
  attributes?: boolean;
  fields?: boolean;
}) {
  const emit = defineEmits<{ change: [value: string | undefined] }>();
  const selected = ref<string | undefined>("apple");
  watch(
    () => selected.value,
    (value) => emit("change", value),
  );

  return (
    <>
      {fields ? (
        <div>
          <IRadioGroupBase id="fruit" label="Fruit" readonly={readonly}>
            <label>
              <IRadioFieldBase
                name="fruit"
                value="apple"
                readonly={readonly}
                v-model:selected={selected.value}
              />
              Apple
            </label>
            <label>
              <IRadioFieldBase
                name="fruit"
                value="pear"
                readonly={readonly}
                v-model:selected={selected.value}
              />
              Pear
            </label>
            <label>
              <IRadioFieldBase
                name="fruit"
                value="fig"
                readonly={readonly}
                v-model:selected={selected.value}
              />
              Fig
            </label>
          </IRadioGroupBase>
          <output>{selected.value}</output>
        </div>
      ) : attributes ? (
        <div>
          <IRadioGroupBase id="fruit" label="Fruit" ariaDescribedby="fruit-hint">
            <label>
              <input type="radio" name="fruit" value="apple" />
              Apple
            </label>
            <label>
              <input type="radio" name="fruit" value="pear" />
              Pear
            </label>
          </IRadioGroupBase>
          <p id="fruit-hint">Pick one.</p>
        </div>
      ) : (
        <IRadioGroupBase id="fruit" label="Fruit" readonly={readonly}>
          <label>
            <input type="radio" name="fruit" value="apple" />
            Apple
          </label>
          <label>
            <input type="radio" name="fruit" value="pear" />
            Pear
          </label>
        </IRadioGroupBase>
      )}
    </>
  );
}
