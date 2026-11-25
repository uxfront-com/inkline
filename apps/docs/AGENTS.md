# website

The documentation and marketing site for Inkline. Private (`"private": true` in [`package.json`](./package.json)), so it's never published to npm. It deploys to Vercel and to Cloudflare Workers as a fully prerendered static site with zero serverless functions: see [ADR-007](../../docs/adrs/007-website-ships-as-a-static-site.md), [`vercel.json`](./vercel.json) and [`wrangler.json`](./wrangler.json).

The site is a copy of the [Open Components](https://github.com/uxfront-com/open-components) site shell, on the same published packages: [`@uxfront/layer-ui`](https://www.npmjs.com/package/@uxfront/layer-ui) for the homepage kit, [`@uxfront/layer-docs`](https://www.npmjs.com/package/@uxfront/layer-docs) for the docs theme (Docus plus a framework switcher), [`@uxfront/ui`](https://www.npmjs.com/package/@uxfront/ui) for the homepage components and [`@uxfront/scene`](https://www.npmjs.com/package/@uxfront/scene) for its WebGL scene. This app supplies Inkline's brand, its homepage and its markdown.

## Layout

```
apps/docs/
├── nuxt.config.ts            # extends layer-ui + layer-docs, framework URLs, site URL, redirects,
│                             # Vercel edge rules, the Cloudflare preset under WORKERS_CI
├── wrangler.json             # the inkline Worker: dist/ as static assets
├── app/
│   ├── app.vue               # mounts Docus under /docs, the homepage everywhere else; title template
│   ├── app.config.ts         # GitHub links, docsTheme (frameworks, wordmark, byline,
│   │                         # headerLinks), ui colours
│   ├── app.css               # Inkline's purple scale and --ui-primary, Tailwind @source lines
│   ├── error.vue             # UxErrorPage
│   ├── pages/index.vue       # the homepage: UxSite, SiteHeader, UxHero, UxChapter, UxFinale
│   ├── pages/[framework].vue # the framework landing pages, /react to /astro
│   ├── components/
│   │   ├── app/              # AppHeaderCTA, AppHeaderBody: the layer's header with the
│   │   │                     # version select; VersionSelect (<AppVersionSelect>)
│   │   └── site/             # SiteHeader: the homepage's and landing pages' header
│   ├── data/frameworks.ts    # LANDING_FRAMEWORKS: one entry per landing page
│   ├── data/site.ts          # DOCS_URL, GITHUB_URL, SITE_DESCRIPTION, SHARE_IMAGE
│   └── data/versions.ts      # VERSIONS: v5 (this site), v4, v3, v2
├── public/share.png          # the homepage's and landing pages' share image, 1200 × 630
├── scripts/fetch-history.mjs # before `nuxt generate`: unshallows the clone for the sitemap's dates
├── server/
│   ├── routes/sitemap.xml.ts # the homepage, the landing pages, then getDocsSitemapEntries(),
│   │                         # each dated by Git
│   ├── middleware/raw-markdown.ts  # /raw/<path>.md from each page's source; the layer
│   │                               # serves the /raw/docs/<framework>/… twins from it
│   └── lib/                  # headers, docs, raw, git (lastModified())
├── test/                     # brand palette, embed helpers, versions, frameworks, git;
│                             # site.build.test.ts after generate
└── content/
    ├── _compiler/            # parked, unrouted: compiler pages awaiting /compiler
    └── docs/
        ├── 01.getting-started/  # .navigation.yml, 00.index, 01.installation,
        │                        # 02.first-component, 03.theming, 04.framework-support
        └── 03.components/       # .navigation.yml, 01.button
```

## Shared and local

- **From the packages (don't copy or edit here):** Docus's header, sidebar, search, table of contents, colour mode, llms.txt, robots.txt and OG images; the layer's `FrameworkSwitcher`, Framework select, header wordmark and header links (`AppHeaderLinks`, from `docsTheme.headerLinks`), its framework URLs, `docsPath()` and the sitemap's docs entries (`getDocsSitemapEntries()`); the homepage components and the scene. If a build needs a package change, flag it upstream rather than forking the package into this app.
- **Copied from Open Components:** `app/app.vue`, `app/error.vue`, `server/`, and the generic parts of `nuxt.config.ts` and `app/app.config.ts`. Keep them close to the source, so a fix there carries over. Framework URLs moved three of them away from that copy: the framework title template in `app/app.vue`, the `/docs` redirect in `nuxt.config.ts` and `server/routes/sitemap.xml.ts`, which lists the layer's entries in place of its own query.
- **Local to this app:** the brand (`app/app.config.ts`, `app/app.css`), the header overrides in `app/components/app/`, which compose the layer's `AppHeaderLinks` and `AppHeaderFramework` around the Version select, the homepage and the framework landing pages, the embed port, the Vercel rules, the Cloudflare config and all markdown under `content/`.

## Docs content

Docus renders `content/docs/` under `/docs`, once for each framework: framework URLs are on (`frameworkUrls` in `nuxt.config.ts`, and "Framework URLs" in the [`@uxfront/layer-docs` README](https://www.npmjs.com/package/@uxfront/layer-docs)). The numeric prefixes order the sidebar and are stripped from the URL: `01.getting-started/01.installation.md` is served at `/docs/react/getting-started/installation`, `/docs/vue/getting-started/installation` and so on, and `00.index.md` at `/docs/<framework>/getting-started`. The unprefixed `/docs/getting-started/installation` isn't built, and `/docs` redirects to the first framework's introduction.

Each section folder has a `.navigation.yml` with its sidebar title and icon. There is no section registry: a section shows once its folder holds a page.

Give links between pages a path without a framework, like `/docs/getting-started/theming`: the layer puts them under the page's framework, and so does `DOCS_URL` in `docsTheme.headerLinks`. Links outside the docs shell, like the homepage's, take their URL from `docsPath("/getting-started")`, which gives the first framework there. Keep content folders from sharing a name with a framework, and keep every other top-level page off a framework's name, since `/<framework>` is its landing page.

Each page's markdown is served at `/raw/docs/<page>.md`, which `llms.txt` lists and which holds every framework's examples, and at `/raw/docs/<framework>/<page>.md`, the same file, which Docus's "Copy page" fetches.

## Multi-framework examples

The URL decides the framework: `/docs/vue/components/button` shows the Vue slot of every `::framework-switcher` on the page, before any script runs, and its title reads "Button - Inkline Vue". The Framework select above the sidebar (in the header's menu below 768px) goes to the same page under the framework the reader picks. localStorage only remembers the last pick. Each built page carries only its framework's slot. The seven frameworks, in Inkline's order, are `docsTheme.frameworks` in `app/app.config.ts`, and the first one, React, is the one `/docs` and the homepage link to: reorder the list, and change the `/docs` redirect in `nuxt.config.ts` with it.

The Button page shows a code sample for each framework inside its slot:

````md
::framework-switcher
#react

```tsx
<IButton label="Save" color="primary" />
```

#angular

```html
<uf-i-button label="Save" color="primary" />
```

::
````

The pages show no live component yet. `unframework preview`, which renders the examples on every target, deploys as static sites of its own from `ui/components`, one with every target and one per framework ([its `AGENTS.md`](../../ui/components/AGENTS.md)), and no page embeds them.

## Framework landing pages

Each framework has a landing page at its own URL, `/react` to `/astro`, for readers who search for one framework's components. One template, `app/pages/[framework].vue`, renders them all from one entry each in `app/data/frameworks.ts`: the install command, the peer dependency, the stylesheet import and the example come from the installation page, and the meta-framework and the other libraries named in the copy are the entry's own. `frameworks.test.ts` fails when the entries and `docsTheme.frameworks` differ, or when an entry no longer matches the installation page, so a new framework needs an entry there too.

The page validates its segment against the entries, so every other one-segment path stays a 404. It reads the framework from the URL only, never from `useFramework()`, which follows the reader's stored pick once mounted. Each page shows only its own `@inkline/<framework>`, and every docs link on it is `docsPath(…, framework)`, so it lands on that framework's docs. Nothing links to the landing pages yet, so `nuxt.config.ts` adds them to the prerendered routes, and `server/routes/sitemap.xml.ts` lists them after the homepage.

The landing pages' copy is a draft until Alex approves it, before the site goes live on `inkline.io`.

## Sitemap dates and share images

Every URL in the sitemap has a `<lastmod>`: the UTC day of the last commit that changed its source, from `lastModified()` in `server/lib/git.ts`. The homepage dates by `app/pages/index.vue`, each landing page by the later of `app/pages/[framework].vue` and `app/data/frameworks.ts`, and each docs page by its markdown file, so its seven framework copies share one day. A page's `modifiedAt` wins over Git, and a source with no Git date takes the build's day.

The dates need the repository's history. `generate` runs `scripts/fetch-history.mjs` first, which fetches the full history when the clone is shallow, as some hosts' clones are. It never stops the build: when the fetch fails, every page dates by the one commit the clone has, and with no Git at all, by the build day. Its `fetch-history:` line in the build log says which happened.

A shared link shows a 1200 × 630 image. The docs pages generate theirs with nuxt-og-image, at the size `ogImage.defaults` in `nuxt.config.ts` sets, since its own default is 1200 × 600.

The homepage and the seven landing pages share `public/share.png`, `SHARE_IMAGE` in `app/data/site.ts`: a screenshot of the homepage hero with the scene ready, and with the header's links, the button, the scroll hint and the HUD hidden (`.ux-header__nav`, `.ux-header__end`, `.ux-hero .ux-pill-link`, `.ux-hero__scroll`, `.ux-hud`). Take it again when the hero changes, at a 1200 × 630 viewport, and keep it under 300 KB. The scene's particles keep a full 256-colour PNG near 400 KB, so the current image is quantised at quality 75, with sharp's `png({ palette: true, quality: 75 })`, to 208 KB. `test:build` checks its size and the share tags on all eight pages.

## Version select

Both headers have a Version select that shows v5, this site, and lists the older docs sites: v4, v3 and v2, each at `https://v<n>.inkline.io/`. The list is `app/data/versions.ts`, and `app/components/app/VersionSelect.vue` renders it on Nuxt UI's `USelect`. Nuxt names it `AppVersionSelect`, after its folder. It sits before the GitHub link in `SiteHeader`'s actions, on the homepage and the landing pages, and in the docs header (`AppHeaderCTA`), and in the docs header's menu below 768px, under the Framework select (`AppHeaderBody`).

Picking a version opens its site in the same tab. Only a click, or Enter or Space on an option, picks one: the arrow keys move through the open list without leaving the page. Keep it off a native `<select>`, which fires `change` on each arrow key on Windows and Linux.

The homepage and the landing pages paint before Tailwind loads, so `SiteHeader` styles the trigger like its header links. Those rules are unlayered and win over Nuxt UI's, whose text colour follows the docs' colour mode. The open list follows that colour mode, light or dark.

## Running

```bash
pnpm --filter website dev   # nuxt dev with HMR
```

## Build

```bash
pnpm --filter website generate     # static prerender → .output/public
pnpm --filter website test         # source tests: the brand palette, the embed helpers, the versions,
                                   # the landing pages' entries, the sitemap's Git dates
pnpm --filter website test:build   # after generate: the files the deploy needs, the Version select, no assistant,
                                   # framework URLs, titles, links, the sitemap, the markdown twins
                                   # and the landing pages with their share image
```

`generate` is the build that ships. It runs `scripts/fetch-history.mjs`, then `nuxt generate`, which fails on any page that doesn't prerender (`nitro.prerender.failOnError`). `build` (node-server) is a local convenience only: it emits no `robots.txt`, `200.html` or `404.html`, all of which the deploy needs.

## Deploy

Two hosts build the same static site: Vercel and Cloudflare Workers Builds.

On Vercel, it's fully static. `vercel.json` sets `NITRO_PRESET=vercel_static`, which writes the Build Output API bundle to `.vercel/output`: `static/` only, no `functions/`. Copy `.env.example` to `.env` for local work. Every `NUXT_PUBLIC_*` value is baked into the HTML at build time, so changing one on Vercel takes a rebuild, not a restart.

Docus's server features have nothing to run on here, so they're off: `mcp.enabled: false` and `docus.assistant.enabled: false`, which also keeps the assistant's button out of the docs header when the build can reach an AI gateway (`VERCEL_OIDC_TOKEN`). A `nitro:config` hook drops the assistant's endpoint from the public runtime config, where Docus writes it even when it's off.

The `/` → `/llms.txt` negotiation for agents and curl is two edge rules in `nitro.vercel.config.routes` in [`nuxt.config.ts`](./nuxt.config.ts), not in `vercel.json`, whose `routes` and `redirects` Vercel ignores once `.vercel/output/config.json` exists. On Vercel builds, Docus now writes the same negotiation as rewrites to `/llms.txt` and `/raw/<path>.md` ahead of those two rules. Any other server-only behaviour needs the same treatment or it does nothing; ADR-007 records this as a standing cost.

On Cloudflare, set the `inkline` Worker's build command to `pnpm run generate`. [`wrangler.json`](./wrangler.json) serves `dist/` as static assets, with `404.html` for any path that has no file (`not_found_handling`). Workers Builds sets `WORKERS_CI`, which Nitro reads to pick its `cloudflare-module` server preset, even under `nuxt generate`. That preset writes `.wrangler/deploy/config.json`, which Wrangler prefers over `wrangler.json`, so `nuxt.config.ts` sets `nitro.preset` to `cloudflare_pages_static` when `WORKERS_CI` is set:

- It writes `dist/` with a `_headers` file built from `routeRules`, so the security headers and the `/_nuxt/**` cache carry over.
- A `nitro:init` hook drops the `/* /404.html 404` line it writes to `_redirects`, because Workers rejects 404 as a redirect status and fails the deploy.
- Keep `NITRO_PRESET` off the `inkline` Worker. `nuxt generate` passes it as an override that wins over `nitro.preset`, and Vercel relies on exactly that.
- The pin applies only under `WORKERS_CI`, so the local and CI `generate` keep writing `.output/public`, which `test:build` reads.

The `/` → `/llms.txt` negotiation is Vercel-only, so on Cloudflare `/` always serves the homepage. The Worker's root directory, build and deploy commands and variables live in the Cloudflare dashboard, not in the repo.

## Conventions

- `typescript` is pinned to `catalog:ts6` here: `@vue/compiler-sfc` breaks under the default TS7 catalog.
- Every `@uxfront/*` version is covered by the `@uxfront/*` glob in the root `pnpm-workspace.yaml` `minimumReleaseAgeExclude`, since they're often published days before this app takes them.
- The root `"@nuxt/vite-builder>vite"` override gives the Nuxt builder upstream vite rather than vite-plus. Keep its range on the vite line `@nuxt/vite-builder` declares for the Nuxt in the lockfile.
- `buildDir` is pinned to `.nuxt` in `nuxt.config.ts`. Nuxt 4.6 otherwise moves `build` and `generate` to `node_modules/.cache/nuxt`, where the root type check can't see Nitro's auto-imports.
- `ui.colors.primary: "purple"` resolves onto the purple scale in `app/app.css`, based on the brand mark's `#863bff`. Keep the two in step.
- Only document real, shipped components. The Button page mirrors `ui/components`'s `IButton` examples, in `src/components/button/examples/`.

## Known gaps

- **Live examples:** the component pages show code, not rendered components, and don't embed the deployed preview.
- **Agent discovery on a static host:** the lockfile holds Docus 5.13.0. Docus 5.14 adds `nuxt-agent-discovery` and a prerendered `/openapi.json` that describes each page's Markdown twin and the MCP endpoint, which is off here. Only what's prerendered survives on a static host, and its server routes are inert, so check what both claim when Docus is bumped.

## See also

- [docs/contributing.md](../../docs/contributing.md): repo-wide dev loops.
- [`@uxfront/layer-docs`](https://www.npmjs.com/package/@uxfront/layer-docs): the docs layer.
