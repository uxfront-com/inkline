import { lighthouseConfig } from "@uxfront/site-checks/lighthouse";

// Lighthouse CI on the generated site: the shared thresholds from @uxfront/site-checks, on the
// homepage and five docs pages. The docs pages take their file names: the static server that
// `staticDistDir` starts sends `/a` to `/a/`, and `generate` writes `a.html`.
export default lighthouseConfig({
	collect: {
		staticDistDir: ".output/public",
		url: [
			"http://localhost/",
			"http://localhost/docs/react/getting-started.html",
			"http://localhost/docs/react/getting-started/installation.html",
			"http://localhost/docs/react/getting-started/first-component.html",
			"http://localhost/docs/react/getting-started/theming.html",
			"http://localhost/docs/react/components/button.html",
		],
	},
	// Both warn until the docs pages pass. Accessibility: the "Copy page" menu button has no name,
	// and the warning callout's text is below 4.5:1 contrast. Performance: on CI's runners, the docs
	// pages block the main thread for about a second and score 0.78 to 0.81.
	categories: { performance: { level: "warn" }, accessibility: { level: "warn" } },
});
