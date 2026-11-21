---
"@inkline/react": patch
"@inkline/vue": patch
"@inkline/svelte": patch
"@inkline/solid": patch
"@inkline/angular": patch
"@inkline/qwik": patch
"@inkline/astro": patch
---

fix(components): update `@styleframe/theme` to 3.11.0 for the Open Components Button

The Button now meets the Open Components Button rules for contrast, target size, resizing, stable
size, state selectors, hover, forced colours, more contrast and reduced motion. Its `link` variant
is underlined at rest, its labels wrap instead of overflowing, and a loading button shows only its
spinner, in the label's colour, over the hidden label.

The theme also restyles the Input, Checkbox, Radio and Switch, so their borders, rings and tracks
keep 3:1 against the page, and a placeholder, prefix or suffix takes the field's text colour at
75%. The props and the class names stay the same.
