import "virtual:styleframe.css";
import IButton from "../styled/IButton.uf.tsx";

/**
 * A button that navigates, which renders a link.
 *
 * @category Components/Actions/Button
 */
export default function ButtonLink() {
  return (
    <div>
      <IButton href="/docs" color="primary" label="Read the introduction">
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
    </div>
  );
}
