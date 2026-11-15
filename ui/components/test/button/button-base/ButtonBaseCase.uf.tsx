// A harness parent: `mount` takes props but no slots, so this fills one button's slot.
import IButtonBase from "../../../src/components/button/headless/IButtonBase.uf.tsx";

export default function ButtonBaseCase() {
  return (
    <div>
      <IButtonBase label="Save" />
      <IButtonBase label="Send" type="submit" />
      <IButtonBase label="Off" disabled={true} />
      <IButtonBase label="Wait" loading={true} />
      <IButtonBase label="Overridden">Slotted</IButtonBase>
    </div>
  );
}
