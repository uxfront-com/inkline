import "virtual:styleframe.css";
import IInput from "../styled/IInput.uf.tsx";

/** @category Components/Forms/Input */
export default function InputPrefixSuffix() {
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
