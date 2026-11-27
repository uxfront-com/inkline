import { ref } from "@uxfront/unframework";

import "virtual:styleframe.css";
import ICheckbox from "../styled/ICheckbox.uf.tsx";

// Two-way binding: toggling the box updates `agreed`, reflected live below.
/** @category Components/Forms/Checkbox */
export default function CheckboxTwoWay() {
	const agreed = ref(false);
	return (
		<div>
			<ICheckbox name="terms" label="I accept the terms" v-model:checked={agreed.value} />
			<p>{agreed.value ? "Thanks for accepting!" : "Please accept to continue."}</p>
		</div>
	);
}
