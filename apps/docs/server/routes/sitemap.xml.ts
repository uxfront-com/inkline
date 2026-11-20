import { LANDING_PATHS } from "~/data/frameworks";

/**
 * Serves `/sitemap.xml`, which robots.txt points crawlers at, in place of the
 * layer's route. The layer lists the docs pages, and leaves `/` out when the
 * app has its own app/pages/index.vue, so this lists the homepage first, then
 * the framework landing pages (app/data/frameworks.ts), then the layer's
 * entries: each docs page once for each framework it covers, by
 * Docus's rules (`sitemap: false` in a page's frontmatter leaves it out, and
 * `modifiedAt` sets its `<lastmod>`).
 *
 * The layer drops its own handler when the app has this one. Docus still adds
 * the route to the prerendered ones.
 */
export default defineEventHandler(async (event) => {
  const { siteUrl } = useRuntimeConfig(event).public;
  const urls: { loc: string; lastmod?: string }[] = [
    { loc: "/" },
    ...LANDING_PATHS.map((loc) => ({ loc })),
    ...(await getDocsSitemapEntries(event)),
  ];

  setHeader(event, "Content-Type", "application/xml");
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map(({ loc, lastmod }) =>
      [
        "  <url>",
        `    <loc>${escapeXml(siteUrl + loc)}</loc>`,
        ...(lastmod ? [`    <lastmod>${escapeXml(lastmod)}</lastmod>`] : []),
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
  return value.replace(/[&<>"']/g, (char) => XML_ENTITIES[char]!);
}
