import "virtual:styleframe.css";
import IButton from "../styled/IButton.uf.tsx";

/**
 * Icons before and after the label, and an icon-only button, which its hidden label names.
 *
 * @category Components/Actions/Button
 */
export default function ButtonIcon() {
  return (
    <div>
      <IButton color="primary" label="New project">
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
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
          ),
        }}
      </IButton>
      <IButton variant="outline" label="Continue">
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
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          ),
        }}
      </IButton>
      <IButton variant="ghost" color="error" iconOnly={true} label="Delete">
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
              <path d="M3 6h18" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
              <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
          ),
        }}
      </IButton>
    </div>
  );
}
