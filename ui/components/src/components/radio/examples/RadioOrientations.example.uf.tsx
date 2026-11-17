import { ref } from "@uxfront/unframework";
import "virtual:styleframe.css";
import IRadioGroup from "../styled/IRadioGroup.uf.tsx";

// Each group owns a ref for `value`, two-way bound via `v-model:value`, so a click actually
// moves the selection. Distinct `name`s keep the groups mutually independent.
/** @category Components/Forms/Radio */
export default function RadioOrientations() {
  const vertical = ref<string | undefined>("apple");
  const horizontal = ref<string | undefined>("apple");
  return (
    <div>
      <IRadioGroup
        orientation="vertical"
        name="orientation-vertical"
        v-model:value={vertical.value}
        options={[
          { value: "apple", label: "Apple" },
          { value: "banana", label: "Banana" },
          { value: "cherry", label: "Cherry" },
        ]}
      />
      <IRadioGroup
        orientation="horizontal"
        name="orientation-horizontal"
        v-model:value={horizontal.value}
        options={[
          { value: "apple", label: "Apple" },
          { value: "banana", label: "Banana" },
          { value: "cherry", label: "Cherry" },
        ]}
      />
    </div>
  );
}
