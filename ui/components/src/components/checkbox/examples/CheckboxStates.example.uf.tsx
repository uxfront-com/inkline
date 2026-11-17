import { ref } from "@uxfront/unframework";
import "virtual:styleframe.css";
import ICheckbox from "../styled/ICheckbox.uf.tsx";

// Every state a server render can show, at a glance. The enabled boxes are live, and the disabled pair
// keep their seeded state, since disabled boxes take no input. Each box binds its value to a ref, so
// the seeded state renders the same on all seven targets. The story's mixed box is left out:
// `indeterminate` is a DOM property that only client code sets, so Astro can't show it, and the
// browser tests in `test/checkbox` cover it instead.
export default function CheckboxStates() {
  const unchecked = ref(false);
  const checked = ref(true);
  const disabledOff = ref(false);
  const disabledOn = ref(true);
  return (
    <div>
      <ICheckbox label="Unchecked" v-model:checked={unchecked.value} />
      <ICheckbox label="Checked" v-model:checked={checked.value} />
      <ICheckbox label="Disabled" disabled={true} v-model:checked={disabledOff.value} />
      <ICheckbox label="Checked disabled" disabled={true} v-model:checked={disabledOn.value} />
    </div>
  );
}
