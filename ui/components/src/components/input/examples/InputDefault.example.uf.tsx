import "virtual:styleframe.css";
import IInput from "../styled/IInput.uf.tsx";

// The story's Default variant renders the prefix and suffix showcase.
/** @category Components/Forms/Input */
export default function InputDefault() {
  return (
    <div>
      <IInput color="light" size="md" name="amount" type="text" placeholder="0.00">
        {{
          prefix: () => <>$</>,
          suffix: () => <>USD</>,
        }}
      </IInput>
    </div>
  );
}
