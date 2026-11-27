import { LANDING_PATHS } from "~/data/frameworks";
import { lastModified } from "../lib/git";

// The fields read below. Nitro's types don't see the collections Docus defines.
interface DocsPage {
  path: string;
  stem: string;
  extension: string;
}

// The sources that date the homepage and the framework landing pages.
const HOMEPAGE = "app/pages/index.vue";
const LANDING = ["app/pages/[framework].vue", "app/data/frameworks.ts"];

/**
 * Serves `/sitemap.xml`, which robots.txt points crawlers at, in place of the
 * layer's route. The layer lists the docs pages, and leaves `/` out when the
 * app has its own app/pages/index.vue, so this lists the homepage first, then
 * the framework landing pages (app/data/frameworks.ts), then the layer's
 * entries: each docs page once for each framework it covers, by
 * Docus's rules (`sitemap: false` in a page's frontmatter leaves it out, and
 * `modifiedAt` sets its `<lastmod>`).
 *
 * Every entry has a `<lastmod>`, by the last commit that changed its source
 * (server/lib/git.ts): the homepage by app/pages/index.vue, each landing page
 * by the later of its template and app/data/frameworks.ts, and each docs page
 * without `modifiedAt` by its markdown file, so its seven framework copies share
 * one date. A source with no Git date, like one not committed yet or a build
 * with no history, dates by the build's day in UTC.
 *
 * The layer drops its own handler when the app has this one. Docus still adds
 * the route to the prerendered ones.
 */
export default defineEventHandler(async (event) => {
  const { siteUrl } = useRuntimeConfig(event).public;
  const pages = (await queryCollection(event, "docs" as never).all()) as Array<DocsPage>;
  const sources = new Map(
    pages.map((page) => [page.path, `content/${page.stem}.${page.extension}`]),
  );

  const changed = lastModified(["content/docs", HOMEPAGE, ...LANDING]);
  const today = new Date().toISOString().slice(0, 10);
  const dateOf = (...files: Array<string>) =>
    files
      .map((file) => changed.get(file))
      .filter((date) => date !== undefined)
      .sort()
      .at(-1) ?? today;

  const landing = dateOf(...LANDING);
  const urls: Array<{ loc: string; lastmod: string }> = [
    { loc: "/", lastmod: dateOf(HOMEPAGE) },
    ...LANDING_PATHS.map((loc) => ({ loc, lastmod: landing })),
    ...(await getDocsSitemapEntries(event)).map(({ loc, path, lastmod }) => {
      const source = sources.get(path);
      return { loc, lastmod: lastmod ?? (source ? dateOf(source) : today) };
    }),
  ];

  setHeader(event, "Content-Type", "application/xml");
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map(({ loc, lastmod }) =>
      [
        "  <url>",
        `    <loc>${escapeXml(siteUrl + loc)}</loc>`,
        `    <lastmod>${escapeXml(lastmod)}</lastmod>`,
        "  </url>",
      ].join("\n"),
    ),
    "</urlset>",
  ].join("\n");
});

const XML_ENTITIES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&apos;",
};

function escapeXml(value: string) {
  return value.replaceAll(/[&<>"']/g, (char) => XML_ENTITIES[char]!);
}
