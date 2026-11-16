---
"@inkline/react": minor
"@inkline/vue": minor
"@inkline/svelte": minor
"@inkline/solid": minor
"@inkline/angular": minor
"@inkline/qwik": minor
"@inkline/astro": minor
---

feat(components): add Checkbox component

Add `ICheckbox` (and its headless parts `ICheckboxBase` + `ICheckboxControlBase`), a labelled
boolean control styled with the Styleframe `checkbox` and `checkbox-field` recipes. It wraps a native
`<input type="checkbox">` inside a `<label>` for implicit label association and free APG semantics
(`role="checkbox"`, `Space` toggle, focus, disabled). A two-way `checked` model drives the box.

`indeterminate` renders the partially checked ("mixed") state, which exposes `aria-checked="mixed"`.
A `readonly` prop keeps the box focusable but stops it toggling, announced with `aria-readonly` and
enforced by cancelling the click. Astro renders on the server only, so there it renders the box's
first state, without the mixed state.
Supports `color` (`light` / `dark` / `neutral`), `size` (`sm` / `md` / `lg`), and a `label` prop
overridable by the default slot.
