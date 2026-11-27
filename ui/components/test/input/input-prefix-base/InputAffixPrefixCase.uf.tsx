// A harness parent: `mount` takes props but no slots, so this fills the addon with its text.
import IInputPrefixBase from "../../../src/components/input/headless/IInputPrefixBase.uf.tsx";

export default function InputAffixPrefixCase() {
	return (
		<div>
			<IInputPrefixBase>$</IInputPrefixBase>
		</div>
	);
}
