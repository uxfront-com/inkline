// A harness parent: `mount` takes props but no slots, so this fills the group with two controls.
import IFieldGroupBase from "../../../src/components/field-group/headless/IFieldGroupBase.uf.tsx";

export default function FieldGroupBaseCase() {
	return (
		<IFieldGroupBase id="search">
			<input aria-label="Query" />
			<button type="button">Search</button>
		</IFieldGroupBase>
	);
}
