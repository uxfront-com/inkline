---
"@inkline/angular": minor
---

Build every component with Unframework, from its `.uf.tsx` source, in place of Inkline's compiler. Their Angular API changes as listed below.

**Breaking:**

- **Selectors.** Every selector takes Unframework's `uf-` prefix: `ink-badge` is now `uf-i-badge`, `ink-badge-base` is now `uf-i-badge-base`, `ink-button` is now `uf-i-button`, `ink-button-base` is now `uf-i-button-base`, `ink-checkbox` is now `uf-i-checkbox`, `ink-checkbox-base` is now `uf-i-checkbox-base`, `ink-checkbox-control-base` is now `uf-i-checkbox-control-base`, `ink-field-group` is now `uf-i-field-group`, `ink-field-group-base` is now `uf-i-field-group-base`, `ink-hamburger-menu` is now `uf-i-hamburger-menu`, `ink-hamburger-menu-base` is now `uf-i-hamburger-menu-base`, `ink-input` is now `uf-i-input`, `ink-input-base` is now `uf-i-input-base`, `ink-input-control-base` is now `uf-i-input-control-base`, `ink-input-prefix-base` is now `uf-i-input-prefix-base`, `ink-input-suffix-base` is now `uf-i-input-suffix-base`, `ink-input-textarea-base` is now `uf-i-input-textarea-base`, `ink-radio-base` is now `uf-i-radio-base`, `ink-radio-field-base` is now `uf-i-radio-field-base`, `ink-radio-group` is now `uf-i-radio-group`, `ink-radio-group-base` is now `uf-i-radio-group-base`, `ink-switch` is now `uf-i-switch`, `ink-switch-base` is now `uf-i-switch-base`, `ink-switch-control-base` is now `uf-i-switch-control-base`, `ink-switch-label-base` is now `uf-i-switch-label-base`. Rename the elements in your templates.
- **Props.** `IBadge`, `IBadgeBase`, `IButton`, `IButtonBase`, `ICheckbox`, `ICheckboxBase`, `ICheckboxControlBase`, `IFieldGroup`, `IFieldGroupBase`, `IHamburgerMenu`, `IHamburgerMenuBase`, `IInput`, `IInputBase`, `IInputPrefixBase`, `IInputSuffixBase`, `IInputTextareaBase`, `IRadioBase`, `IRadioGroup`, `IRadioGroupBase`, `ISwitch`, `ISwitchBase`, `ISwitchControlBase` and `ISwitchLabelBase` take `class` and `style` in place of `klass`. Bind `class` where you bound `klass`.
- **Props.** `IInputControlBase` no longer takes `klass`, since it renders one of several inputs, depending on `type`. Style the input through the component around it.
- **Props.** `IRadioFieldBase` takes `class` and `style` in place of `klass`, and loses its `checked` input, which the `selected` model replaces (below). Bind `class` where you bound `klass`.
- **Models.** `IRadioFieldBase` gains the `selected` model, which holds the value of the radio that's checked, so the radios of a group bind one value, as native radios do.
- **Events.** `IRadioFieldBase` no longer emits `change`: listen to the `selected` model's update instead.
- **Peer dependency.** `@angular/core` moves from `>=17.3.0` to `^22`. Upgrade to Angular 22.
- **Subpaths.** The `./stories` entry is gone, with the Storybooks that read it. Nothing replaces it: the components' examples live in the repository.
- **Input types.** `IInput` and `IInputControlBase` take a `type` of `text`, `email`, `password`, `search`, `tel` or `url`, and `IInput` takes `textarea` too, since the bound value needs the input's type before it renders. A `number` input binds a number, not the string the `value` model holds. Use your own input for the other types.
- **Class names.** The headless parts' roots no longer carry their recipe's name as a class, like `button` on `IButtonBase`, since the styled components pass it with the recipe's other classes. Add the class yourself where you style a headless part by it.
