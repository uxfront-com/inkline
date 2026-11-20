import "virtual:styleframe.css";
import IButton from "../styled/IButton.uf.tsx";

/**
 * At rest, disabled, disabled but focusable, loading, a pressed toggle and a menu button.
 *
 * @category Components/Actions/Button
 */
export default function ButtonStates() {
  return (
    <div>
      <IButton color="primary" label="Save" />
      <IButton color="primary" disabled={true} label="Save" />
      <IButton color="primary" disabled={true} focusableWhenDisabled={true} label="Save" />
      <IButton color="primary" loading={true} loadingLabel="Saving" label="Save" />
      <IButton variant="ghost" ariaPressed={true} label="Mute">
        {{
          leading: () => (
            <svg
              viewBox="0 0 24 24"
              width="1em"
              height="1em"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M11 5 6 9H2v6h4l5 4z" />
              <path d="m22 9-6 6" />
              <path d="m16 9 6 6" />
            </svg>
          ),
        }}
      </IButton>
      <IButton variant="outline" ariaHaspopup="menu" ariaExpanded={false} label="Options">
        {{
          trailing: () => (
            <svg
              viewBox="0 0 24 24"
              width="1em"
              height="1em"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          ),
        }}
      </IButton>
    </div>
  );
}
