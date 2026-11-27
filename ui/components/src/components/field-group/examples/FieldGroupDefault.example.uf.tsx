import "virtual:styleframe.css";
import IButton from "../../button/styled/IButton.uf.tsx";
import IInput from "../../input/styled/IInput.uf.tsx";
import IFieldGroup from "../styled/IFieldGroup.uf.tsx";

// The story's Default variant renders the horizontal group, with the recipe's default orientation.
/** @category Components/Forms/FieldGroup */
export default function FieldGroupDefault() {
	return (
		<div>
			<IFieldGroup>
				<IInput name="search" type="text" placeholder="Search" />
				<IButton label="Search" color="primary" />
			</IFieldGroup>
		</div>
	);
}
