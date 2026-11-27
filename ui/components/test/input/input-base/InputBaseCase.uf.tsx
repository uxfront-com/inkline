// A harness parent: `mount` takes props but no slots, so this fills the shell with a control.
import IInputBase from "../../../src/components/input/headless/IInputBase.uf.tsx";

export default function InputBaseCase() {
	return (
		<IInputBase id="amount">
			<input aria-label="Amount" />
		</IInputBase>
	);
}
