---
"@inkline/qwik": minor
---

Build every component with Unframework, from its `.uf.tsx` source, in place of Inkline's compiler. Their Qwik API changes as listed below.

**Breaking:**

- **Props.** `IBadge`, `IBadgeBase`, `IButton`, `IButtonBase`, `ICheckbox`, `ICheckboxBase`, `ICheckboxControlBase`, `IFieldGroup`, `IFieldGroupBase`, `IHamburgerMenu`, `IHamburgerMenuBase`, `IInputBase`, `IInputPrefixBase`, `IInputSuffixBase`, `IInputTextareaBase`, `IRadioBase`, `IRadioGroup`, `IRadioGroupBase`, `ISwitch`, `ISwitchBase`, `ISwitchControlBase` and `ISwitchLabelBase` declare `class` and `style`, which fall through to the component's root element. Nothing to change.
- **Attributes.** `IBadge`, `IBadgeBase`, `IButton`, `IButtonBase`, `ICheckbox`, `ICheckboxControlBase`, `IFieldGroup`, `IFieldGroupBase`, `IHamburgerMenu`, `IHamburgerMenuBase`, `IInput`, `IInputBase`, `IInputTextareaBase`, `IRadioBase`, `IRadioFieldBase`, `IRadioGroup`, `IRadioGroupBase`, `ISwitch` and `ISwitchControlBase` no longer take every attribute and listener of their root element: they take their own props, plus `class` and `style`, which fall through to the root. The props and events under **New** cover an accessible name, a description, an `id` on a button and the native events a button and a field need. Any other attribute or listener, like a `data-*` attribute, another `aria-*` attribute or `onKeyDown$`, is dropped: wrap the component in an element that carries it.
- **Attributes.** `IInputControlBase` no longer takes `class` or `style`, since it renders one of several inputs, depending on `type`, and has no root element to pass them to. A class or a style no longer reaches the native input: style it through `IInput`, or wrap it in an element that carries the class.
- **Events.** On `ICheckbox`, `ICheckboxControlBase`, `ISwitch` and `ISwitchControlBase`, `onUpdateChecked$` is now `onCheckedChange$`. Rename the callback.
- **Events.** On `IHamburgerMenu` and `IHamburgerMenuBase`, `onUpdateOpen$` is now `onOpenChange$`. Rename the callback.
- **Props.** `IInput` declares `class`, `prefix$`, `style` and `suffix$`. Its named slots are now the render props `prefix$` and `suffix$`. Pass `prefix$` and `suffix$` where you projected `<div q:slot="prefix">` content.
- **Events.** On `IInput`, `IInputControlBase`, `IInputTextareaBase` and `IRadioGroup`, `onUpdateValue$` is now `onValueChange$`. Rename the callback.
- **Props.** `IRadioFieldBase` loses `checked`, which the `selected` model replaces (below), and declares `class` and `style`. Bind the group's selected value to every radio's `selected` model instead of passing each its `checked` state.
- **Models.** `IRadioFieldBase` gains the `selected` model, which holds the value of the radio that's checked, so the radios of a group bind one value, as native radios do. It starts `undefined`, as `IRadioGroup`'s `value` does, so no radio is checked until the model holds a value, and a radio with no `value` starts unchecked. Both models are typed `string | undefined`, so the state you bind to either one takes `undefined` too.
- **Events.** On `IRadioFieldBase`, `onChange$` is now `onSelectedChange$`. Rename the callback.
- **Peer dependency.** `@qwik.dev/core` moves from `>=2.0.0-beta.0` to exactly `2.0.0-beta.47`, the version Unframework generates the components for. Install that version.
- **Subpaths.** The `./stories` entry is gone, with the Storybooks that read it. Nothing replaces it: the components' examples live in the repository.
- **Input types.** `IInput` and `IInputControlBase` take a `type` of `text`, `email`, `password`, `search`, `tel` or `url`, and `IInput` takes `textarea` too, since the bound value needs the input's type before it renders. A `number` input binds a number, not the string the `value` model holds. Use your own input for the other types.
- **Class names.** The headless parts' roots no longer carry their recipe's name as a class, like `button` on `IButtonBase`, since the styled components pass it with the recipe's other classes. Add the class yourself where you style a headless part by it.
- **Events.** On `IButton` and `IButtonBase`, `onClick$` now listens to the component's `click` event, and on `IInputControlBase` and `IInputTextareaBase`, `onFocus$` and `onBlur$` listen to its `focus` and `blur` events. These carry no event object, where the listeners used to get the native event, so a handler can no longer call `preventDefault()` on a submit, stop the event or read its modifier keys. To reach the native event, listen with `onClick$` on a wrapping element, where the click still bubbles, and with `onFocusIn$` and `onFocusOut$` for the focus.

**New:**

- **Props.** `IButton` and `IButtonBase` take `id`, `ariaLabel` and `ariaDescribedby`, which set the native button's `id`, `aria-label` and `aria-describedby`. An icon-only button takes its accessible name from `ariaLabel`.
- **Props.** `IInput`, `IInputControlBase` and `IInputTextareaBase` take `required`, `autocomplete`, `ariaLabel` and `ariaDescribedby`, which set the native control's attributes of those names.
- **Props.** `autocomplete` takes one autofill token, like `email` or `current-password`, from the set that every framework's types accept. That set leaves out `nickname`, `organization-title`, `cc-additional-name`, `language`, `bday`, `sex`, `url`, `photo` and `impp`, and every compound value: a `section-*` name, a `shipping` or `billing` group, a `home`, `work`, `mobile`, `fax` or `pager` contact type, and the `webauthn` hint. Use your own input where a field needs one of those.
- **Props.** `ICheckbox`, `ICheckboxControlBase`, `ISwitch` and `ISwitchControlBase` take `ariaLabel` and `ariaDescribedby`, which set the native control's `aria-label` and `aria-describedby`.
- **Props.** `IRadioGroup` and `IRadioGroupBase` take `ariaDescribedby`, which sets the radiogroup's `aria-describedby`.
- **Events.** `IButton` and `IButtonBase` emit `click` as the native button is clicked, which you listen to with `onClick$`. It carries no event object.
- **Events.** `IInput`, `IInputControlBase` and `IInputTextareaBase` emit `focus` and `blur` as the native control gains and loses focus, which you listen to with `onFocus$` and `onBlur$`. They carry no event object.
- **Attributes.** `IHamburgerMenu` and `IHamburgerMenuBase` no longer render an empty `aria-controls=""` when `ariaControls` isn't set, since an empty reference names no element.
