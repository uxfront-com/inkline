// A harness parent: `mount` takes props but no slots, so this fills the label with a native switch.
import ISwitchBase from "../../../src/components/switch/headless/ISwitchBase.uf.tsx";

export default function SwitchBaseCase() {
	return (
		<ISwitchBase>
			<input type="checkbox" role="switch" name="wifi" />
			Wi-Fi
		</ISwitchBase>
	);
}
