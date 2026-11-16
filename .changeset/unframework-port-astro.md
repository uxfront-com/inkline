---
"@inkline/astro": minor
---

Build every component with Unframework, from its `.uf.tsx` source, in place of Inkline's compiler. Their Astro API changes as listed below.

**Breaking:**

- **Props.** `IBadge`, `IBadgeBase`, `IButton`, `IButtonBase`, `ICheckbox`, `ICheckboxBase`, `ICheckboxControlBase`, `IFieldGroup`, `IFieldGroupBase`, `IHamburgerMenu`, `IHamburgerMenuBase`, `IInput`, `IInputBase`, `IInputPrefixBase`, `IInputSuffixBase`, `IInputTextareaBase`, `IRadioBase`, `IRadioGroup`, `IRadioGroupBase`, `ISwitch`, `ISwitchBase`, `ISwitchControlBase` and `ISwitchLabelBase` declare `class` and `style`, which fall through to the component's root element. Nothing to change.
- **Attributes.** `IBadge`, `IBadgeBase`, `IButton`, `IButtonBase`, `ICheckbox`, `ICheckboxBase`, `ICheckboxControlBase`, `IFieldGroup`, `IFieldGroupBase`, `IHamburgerMenu`, `IHamburgerMenuBase`, `IInput`, `IInputBase`, `IInputControlBase`, `IInputPrefixBase`, `IInputSuffixBase`, `IInputTextareaBase`, `IRadioBase`, `IRadioFieldBase`, `IRadioGroup`, `IRadioGroupBase`, `ISwitch`, `ISwitchBase`, `ISwitchControlBase` and `ISwitchLabelBase` no longer take every attribute of their root element: they take their own props, plus `class` and `style`, which fall through to the root. The props under **New** cover an accessible name, a description and an `id` on a button. Any other attribute, like a `data-*` attribute or another `aria-*` attribute, is dropped: wrap the component in an element that carries it.
- **Props.** `IRadioFieldBase` loses `checked`, gains `selected`, and declares `class` and `style`. `selected` is a prop here, since Astro has no models: pass the group's selected value to every radio, and the radio whose `value` matches it renders checked.
- **Peer dependency.** `astro` moves from `>=4` to `^7`. Upgrade to Astro 7.
- **Subpaths.** The `./stories` entry is gone, with the Storybooks that read it. Nothing replaces it: the components' examples live in the repository.
- **Input types.** `IInput` and `IInputControlBase` take a `type` of `text`, `email`, `password`, `search`, `tel` or `url`, and `IInput` takes `textarea` too, since the bound value needs the input's type before it renders. A `number` input binds a number, not the string the `value` model holds. Use your own input for the other types.
- **Class names.** The headless parts' roots no longer carry their recipe's name as a class, like `button` on `IButtonBase`, since the styled components pass it with the recipe's other classes. Add the class yourself where you style a headless part by it.

**New:**

- **Props.** `IButton` and `IButtonBase` take `id`, `ariaLabel` and `ariaDescribedby`, which set the native button's `id`, `aria-label` and `aria-describedby`. An icon-only button takes its accessible name from `ariaLabel`.
- **Props.** `IInput`, `IInputControlBase` and `IInputTextareaBase` take `required`, `autocomplete`, `ariaLabel` and `ariaDescribedby`, which set the native control's attributes of those names.
- **Props.** `autocomplete` takes one autofill token, like `email` or `current-password`, from the set that every framework's types accept. That set leaves out `nickname`, `organization-title`, `cc-additional-name`, `language`, `bday`, `sex`, `url`, `photo` and `impp`, and every compound value: a `section-*` name, a `shipping` or `billing` group, a `home`, `work`, `mobile`, `fax` or `pager` contact type, and the `webauthn` hint. Use your own input where a field needs one of those.
- **Props.** `ICheckbox`, `ICheckboxControlBase`, `ISwitch` and `ISwitchControlBase` take `ariaLabel` and `ariaDescribedby`, which set the native control's `aria-label` and `aria-describedby`.
- **Props.** `IRadioGroup` and `IRadioGroupBase` take `ariaDescribedby`, which sets the radiogroup's `aria-describedby`.
- **Events.** Astro renders on the server only, so the `click`, `focus` and `blur` events the other packages declare don't apply here.
