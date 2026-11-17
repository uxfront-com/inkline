// A harness parent: `mount` takes props but no slots, so this fills the row with a native radio.
import IRadioBase from "../../../src/components/radio/headless/IRadioBase.uf.tsx";

export default function RadioBaseCase() {
  return (
    <IRadioBase id="apple-row">
      <input type="radio" name="fruit" value="apple" />
      Apple
    </IRadioBase>
  );
}
