// A harness parent: `mount` takes props but no slots, so this fills the addon with its text.
import IInputSuffixBase from "../../../src/components/input/headless/IInputSuffixBase.uf.tsx";

export default function InputAffixSuffixCase() {
  return (
    <div>
      <IInputSuffixBase>USD</IInputSuffixBase>
    </div>
  );
}
