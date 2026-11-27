---
"@inkline/react": minor
"@inkline/vue": minor
"@inkline/svelte": minor
"@inkline/solid": minor
"@inkline/angular": minor
"@inkline/qwik": minor
"@inkline/astro": minor
---

feat(components): render the Button as a link when it has an href

`IButton` and `IButtonBase` take an `href`. With one, the Button renders a link (`<a href>`) that
looks like the button, for navigation, so `Enter` follows it and `Space` doesn't. It keeps the
button's classes, data attributes, parts, spinner and loading announcement, and emits `click` as
the button does.

A disabled or loading link has no `href`, so it can't be followed, even before the page runs its
code. It keeps `role="link"` with `aria-disabled="true"`.

A loading link, and a disabled one with `focusableWhenDisabled`, keep their focus with
`tabindex="0"`, and a plain disabled link leaves the tab order, as a disabled button does. A link
renders no `type`, `disabled` or `aria-pressed`. Without an `href`, the Button renders the same
`<button>` as before.
