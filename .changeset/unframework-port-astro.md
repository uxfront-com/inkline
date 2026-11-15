---
"@inkline/astro": minor
---

Build every component with Unframework, from its `.uf.tsx` source, in place of Inkline's compiler. Their Astro API changes as listed below.

**Breaking:**

- **Props.** `IBadge`, `IBadgeBase`, `IButton`, `IButtonBase`, `ICheckbox`, `ICheckboxBase`, `ICheckboxControlBase`, `IFieldGroup`, `IFieldGroupBase`, `IHamburgerMenu`, `IHamburgerMenuBase`, `IInput`, `IInputBase`, `IInputPrefixBase`, `IInputSuffixBase`, `IInputTextareaBase`, `IRadioBase`, `IRadioGroup`, `IRadioGroupBase`, `ISwitch`, `ISwitchBase`, `ISwitchControlBase` and `ISwitchLabelBase` declare `class` and `style`, which fall through to the component's root element. Nothing to change.
- **Attributes.** `IBadge`, `IBadgeBase`, `IButton`, `IButtonBase`, `ICheckbox`, `ICheckboxBase`, `ICheckboxControlBase`, `IFieldGroup`, `IFieldGroupBase`, `IHamburgerMenu`, `IHamburgerMenuBase`, `IInput`, `IInputBase`, `IInputControlBase`, `IInputPrefixBase`, `IInputSuffixBase`, `IInputTextareaBase`, `IRadioBase`, `IRadioFieldBase`, `IRadioGroup`, `IRadioGroupBase`, `ISwitch`, `ISwitchBase`, `ISwitchControlBase` and `ISwitchLabelBase` no longer take every attribute of their root element: they take their own props, plus `class` and `style`, which fall through to the root. Pass anything else, like `id` or an `aria-*` attribute, through a prop the component declares, or wrap the component.
- **Props.** `IRadioFieldBase` loses `checked`, which the `selected` model replaces (below), and declares `class` and `style`. Bind the group's selected value to every radio's `selected` model instead of passing each its `checked` state.
- **Peer dependency.** `astro` moves from `>=4` to `^7`. Upgrade to Astro 7.
- **Subpaths.** The `./stories` entry is gone, with the Storybooks that read it. Nothing replaces it: the components' examples live in the repository.
- **Input types.** `IInput` and `IInputControlBase` take a `type` of `text`, `email`, `password`, `search`, `tel` or `url`, and `IInput` takes `textarea` too, since the bound value needs the input's type before it renders. A `number` input binds a number, not the string the `value` model holds. Use your own input for the other types.
- **Class names.** The headless parts' roots no longer carry their recipe's name as a class, like `button` on `IButtonBase`, since the styled components pass it with the recipe's other classes. Add the class yourself where you style a headless part by it.
