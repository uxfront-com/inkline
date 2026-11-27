import "virtual:styleframe.css";
import IButton from "../../button/styled/IButton.uf.tsx";
import IFieldGroup from "../styled/IFieldGroup.uf.tsx";

// A vertical group stacks its direct children, collapsing the seams between them.
/** @category Components/Forms/FieldGroup */
export default function FieldGroupVertical() {
	return (
		<div>
			<IFieldGroup orientation="vertical">
				<IButton label="Top" />
				<IButton label="Middle" />
				<IButton label="Bottom" />
			</IFieldGroup>
		</div>
	);
}
