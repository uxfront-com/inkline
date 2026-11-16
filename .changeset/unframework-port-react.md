---
"@inkline/react": minor
---

Build every component with Unframework, from its `.uf.tsx` source, in place of Inkline's compiler. Their React API changes as listed below.

**Breaking:**

- **Props.** `IBadge`, `IBadgeBase`, `IButton`, `IButtonBase`, `ICheckbox`, `ICheckboxBase`, `ICheckboxControlBase`, `IFieldGroup`, `IFieldGroupBase`, `IHamburgerMenu`, `IHamburgerMenuBase`, `IInput`, `IInputBase`, `IInputPrefixBase`, `IInputSuffixBase`, `IInputTextareaBase`, `IRadioBase`, `IRadioGroup`, `IRadioGroupBase`, `ISwitch`, `ISwitchBase`, `ISwitchControlBase` and `ISwitchLabelBase` declare `className` and `style`, which fall through to the component's root element. Nothing to change.
- **Attributes.** `IBadge`, `IBadgeBase`, `IButton`, `IButtonBase`, `ICheckbox`, `ICheckboxBase`, `ICheckboxControlBase`, `IFieldGroup`, `IFieldGroupBase`, `IHamburgerMenu`, `IHamburgerMenuBase`, `IInput`, `IInputBase`, `IInputControlBase`, `IInputPrefixBase`, `IInputSuffixBase`, `IInputTextareaBase`, `IRadioBase`, `IRadioFieldBase`, `IRadioGroup`, `IRadioGroupBase`, `ISwitch`, `ISwitchBase`, `ISwitchControlBase` and `ISwitchLabelBase` no longer take every attribute and listener of their root element: they take their own props, plus `className` and `style`, which fall through to the root. The props and events under **New** cover an accessible name, a description, an `id` on a button and the native events a button and a field need. Any other attribute or listener, like a `data-*` attribute, another `aria-*` attribute or `onKeydown`, is dropped: wrap the component in an element that carries it.
- **Events.** On `ICheckbox`, `ICheckboxControlBase`, `ISwitch` and `ISwitchControlBase`, `onUpdateChecked` is now `onCheckedChange`. Rename the callback.
- **Events.** On `IHamburgerMenu` and `IHamburgerMenuBase`, `onUpdateOpen` is now `onOpenChange`. Rename the callback.
- **Events.** On `IInput`, `IInputControlBase`, `IInputTextareaBase` and `IRadioGroup`, `onUpdateValue` is now `onValueChange`. Rename the callback.
- **Props.** `IRadioFieldBase` loses `checked`, which the `selected` model replaces (below), and declares `className` and `style`. Bind the group's selected value to every radio's `selected` model instead of passing each its `checked` state.
- **Models.** `IRadioFieldBase` gains the `selected` model, which holds the value of the radio that's checked, so the radios of a group bind one value, as native radios do.
- **Events.** On `IRadioFieldBase`, `onChange` is now `onSelectedChange`. Rename the callback.
- **Subpaths.** The `./stories` entry is gone, with the Storybooks that read it. Nothing replaces it: the components' examples live in the repository.
- **Input types.** `IInput` and `IInputControlBase` take a `type` of `text`, `email`, `password`, `search`, `tel` or `url`, and `IInput` takes `textarea` too, since the bound value needs the input's type before it renders. A `number` input binds a number, not the string the `value` model holds. Use your own input for the other types.
- **Class names.** The headless parts' roots no longer carry their recipe's name as a class, like `button` on `IButtonBase`, since the styled components pass it with the recipe's other classes. Add the class yourself where you style a headless part by it.

**New:**

- **Props.** `IButton` and `IButtonBase` take `id`, `ariaLabel` and `ariaDescribedby`, which set the native button's `id`, `aria-label` and `aria-describedby`. An icon-only button takes its accessible name from `ariaLabel`.
- **Props.** `IInput`, `IInputControlBase` and `IInputTextareaBase` take `required`, `autocomplete`, `ariaLabel` and `ariaDescribedby`, which set the native control's attributes of those names. `autocomplete` takes one autofill token, like `email` or `current-password`.
- **Props.** `ICheckbox`, `ICheckboxControlBase`, `ISwitch` and `ISwitchControlBase` take `ariaLabel` and `ariaDescribedby`, which set the native control's `aria-label` and `aria-describedby`.
- **Props.** `IRadioGroup` and `IRadioGroupBase` take `ariaDescribedby`, which sets the radiogroup's `aria-describedby`.
- **Events.** `IButton` and `IButtonBase` emit `click` as the native button is clicked, which you listen to with `onClick`.
- **Events.** `IInput`, `IInputControlBase` and `IInputTextareaBase` emit `focus` and `blur` as the native control gains and loses focus, which you listen to with `onFocus` and `onBlur`.
