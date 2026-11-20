# @inkline/react

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

- 4ca2947: Build every component with Unframework, from its `.uf.tsx` source, in place of Inkline's compiler. Their React API changes as listed below.

  **Breaking:**
  - **Props.** `IBadge`, `IBadgeBase`, `IButton`, `IButtonBase`, `ICheckbox`, `ICheckboxBase`, `ICheckboxControlBase`, `IFieldGroup`, `IFieldGroupBase`, `IHamburgerMenu`, `IHamburgerMenuBase`, `IInput`, `IInputBase`, `IInputPrefixBase`, `IInputSuffixBase`, `IInputTextareaBase`, `IRadioBase`, `IRadioGroup`, `IRadioGroupBase`, `ISwitch`, `ISwitchBase`, `ISwitchControlBase` and `ISwitchLabelBase` declare `className` and `style`, which fall through to the component's root element. Nothing to change.
  - **Attributes.** `IBadge`, `IBadgeBase`, `IButton`, `IButtonBase`, `ICheckbox`, `ICheckboxBase`, `ICheckboxControlBase`, `IFieldGroup`, `IFieldGroupBase`, `IHamburgerMenu`, `IHamburgerMenuBase`, `IInput`, `IInputBase`, `IInputPrefixBase`, `IInputSuffixBase`, `IInputTextareaBase`, `IRadioBase`, `IRadioFieldBase`, `IRadioGroup`, `IRadioGroupBase`, `ISwitch`, `ISwitchBase`, `ISwitchControlBase` and `ISwitchLabelBase` no longer take every attribute and listener of their root element: they take their own props, plus `className` and `style`, which fall through to the root. The props and events under **New** cover an accessible name, a description, an `id` on a button and the native events a button and a field need. Any other attribute or listener, like a `data-*` attribute, another `aria-*` attribute or `onKeyDown`, is dropped: wrap the component in an element that carries it.
  - **Attributes.** `IInputControlBase` no longer takes `className` or `style`, since it renders one of several inputs, depending on `type`, and has no root element to pass them to. A class or a style no longer reaches the native input: style it through `IInput`, or wrap it in an element that carries the class.
  - **Events.** On `ICheckbox`, `ICheckboxControlBase`, `ISwitch` and `ISwitchControlBase`, `onUpdateChecked` is now `onCheckedChange`. Rename the callback.
  - **Events.** On `IHamburgerMenu` and `IHamburgerMenuBase`, `onUpdateOpen` is now `onOpenChange`. Rename the callback.
  - **Events.** On `IInput`, `IInputControlBase`, `IInputTextareaBase` and `IRadioGroup`, `onUpdateValue` is now `onValueChange`. Rename the callback.
  - **Props.** `IRadioFieldBase` loses `checked`, which the `selected` model replaces (below), and declares `className` and `style`. Bind the group's selected value to every radio's `selected` model instead of passing each its `checked` state.
  - **Models.** `IRadioFieldBase` gains the `selected` model, which holds the value of the radio that's checked, so the radios of a group bind one value, as native radios do. It starts `undefined`, as `IRadioGroup`'s `value` does, so no radio is checked until the model holds a value, and a radio with no `value` starts unchecked. Both models are typed `string | undefined`, so the state you bind to either one takes `undefined` too.
  - **Events.** On `IRadioFieldBase`, `onChange` is now `onSelectedChange`. Rename the callback.
  - **Peer dependency.** `react` moves from `>=18` to `>=19.2`, since `ICheckboxControlBase` and `ISwitchControlBase`, which `ICheckbox` and `ISwitch` render, call React 19.2's `useEffectEvent`. Upgrade to React 19.2.
  - **Subpaths.** The `./stories` entry is gone, with the Storybooks that read it. Nothing replaces it: the components' examples live in the repository.
  - **Input types.** `IInput` and `IInputControlBase` take a `type` of `text`, `email`, `password`, `search`, `tel` or `url`, and `IInput` takes `textarea` too, since the bound value needs the input's type before it renders. A `number` input binds a number, not the string the `value` model holds. Use your own input for the other types.
  - **Class names.** The headless parts' roots no longer carry their recipe's name as a class, like `button` on `IButtonBase`, since the styled components pass it with the recipe's other classes. Add the class yourself where you style a headless part by it.
  - **Events.** On `IButton` and `IButtonBase`, `onClick` now listens to the component's `click` event, and on `IInputControlBase` and `IInputTextareaBase`, `onFocus` and `onBlur` listen to its `focus` and `blur` events. These carry no event object, where the listeners used to get the native event, so a handler can no longer call `preventDefault()` on a submit, stop the event or read its modifier keys. To reach the native event, listen with `onClick` on a wrapping element, where the click still bubbles, and with `onFocus` and `onBlur`, which React fires as the focus moves inside it for the focus.

  **New:**
  - **Props.** `IButton` and `IButtonBase` take `id`, `ariaLabel` and `ariaDescribedby`, which set the native button's `id`, `aria-label` and `aria-describedby`. An icon-only button takes its accessible name from `ariaLabel`.
  - **Props.** `IInput`, `IInputControlBase` and `IInputTextareaBase` take `required`, `autocomplete`, `ariaLabel` and `ariaDescribedby`, which set the native control's attributes of those names.
  - **Props.** `autocomplete` takes one autofill token, like `email` or `current-password`, from the set that every framework's types accept. That set leaves out `nickname`, `organization-title`, `cc-additional-name`, `language`, `bday`, `sex`, `url`, `photo` and `impp`, and every compound value: a `section-*` name, a `shipping` or `billing` group, a `home`, `work`, `mobile`, `fax` or `pager` contact type, and the `webauthn` hint. Use your own input where a field needs one of those.
  - **Props.** `ICheckbox`, `ICheckboxControlBase`, `ISwitch` and `ISwitchControlBase` take `ariaLabel` and `ariaDescribedby`, which set the native control's `aria-label` and `aria-describedby`.
  - **Props.** `IRadioGroup` and `IRadioGroupBase` take `ariaDescribedby`, which sets the radiogroup's `aria-describedby`.
  - **Events.** `IButton` and `IButtonBase` emit `click` as the native button is clicked, which you listen to with `onClick`. It carries no event object.
  - **Events.** `IInput`, `IInputControlBase` and `IInputTextareaBase` emit `focus` and `blur` as the native control gains and loses focus, which you listen to with `onFocus` and `onBlur`. They carry no event object.
  - **Attributes.** `IHamburgerMenu` and `IHamburgerMenuBase` no longer render an empty `aria-controls=""` when `ariaControls` isn't set, since an empty reference names no element.
