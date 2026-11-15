import { ref } from "@uxfront/unframework";
import "virtual:styleframe.css";
import ICheckbox from "../styled/ICheckbox.uf.tsx";

// Each box owns its own ref via `v-model:checked`, so every one toggles independently.
export default function CheckboxSizes() {
  const small = ref(true);
  const medium = ref(true);
  const large = ref(true);
  return (
    <div>
      <ICheckbox size="sm" label="Small" v-model:checked={small.value} />
      <ICheckbox size="md" label="Medium" v-model:checked={medium.value} />
      <ICheckbox size="lg" label="Large" v-model:checked={large.value} />
    </div>
  );
}
