// A harness parent: `mount` takes props but no slots, so this fills the label with a native box.
import ICheckboxBase from "../../../src/components/checkbox/headless/ICheckboxBase.uf.tsx";

export default function CheckboxBaseCase() {
  return (
    <ICheckboxBase>
      <input type="checkbox" name="terms" />
      Accept the terms
    </ICheckboxBase>
  );
}
