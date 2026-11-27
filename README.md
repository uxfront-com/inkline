# Inkline

A UI library in seven frameworks: each component is written once in `ui/components` and compiled to React, Vue, Svelte, Solid, Angular, Qwik and Astro, styled with Styleframe. Start with [`AGENTS.md`](./AGENTS.md) and [`docs/contributing.md`](./docs/contributing.md).

## Where this fits

Inkline is the UI library of [UXFront](https://uxfront.com), and the layer where the other projects meet. Each component follows its [Open Components](https://opencomponents.dev) standard, takes its look from a recipe written with [Styleframe](https://styleframe.dev) and is compiled to every framework by [Unframework](https://unframework.dev). The Open Components and Styleframe sites embed Inkline's live examples from its preview at [preview.inkline.io](https://preview.inkline.io), rather than copying them. The [UXFront vision](https://github.com/uxfront-com/.github/blob/main/VISION.md) says how the five projects fit together and which one owns what.

## Development

- Check everything is ready:

```bash
pnpm run ready
```

- Run the tests:

```bash
pnpm run test
```

- Build the monorepo:

```bash
pnpm run build
```

- Run the development server:

```bash
pnpm run dev
```
