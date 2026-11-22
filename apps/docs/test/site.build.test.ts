import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { LANDING_FRAMEWORKS } from "../app/data/frameworks.ts";

/**
 * Checks the static site `nuxt generate` wrote to `.output/public`.
 *
 * Requires a prior `generate`. Excluded from the default `vp test` run (see
 * `vite.config.ts`); runs via `test:build` in the Build Website CI job, against
 * the artifact that job just produced.
 */
const output = fileURLToPath(new URL("../.output/public", import.meta.url));

const SITE_URL = "https://inkline.io";

// docsTheme.frameworks in app/app.config.ts, in order. Every docs page is built
// under each, at /docs/<framework>/<page>.
const FRAMEWORKS = ["react", "vue", "svelte", "solid", "angular", "qwik", "astro"];
const LABELS: Record<string, string> = {
  react: "React",
  vue: "Vue",
  svelte: "Svelte",
  solid: "Solid",
  angular: "Angular",
  qwik: "Qwik",
  astro: "Astro",
};

// Docus prerenders `route.html` rather than `route/index.html`
// (`autoSubfolderIndex: false`), so every docs URL that resolves is one file.
const files = [
  "index.html",
  "docs.html",
  "docs/react/getting-started.html",
  "docs/react/getting-started/installation.html",
  "docs/react/getting-started/first-component.html",
  "docs/react/getting-started/theming.html",
  "docs/react/getting-started/framework-support.html",
  "docs/react/components/button.html",
  "llms.txt",
  "sitemap.xml",
  "robots.txt",
  "200.html",
  "404.html",
  ...FRAMEWORKS.map((framework) => `${framework}.html`),
];

function* walk(dir: string): Generator<string> {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else yield path;
  }
}

const read = (file: string) => readFileSync(join(output, file), "utf8");

/** Every built `.html` file, as a path relative to the output with `/` separators. */
const htmlFiles = () =>
  [...walk(output)]
    .filter((file) => file.endsWith(".html"))
    .map((file) => relative(output, file).split(sep).join("/"));

/** The framework of a file under `docs/<framework>/`, if it's in one. */
const frameworkOf = (file: string) =>
  FRAMEWORKS.find((framework) => file.startsWith(`docs/${framework}/`));

/** The framework of a landing page, `<framework>.html` at the top level. */
const landingOf = (file: string) => FRAMEWORKS.find((framework) => file === `${framework}.html`);

const isNoindex = (html: string) => /<meta[^>]*name="robots"[^>]*content="[^"]*noindex/.test(html);

describe("the generated site", () => {
  it.each(files)("has %s", (file) => {
    expect(existsSync(join(output, file))).toBe(true);
  });

  // The compiler pages are parked in content/_compiler/, so nothing about the
  // compiler reaches the homepage.
  it("keeps the compiler out of the homepage", () => {
    expect(readFileSync(join(output, "index.html"), "utf8")).not.toMatch(/compil/i);
  });

  // A closed select prerenders its trigger only, so the options and their URLs
  // are checked in versions.test.ts.
  it.each(["index.html", "docs/react/getting-started.html", "vue.html"])(
    "renders the Version select on %s, showing v5",
    (file) => {
      const html = readFileSync(join(output, file), "utf8");
      const trigger = html.match(/<button[^>]*aria-label="Version"[^>]*>.*?<\/button>/s)?.[0];
      expect(trigger).toMatch(/role="combobox"/);
      expect(trigger?.replace(/<[^>]*>/g, "").trim()).toBe("v5");
    },
  );

  it.each([
    ["index.html", "react"],
    ["docs/react/getting-started.html", "react"],
    ...FRAMEWORKS.map((framework) => [`${framework}.html`, framework]),
  ])(
    "places the Version select between the Documentation and GitHub links on %s",
    (file, framework) => {
      const header =
        readFileSync(join(output, file), "utf8").match(/<header.*?<\/header>/s)?.[0] ?? "";
      const docs = header.indexOf(`href="/docs/${framework}/getting-started"`);
      const version = header.indexOf('aria-label="Version"');
      const github = header.indexOf('href="https://github.com/inkline/inkline"');
      expect(docs).toBeGreaterThan(-1);
      expect(version).toBeGreaterThan(docs);
      expect(github).toBeGreaterThan(version);
    },
  );

  // The assistant needs a server route a static host doesn't have.
  it("ships no Docus assistant", () => {
    const hits = [...walk(output)].filter((file) =>
      readFileSync(file, "utf8").includes("__docus__/assistant"),
    );
    expect(hits).toEqual([]);
  });
});

describe("framework URLs", () => {
  // B1: each page carries only its framework's examples.
  it.each(FRAMEWORKS)("docs/%s/components/button.html shows only %s", (framework) => {
    const html = read(`docs/${framework}/components/button.html`);
    expect(html).toContain(`@inkline/${framework}`);
    for (const other of FRAMEWORKS.filter((value) => value !== framework)) {
      expect(html).not.toMatch(new RegExp(`@inkline/${other}(?![a-z])`));
    }
  });

  // B5 and D11: no docs page is built outside a framework, and the old URLs go.
  it("builds every docs page under a framework", () => {
    const outside = htmlFiles().filter((file) => file.startsWith("docs/") && !frameworkOf(file));
    expect(outside).toEqual([]);
    expect(htmlFiles().filter((file) => file.startsWith("docs/guide"))).toEqual([]);
    expect(existsSync(join(output, "docs/getting-started.html"))).toBe(false);
    expect(existsSync(join(output, "docs/components"))).toBe(false);
  });

  it("builds each docs page once for each framework", () => {
    const pages = htmlFiles()
      .filter((file) => file.startsWith("docs/react/"))
      .map((file) => file.slice("docs/react/".length));
    expect(pages.length).toBeGreaterThan(0);
    for (const framework of FRAMEWORKS) {
      const built = htmlFiles()
        .filter((file) => file.startsWith(`docs/${framework}/`))
        .map((file) => file.slice(`docs/${framework}/`.length));
      expect(built.sort()).toEqual([...pages].sort());
    }
  });

  it("redirects /docs to the first framework's introduction", () => {
    expect(read("docs.html")).toContain(`url=/docs/${FRAMEWORKS[0]}/getting-started"`);
  });

  // D7: links keep the framework.
  it("links only to docs pages under a framework, and under the page's own", () => {
    const offenders: string[] = [];
    for (const file of htmlFiles()) {
      const html = read(file);
      const own = frameworkOf(file) ?? landingOf(file);
      const prefix = own ? `/docs/${own}/` : new RegExp(`^/docs/(${FRAMEWORKS.join("|")})/`);
      // Canonical and alternate links are absolute, so this skips them.
      const hrefs = [...html.matchAll(/href="(\/docs[^"]*)"/g)].map((match) => match[1]!);
      const jsonLd = [
        ...html.matchAll(/<script type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs),
      ].flatMap(([, json]) =>
        [...json!.matchAll(/https:\/\/inkline\.io(\/docs[^"]*)/g)].map((match) => match[1]!),
      );
      for (const url of [...hrefs, ...jsonLd]) {
        const ok = typeof prefix === "string" ? url.startsWith(prefix) : prefix.test(url);
        if (!ok) offenders.push(`${file}: ${url}`);
      }
    }
    expect(offenders).toEqual([]);
  });

  it("links the homepage's three docs links to the first framework's introduction", () => {
    const body = read("index.html").match(/<body.*<\/body>/s)?.[0] ?? "";
    const hrefs = [...body.matchAll(/href="(\/docs[^"]*)"/g)].map((match) => match[1]);
    expect(hrefs).toEqual(Array(3).fill(`/docs/${FRAMEWORKS[0]}/getting-started`));
  });

  // D9: a page that covers every framework is canonical at its own URL, with an
  // alternate for each other framework.
  it("gives docs/vue/components/button.html its canonical and alternates", () => {
    const html = read("docs/vue/components/button.html");
    const canonical = [...html.matchAll(/<link rel="canonical" href="([^"]*)"/g)].map(
      (match) => match[1],
    );
    expect(canonical).toEqual([`${SITE_URL}/docs/vue/components/button`]);
    const alternates = [...html.matchAll(/<link rel="alternate" href="([^"]*)"/g)].map(
      (match) => match[1] ?? "",
    );
    expect(alternates.sort()).toEqual(
      FRAMEWORKS.filter((value) => value !== "vue")
        .map((value) => `${SITE_URL}/docs/${value}/components/button`)
        .sort(),
    );
    expect(isNoindex(html)).toBe(false);
  });

  // D10: titles name the framework, and only on a framework page.
  it.each([
    ["docs/vue/components/button.html", "Button - Inkline Vue"],
    ["docs/qwik/getting-started.html", "Introduction - Inkline Qwik"],
  ])("titles %s %j", (file, title) => {
    expect(read(file).match(/<title>([^<]*)<\/title>/)?.[1]).toBe(title);
  });

  it("names the framework in the title of every framework page", () => {
    for (const file of htmlFiles().filter(frameworkOf)) {
      const title = read(file).match(/<title>([^<]*)<\/title>/)?.[1];
      expect(title, file).toMatch(new RegExp(` - Inkline ${LABELS[frameworkOf(file)!]}$`));
    }
  });

  it.each(["index.html", "404.html"])("names no framework in the title of %s", (file) => {
    const title = read(file).match(/<title>([^<]*)<\/title>/)?.[1] ?? "";
    for (const label of Object.values(LABELS)) expect(title).not.toContain(`Inkline ${label}`);
  });
});

// B4: the sitemap lists the homepage and each indexable docs page under each
// framework, once each.
describe("the sitemap", () => {
  it("lists / and every indexable framework page, once each", () => {
    const locs = [...read("sitemap.xml").matchAll(/<loc>([^<]*)<\/loc>/g)].map((match) =>
      match[1]!.replace(SITE_URL, ""),
    );
    expect(new Set(locs).size).toBe(locs.length);

    const expected = [
      "/",
      ...htmlFiles()
        .filter(landingOf)
        .map((file) => `/${file.replace(/\.html$/, "")}`),
      ...htmlFiles()
        .filter((file) => frameworkOf(file) && !isNoindex(read(file)))
        .map((file) => `/${file.replace(/\.html$/, "")}`),
    ];
    expect([...locs].sort()).toEqual(expected.sort());
    // `/`, six pages under each of the seven frameworks, and the seven landing pages.
    expect(locs).toHaveLength(50);
  });
});

// D12: every URL llms.txt lists is built, the framework-neutral markdown twins
// included, which no page links to any more.
describe("markdown twins", () => {
  // The way the static hosts resolve a URL: the file, then `.html`, then `/index.html`.
  const resolves = (path: string) =>
    [path, `${path}.html`, `${path}/index.html`].some((file) => {
      const full = join(output, decodeURIComponent(file));
      return existsSync(full) && statSync(full).isFile();
    });

  it("builds every same-site URL in llms.txt", () => {
    const urls = [...read("llms.txt").matchAll(/\]\(((?:https:\/\/inkline\.io)?\/[^)\s]*)\)/g)].map(
      (match) => match[1]!.replace(SITE_URL, ""),
    );
    expect(urls.length).toBeGreaterThan(0);
    expect(urls.filter((url) => !resolves(url))).toEqual([]);
  });

  it("serves the same markdown at the neutral and the framework path", () => {
    const neutral = read("raw/docs/components/button.md");
    expect(neutral).toContain("@inkline/react");
    expect(neutral).toContain("@inkline/astro");
    for (const framework of FRAMEWORKS) {
      expect(read(`raw/docs/${framework}/components/button.md`)).toBe(neutral);
    }
  });
});

// D13: a landing page for each framework, at /<framework>, built from
// app/data/frameworks.ts, and no other one-segment page.
describe("the framework landing pages", () => {
  it("builds only the homepage, the redirect, the error pages and the seven at the top level", () => {
    const top = htmlFiles().filter((file) => !file.includes("/"));
    expect(top.sort()).toEqual(
      [
        "index.html",
        "200.html",
        "404.html",
        "docs.html",
        ...FRAMEWORKS.map((f) => `${f}.html`),
      ].sort(),
    );
  });

  it.each(LANDING_FRAMEWORKS)("builds $value.html for $label", ({ value, label, install }) => {
    const html = read(`${value}.html`);
    expect(html.match(/<h1[\s>]/g)).toHaveLength(1);
    const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "";
    expect(title).toContain(label);
    expect(title.match(/Inkline/g)).toHaveLength(1);
    expect(html).toMatch(/<meta name="description" content="[^"]+"/);
    const canonical = [...html.matchAll(/<link rel="canonical" href="([^"]*)"/g)].map(
      (match) => match[1],
    );
    expect(canonical).toEqual([`${SITE_URL}/${value}`]);
    expect(html).toContain(install);
    expect(html).toContain(`href="/docs/${value}/getting-started"`);
  });

  // D13a: each page shows its own package only.
  it.each(FRAMEWORKS)("shows only @inkline/%s on its landing page", (framework) => {
    const html = read(`${framework}.html`);
    expect(html).toContain(`@inkline/${framework}`);
    for (const other of FRAMEWORKS.filter((value) => value !== framework)) {
      expect(html).not.toMatch(new RegExp(`@inkline/${other}(?![a-z])`));
    }
  });
});
