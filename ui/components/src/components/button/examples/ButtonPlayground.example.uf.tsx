import "virtual:styleframe.css";
import IButton from "../styled/IButton.uf.tsx";

/**
 * A labelled button with a leading icon, and every other prop left to its default.
 *
 * @category Components/Actions/Button
 */
export default function ButtonPlayground() {
  return (
    <div>
      <IButton label="Save changes">
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
              <path d="M20 6 9 17l-5-5" />
            </svg>
          ),
        }}
      </IButton>
    </div>
  );
}
