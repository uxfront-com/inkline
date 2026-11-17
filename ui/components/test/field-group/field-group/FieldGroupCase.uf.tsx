// A harness parent: `mount` takes props but no slots, so this fills the group with an input and a
// button, as a design system joins them.
import IButton from "../../../src/components/button/styled/IButton.uf.tsx";
import IFieldGroup from "../../../src/components/field-group/styled/IFieldGroup.uf.tsx";
import type { FieldGroupProps } from "../../../src/components/field-group/types.ts";
import IInput from "../../../src/components/input/styled/IInput.uf.tsx";

export default function FieldGroupCase({ orientation, block }: Omit<FieldGroupProps, "id">) {
  return (
    <IFieldGroup id="search" orientation={orientation} block={block}>
      <IInput name="query" placeholder="Search" />
      <IButton label="Search" color="primary" />
    </IFieldGroup>
  );
}
