import "virtual:styleframe.css";
import IButton from "../styled/IButton.uf.tsx";

/**
 * An icon-only button at every size, in four variants, each one named by its hidden label.
 *
 * @category Components/Actions/Button
 */
export default function ButtonIconOnly() {
  return (
    <div style="display: flex; flex-direction: column; gap: var(--spacing--sm)">
      <div style="display: flex; flex-wrap: wrap; align-items: center; gap: var(--spacing--xs)">
        <IButton
          size="xs"
          color="primary"
          variant="solid"
          iconOnly={true}
          label="Search (xs, solid)"
        >
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
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            ),
          }}
        </IButton>
        <IButton
          size="xs"
          color="primary"
          variant="outline"
          iconOnly={true}
          label="Search (xs, outline)"
        >
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
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            ),
          }}
        </IButton>
        <IButton size="xs" color="primary" variant="soft" iconOnly={true} label="Search (xs, soft)">
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
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            ),
          }}
        </IButton>
        <IButton
          size="xs"
          color="primary"
          variant="ghost"
          iconOnly={true}
          label="Search (xs, ghost)"
        >
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
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            ),
          }}
        </IButton>
      </div>
      <div style="display: flex; flex-wrap: wrap; align-items: center; gap: var(--spacing--xs)">
        <IButton
          size="sm"
          color="primary"
          variant="solid"
          iconOnly={true}
          label="Search (sm, solid)"
        >
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
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            ),
          }}
        </IButton>
        <IButton
          size="sm"
          color="primary"
          variant="outline"
          iconOnly={true}
          label="Search (sm, outline)"
        >
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
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            ),
          }}
        </IButton>
        <IButton size="sm" color="primary" variant="soft" iconOnly={true} label="Search (sm, soft)">
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
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            ),
          }}
        </IButton>
        <IButton
          size="sm"
          color="primary"
          variant="ghost"
          iconOnly={true}
          label="Search (sm, ghost)"
        >
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
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            ),
          }}
        </IButton>
      </div>
      <div style="display: flex; flex-wrap: wrap; align-items: center; gap: var(--spacing--xs)">
        <IButton
          size="md"
          color="primary"
          variant="solid"
          iconOnly={true}
          label="Search (md, solid)"
        >
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
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            ),
          }}
        </IButton>
        <IButton
          size="md"
          color="primary"
          variant="outline"
          iconOnly={true}
          label="Search (md, outline)"
        >
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
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            ),
          }}
        </IButton>
        <IButton size="md" color="primary" variant="soft" iconOnly={true} label="Search (md, soft)">
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
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            ),
          }}
        </IButton>
        <IButton
          size="md"
          color="primary"
          variant="ghost"
          iconOnly={true}
          label="Search (md, ghost)"
        >
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
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            ),
          }}
        </IButton>
      </div>
      <div style="display: flex; flex-wrap: wrap; align-items: center; gap: var(--spacing--xs)">
        <IButton
          size="lg"
          color="primary"
          variant="solid"
          iconOnly={true}
          label="Search (lg, solid)"
        >
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
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            ),
          }}
        </IButton>
        <IButton
          size="lg"
          color="primary"
          variant="outline"
          iconOnly={true}
          label="Search (lg, outline)"
        >
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
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            ),
          }}
        </IButton>
        <IButton size="lg" color="primary" variant="soft" iconOnly={true} label="Search (lg, soft)">
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
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            ),
          }}
        </IButton>
        <IButton
          size="lg"
          color="primary"
          variant="ghost"
          iconOnly={true}
          label="Search (lg, ghost)"
        >
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
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            ),
          }}
        </IButton>
      </div>
      <div style="display: flex; flex-wrap: wrap; align-items: center; gap: var(--spacing--xs)">
        <IButton
          size="xl"
          color="primary"
          variant="solid"
          iconOnly={true}
          label="Search (xl, solid)"
        >
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
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            ),
          }}
        </IButton>
        <IButton
          size="xl"
          color="primary"
          variant="outline"
          iconOnly={true}
          label="Search (xl, outline)"
        >
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
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            ),
          }}
        </IButton>
        <IButton size="xl" color="primary" variant="soft" iconOnly={true} label="Search (xl, soft)">
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
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            ),
          }}
        </IButton>
        <IButton
          size="xl"
          color="primary"
          variant="ghost"
          iconOnly={true}
          label="Search (xl, ghost)"
        >
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
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            ),
          }}
        </IButton>
      </div>
    </div>
  );
}
