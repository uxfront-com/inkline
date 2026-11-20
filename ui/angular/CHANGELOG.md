# @inkline/angular

## 0.1.0

### Minor Changes

- d0c2ef8: feat(components): add Checkbox component

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

- d1d1f65: feat(components): add FieldGroup component

  Add `IFieldGroup` (and its headless `IFieldGroupBase`), styled with the Styleframe `field-group`
  recipe. It joins bordered controls — inputs, buttons, selects, badges — placed as its **direct
  children** into a single visual unit, merging their border radii and collapsing the inner border at
  the seams. Supports `orientation` (`horizontal` / `vertical`) and a `block` mode that fills the
  container width.

- 49c624f: feat(components): add HamburgerMenu component

  Add `IHamburgerMenu` (and its headless `IHamburgerMenuBase`), an accessible animated three-line
  toggle button styled with the Styleframe `hamburger-menu` recipe. It follows the WAI-ARIA
  **Disclosure** pattern on a native `<button>`: a two-way `open` model drives `aria-expanded` and the
  recipe's `active` morph, while the consumer renders and links their own navigation region via
  `ariaControls`. Supports `color` (`light` / `dark` / `neutral`), `size` (`sm` / `md` / `lg`), and an
  `animation` axis (`close` / `arrow-up` / `arrow-down` / `arrow-left` / `arrow-right` / `minus` /
  `plus`) for the open-state shape. The icon-only control carries a defaulted `ariaLabel`
  (`"Toggle menu"`) so every instance has an accessible name out of the box.

- fbd79ca: feat(components): add Radio component

  Add `IRadioGroup` — a complete single-select control that renders one radio per `options` entry and
  owns the two-way `value` — composed from three headless parts (`IRadioGroupBase`, `IRadioBase`,
  `IRadioFieldBase`), styled with the Styleframe `radio-group` / `radio` / `radio-field` recipes.

  Each option renders a native `<input type="radio">` wrapped in its `<label>`, so role, `aria-checked`,
  keyboard roving, and mutual exclusivity (via a shared `name`) come from the platform. Supports the
  `color`, `size`, and `orientation` recipe axes plus a group-level `disabled` and `readonly` (the
  selection stays visible and focusable but can't be changed — surfaced as `aria-readonly` on the
  radiogroup and enforced per field). The headless parts are exported individually for advanced
  composition.

- 56f849b: feat(components): add Switch component

  Add `ISwitch` (and its headless parts `ISwitchBase`, `ISwitchControlBase`, `ISwitchLabelBase`), an
  accessible on/off toggle styled with the Styleframe `switch` / `switch-field` recipes. It follows the
  WAI-ARIA **Switch** pattern on a native `<input type="checkbox">`: a two-way `checked` model drives
  `aria-checked`, Space toggles natively, and Enter clicks the control to complete the switch keyboard
  map. The default slot (or `label` prop) supplies the accessible name, and the `.switch-label`
  addon collapses when empty. Supports `color` (`light` / `dark` / `neutral`) and `size`
  (`sm` / `md` / `lg`).

- fae570f: feat(components): bring the Button to the Open Components standard

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

- 4ca2947: Build every component with Unframework, from its `.uf.tsx` source, in place of Inkline's compiler. Their Angular API changes as listed below.

  **Breaking:**
  - **Selectors.** Every selector takes Unframework's `uf-` prefix: `ink-badge` is now `uf-i-badge`, `ink-badge-base` is now `uf-i-badge-base`, `ink-button` is now `uf-i-button`, `ink-button-base` is now `uf-i-button-base`, `ink-checkbox` is now `uf-i-checkbox`, `ink-checkbox-base` is now `uf-i-checkbox-base`, `ink-checkbox-control-base` is now `uf-i-checkbox-control-base`, `ink-field-group` is now `uf-i-field-group`, `ink-field-group-base` is now `uf-i-field-group-base`, `ink-hamburger-menu` is now `uf-i-hamburger-menu`, `ink-hamburger-menu-base` is now `uf-i-hamburger-menu-base`, `ink-input` is now `uf-i-input`, `ink-input-base` is now `uf-i-input-base`, `ink-input-control-base` is now `uf-i-input-control-base`, `ink-input-prefix-base` is now `uf-i-input-prefix-base`, `ink-input-suffix-base` is now `uf-i-input-suffix-base`, `ink-input-textarea-base` is now `uf-i-input-textarea-base`, `ink-radio-base` is now `uf-i-radio-base`, `ink-radio-field-base` is now `uf-i-radio-field-base`, `ink-radio-group` is now `uf-i-radio-group`, `ink-radio-group-base` is now `uf-i-radio-group-base`, `ink-switch` is now `uf-i-switch`, `ink-switch-base` is now `uf-i-switch-base`, `ink-switch-control-base` is now `uf-i-switch-control-base`, `ink-switch-label-base` is now `uf-i-switch-label-base`. Rename the elements in your templates.
  - **Props.** `IBadge`, `IBadgeBase`, `IButton`, `IButtonBase`, `ICheckbox`, `ICheckboxBase`, `ICheckboxControlBase`, `IFieldGroup`, `IFieldGroupBase`, `IHamburgerMenu`, `IHamburgerMenuBase`, `IInput`, `IInputBase`, `IInputPrefixBase`, `IInputSuffixBase`, `IInputTextareaBase`, `IRadioBase`, `IRadioGroup`, `IRadioGroupBase`, `ISwitch`, `ISwitchBase`, `ISwitchControlBase` and `ISwitchLabelBase` take `class` and `style` in place of `klass`. Bind `class` where you bound `klass`.
  - **Props.** `IInputControlBase` no longer takes `klass`, since it renders one of several inputs, depending on `type`. A `class` or `style` on `<uf-i-input-control-base>` stays on that host element, which renders no box of its own (`display: contents`), so it no longer reaches the native input. Style the input through `IInput`, or through the component around it.
  - **Props.** `IRadioFieldBase` takes `class` and `style` in place of `klass`, and loses its `checked` input, which the `selected` model replaces (below). Bind `class` where you bound `klass`.
  - **Models.** `IRadioFieldBase` gains the `selected` model, which holds the value of the radio that's checked, so the radios of a group bind one value, as native radios do. It starts `undefined`, as `IRadioGroup`'s `value` does, so no radio is checked until the model holds a value, and a radio with no `value` starts unchecked. Both models are typed `string | undefined`, so the state you bind to either one takes `undefined` too.
  - **Events.** `IRadioFieldBase` no longer emits `change`: listen to the `selected` model's update instead.
  - **Peer dependency.** `@angular/core` moves from `>=17.3.0` to `^22`. Upgrade to Angular 22.
  - **Subpaths.** The `./stories` entry is gone, with the Storybooks that read it. Nothing replaces it: the components' examples live in the repository.
  - **Input types.** `IInput` and `IInputControlBase` take a `type` of `text`, `email`, `password`, `search`, `tel` or `url`, and `IInput` takes `textarea` too, since the bound value needs the input's type before it renders. A `number` input binds a number, not the string the `value` model holds. Use your own input for the other types.
  - **Class names.** The headless parts' roots no longer carry their recipe's name as a class, like `button` on `IButtonBase`, since the styled components pass it with the recipe's other classes. Add the class yourself where you style a headless part by it.

  **New:**
  - **Props.** `IButton` and `IButtonBase` take `id`, `ariaLabel` and `ariaDescribedby`, which set the native button's `id`, `aria-label` and `aria-describedby`. An icon-only button takes its accessible name from `ariaLabel`.
  - **Props.** `IInput`, `IInputControlBase` and `IInputTextareaBase` take `required`, `autocomplete`, `ariaLabel` and `ariaDescribedby`, which set the native control's attributes of those names.
  - **Props.** `autocomplete` takes one autofill token, like `email` or `current-password`, from the set that every framework's types accept. That set leaves out `nickname`, `organization-title`, `cc-additional-name`, `language`, `bday`, `sex`, `url`, `photo` and `impp`, and every compound value: a `section-*` name, a `shipping` or `billing` group, a `home`, `work`, `mobile`, `fax` or `pager` contact type, and the `webauthn` hint. Use your own input where a field needs one of those.
  - **Props.** `ICheckbox`, `ICheckboxControlBase`, `ISwitch` and `ISwitchControlBase` take `ariaLabel` and `ariaDescribedby`, which set the native control's `aria-label` and `aria-describedby`.
  - **Props.** `IRadioGroup` and `IRadioGroupBase` take `ariaDescribedby`, which sets the radiogroup's `aria-describedby`.
  - **Props.** A static `id`, like `<uf-i-button-base id="save">`, stays on the component's host element as well as reaching the native element, so two elements share it. Bind it instead, as `[id]="'save'"`, and only the native element takes it.
  - **Events.** `IButton` and `IButtonBase` emit `click` as the native button is clicked, which you listen to with `(ufClick)`. `(ufClick)` carries no event object: to read the native event, bind `(click)` on the host instead, where the click still bubbles.
  - **Events.** `IInput`, `IInputControlBase` and `IInputTextareaBase` emit `focus` and `blur` as the native control gains and loses focus, which you listen to with `(ufFocus)` and `(ufBlur)`. They carry no event object: for the native event, bind `(focusin)` and `(focusout)` on the host instead.
  - **Events.** A `(click)` on the host hears the native click as it bubbles out of the button, so a template that binds both `(click)` and `(ufClick)` runs its handler twice. Bind one of them.
  - **Attributes.** `IHamburgerMenu` and `IHamburgerMenuBase` no longer render an empty `aria-controls=""` when `ariaControls` isn't set, since an empty reference names no element.
