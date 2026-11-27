---
"@inkline/react": minor
"@inkline/vue": minor
"@inkline/svelte": minor
"@inkline/solid": minor
"@inkline/angular": minor
"@inkline/qwik": minor
"@inkline/astro": minor
---

feat(components): update `@uxfront/unframework` to 0.6.1, so every component takes attributes

Every component with one root element now passes an attribute, a DOM listener or a `ref` it
doesn't declare to that element, on every framework: `<IButton label="Save" id="save" aria-describedby="hint" />`. The
consumer's value wins over the root's own, and `class` and `style` merge as before. A `ref` holds
the root element. Each framework takes them its own way:

- **React, Solid, Qwik and Astro:** each component's props type takes its root element's
  attributes. On React, `className` and `style` come from those attributes now, so they keep
  working.
- **Svelte:** each component takes a bindable `ref`, as `bind:ref`.
- **Angular:** each component has two new inputs, `ufAttributes` and `ufListeners`, since an
  attribute written on the host stays on the host: `<uf-i-button label="Save" [ufAttributes]="{ id: 'save' }" />`.
- **Vue:** attributes already fell through, so nothing changes.

`IInputControlBase` renders one `<input>` for each type, with no one root, so this change doesn't
reach it. No prop, model, event or slot is removed or renamed.
