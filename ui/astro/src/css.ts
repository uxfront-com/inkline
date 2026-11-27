// tsdown (the astro build) never runs Vite plugins, so the styleframe plugin
// cannot emit the stylesheet there the way it does for the other frameworks. This
// is the entry of a CSS-only `vite build` that runs first; tsdown's `copy` lifts the
// extracted stylesheet into `dist/index.css`, the file `exports["./css"]` names.
import "virtual:styleframe.css";
