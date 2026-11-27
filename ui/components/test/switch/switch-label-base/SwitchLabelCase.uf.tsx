// A harness parent: `mount` takes props but no slots, so this fills the label's text.
import ISwitchLabelBase from "../../../src/components/switch/headless/ISwitchLabelBase.uf.tsx";

export default function SwitchLabelCase() {
	return (
		<label>
			<input type="checkbox" role="switch" />
			<ISwitchLabelBase>Dark mode</ISwitchLabelBase>
		</label>
	);
}
