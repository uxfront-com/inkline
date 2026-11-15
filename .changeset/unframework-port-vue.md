---
"@inkline/vue": minor
---

Build every component with Unframework, from its `.uf.tsx` source, in place of Inkline's compiler. Their Vue API changes as listed below.

**Breaking:**

- **Props.** `IRadioFieldBase` loses `checked`, which the `selected` model replaces (below). Bind the group's selected value to every radio's `selected` model instead of passing each its `checked` state.
- **Models.** `IRadioFieldBase` gains the `selected` model, which holds the value of the radio that's checked, so the radios of a group bind one value, as native radios do.
- **Events.** `IRadioFieldBase` no longer emits `change`: listen to the `selected` model's update instead.
- **Subpaths.** The `./stories` entry is gone, with the Storybooks that read it. Nothing replaces it: the components' examples live in the repository.
- **Input types.** `IInput` and `IInputControlBase` take a `type` of `text`, `email`, `password`, `search`, `tel` or `url`, and `IInput` takes `textarea` too, since the bound value needs the input's type before it renders. A `number` input binds a number, not the string the `value` model holds. Use your own input for the other types.
- **Class names.** The headless parts' roots no longer carry their recipe's name as a class, like `button` on `IButtonBase`, since the styled components pass it with the recipe's other classes. Add the class yourself where you style a headless part by it.
