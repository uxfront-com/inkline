// A harness parent: `mount` takes props but no slots, so this fills the group with two radios.
import IRadioGroupBase from "../../../src/components/radio/headless/IRadioGroupBase.uf.tsx";

export default function RadioGroupBaseCase({ readonly = false }: { readonly?: boolean }) {
  return (
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
  );
}
