---
"@inkline/vue": minor
---

Build every component with Unframework, from its `.uf.tsx` source, in place of Inkline's compiler. Their Vue API changes as listed below.

**Breaking:**

- **Props.** `IRadioFieldBase` loses `checked`, which the `selected` model replaces (below). Bind the group's selected value to every radio's `selected` model instead of passing each its `checked` state.
- **Models.** `IRadioFieldBase` gains the `selected` model, which holds the value of the radio that's checked, so the radios of a group bind one value, as native radios do. Like `IRadioGroup`'s `value`, it starts `undefined`, so no radio is checked until the model holds a value, and a radio with no `value` starts unchecked. Its type is `string | undefined`, so the state you bind it to takes `undefined` too.
- **Events.** `IRadioFieldBase` no longer emits `change`: listen to the `selected` model's update instead.
- **Subpaths.** The `./stories` entry is gone, with the Storybooks that read it. Nothing replaces it: the components' examples live in the repository.
- **Input types.** `IInput` and `IInputControlBase` take a `type` of `text`, `email`, `password`, `search`, `tel` or `url`, and `IInput` takes `textarea` too, since the bound value needs the input's type before it renders. A `number` input binds a number, not the string the `value` model holds. Use your own input for the other types.
- **Attributes.** `IInputControlBase` renders one of several inputs, depending on `type`, and Vue passes a `class` and a `style` to the one it renders, so they still reach the native input. Nothing to change.
- **Class names.** The headless parts' roots no longer carry their recipe's name as a class, like `button` on `IButtonBase`, since the styled components pass it with the recipe's other classes. Add the class yourself where you style a headless part by it.
- **Events.** On `IButton` and `IButtonBase`, `@click` now listens to the component's `click` event, and on `IInputControlBase` and `IInputTextareaBase`, `@focus` and `@blur` listen to its `focus` and `blur` events. These carry no event object, where the listeners used to get the native event, so a handler can no longer call `preventDefault()` on a submit, stop the event or read its modifier keys. To reach the native event, listen with `@click` on a wrapping element, where the click still bubbles, and with `@focusin` and `@focusout` for the focus. A `$event` in these listeners is now `undefined`, and a `.prevent` or `.stop` modifier throws a `TypeError`: drop the modifier, and listen on a wrapping element instead.

**New:**

- **Props.** `IButton` and `IButtonBase` take `id`, `ariaLabel` and `ariaDescribedby`, which set the native button's `id`, `aria-label` and `aria-describedby`. An icon-only button takes its accessible name from `ariaLabel`.
- **Props.** `IInput`, `IInputControlBase` and `IInputTextareaBase` take `required`, `autocomplete`, `ariaLabel` and `ariaDescribedby`, which set the native control's attributes of those names.
- **Props.** `autocomplete` takes one autofill token, like `email` or `current-password`, from the set that every framework's types accept. That set leaves out `nickname`, `organization-title`, `cc-additional-name`, `language`, `bday`, `sex`, `url`, `photo` and `impp`, and every compound value: a `section-*` name, a `shipping` or `billing` group, a `home`, `work`, `mobile`, `fax` or `pager` contact type, and the `webauthn` hint. Use your own input where a field needs one of those.
- **Props.** `ICheckbox`, `ICheckboxControlBase`, `ISwitch` and `ISwitchControlBase` take `ariaLabel` and `ariaDescribedby`, which set the native control's `aria-label` and `aria-describedby`.
- **Props.** `IRadioGroup` and `IRadioGroupBase` take `ariaDescribedby`, which sets the radiogroup's `aria-describedby`.
- **Events.** `IButton` and `IButtonBase` emit `click` as the native button is clicked, which you listen to with `@click`. It carries no event object.
- **Events.** `IInput`, `IInputControlBase` and `IInputTextareaBase` emit `focus` and `blur` as the native control gains and loses focus, which you listen to with `@focus` and `@blur`. They carry no event object.
- **Events.** A `@focus` or `@blur` on `IInput` used to fall through to its wrapper, which never takes focus. It now hears the native control.
