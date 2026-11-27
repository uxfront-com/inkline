import "virtual:styleframe.css";
import IButton from "../styled/IButton.uf.tsx";

/** @category Components/Actions/Button */
export default function ButtonBlock() {
	return (
		<div>
			<IButton label="Button" block={true} />
		</div>
	);
}
