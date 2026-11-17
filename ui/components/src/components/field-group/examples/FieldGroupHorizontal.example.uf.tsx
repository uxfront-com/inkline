import "virtual:styleframe.css";
import IFieldGroup from "../styled/IFieldGroup.uf.tsx";
import IInput from "../../input/styled/IInput.uf.tsx";
import IButton from "../../button/styled/IButton.uf.tsx";

// Join a control and a button into one unit by making them direct children of the field group, the
// supported replacement for the Input's removed prepend/append addons.
/** @category Components/Forms/FieldGroup */
export default function FieldGroupHorizontal() {
  return (
    <div>
      <IFieldGroup orientation="horizontal">
        <IInput name="search" type="text" placeholder="Search" />
        <IButton label="Search" color="primary" />
      </IFieldGroup>
    </div>
  );
}
