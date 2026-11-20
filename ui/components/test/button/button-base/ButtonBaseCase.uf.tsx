// A harness parent: `mount` takes props but no slots, so this fills the buttons' slots. With
// `attributes`, it renders buttons that take the declared id, accessible name and description, and
// emits `click` with the button's id whenever one of them does. With `loading`, it renders a loading
// button with a leading and a trailing part beside an idle one.
import { defineEmits } from "@uxfront/unframework";

import IButtonBase from "../../../src/components/button/headless/IButtonBase.uf.tsx";

export default function ButtonBaseCase({
  attributes = false,
  loading = false,
}: {
  attributes?: boolean;
  loading?: boolean;
}) {
  const emit = defineEmits<{ click: [button: string] }>();

  return (
    <>
      {attributes ? (
        <div>
          <IButtonBase
            id="save"
            label="Save"
            ariaDescribedby="save-hint"
            onClick={() => emit("click", "save")}
          />
          <IButtonBase ariaLabel="Close" onClick={() => emit("click", "close")}>
            <span aria-hidden="true">×</span>
          </IButtonBase>
          <p id="save-hint">Saves the draft.</p>
        </div>
      ) : loading ? (
        <div>
          <IButtonBase label="Save" />
          <IButtonBase label="Wait" loading={true}>
            {{
              leading: () => <>&lt;</>,
              trailing: () => <>&gt;</>,
            }}
          </IButtonBase>
        </div>
      ) : (
        <div>
          <IButtonBase label="Save" />
          <IButtonBase label="Send" type="submit" />
          <IButtonBase label="Off" disabled={true} />
          <IButtonBase label="Overridden">Slotted</IButtonBase>
        </div>
      )}
    </>
  );
}
