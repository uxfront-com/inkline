---
"@inkline/react": minor
"@inkline/vue": minor
"@inkline/svelte": minor
"@inkline/solid": minor
"@inkline/angular": minor
"@inkline/qwik": minor
"@inkline/astro": minor
---

feat(components): bring the Button to the Open Components standard

`IButton` and `IButtonBase` take seven new props: `iconOnly`, `focusableWhenDisabled`,
`loadingLabel`, `ariaPressed`, `ariaExpanded`, `ariaHaspopup` and `ariaControls`. They also take
`leading` and `trailing` slots for icons, which are hidden from assistive technology. An icon-only
button keeps its label in the page, visually hidden, so the label still names it. `IButtonBase`
also takes the recipe's `variant`, `color` and `size`, which it shows as data attributes, and a
`spinner` slot for your own spinner.

A loading button now keeps its focus and its name. Once the page runs its code, it has
`aria-disabled="true"` instead of `disabled`, blocks its own click and its form's submission, and
announces `loadingLabel` in a polite live region, which the button adds to the page when it's
focused or pressed, before its click. The server render stays natively disabled, and so does
Astro, which runs no client code. `aria-busy` is gone, so move a selector on `[aria-busy]` to
`[data-loading]`.

The button shows its state in `data-variant`, `data-color`, `data-size`, `data-icon-only` and
`data-loading`, and wraps its parts in `data-slot` elements, in a fixed order: leading, label,
trailing and spinner. The spinner now comes from Styleframe's `spinner` and `spinnerCircle`
recipes.
