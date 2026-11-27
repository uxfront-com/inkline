import type { Framework } from "@uxfront/ui/frameworks";

/**
 * One framework's landing page, at `/<value>`: `app/pages/[framework].vue`
 * renders it, and `nuxt.config.ts` and `server/routes/sitemap.xml.ts` list it.
 * The install command, the peer dependency and the example come from the
 * installation page (`content/docs/01.getting-started/01.installation.md`), so
 * keep them in step with it.
 */
export interface LandingFramework {
	/** The URL segment, and the framework's value in `docsTheme.frameworks`. */
	value: string;
	label: Framework;
	/** The package's install command, as the installation page gives it. */
	install: string;
	/** The meta-framework its readers build with, named in the copy as a place the package goes. */
	metaFramework: string;
	/** The package's peer dependency and the versions it takes, as the installation page gives them. */
	peer: { name: string; version: string };
	/** The bundled stylesheet's import. Angular and Qwik have none: their CSS is built from a `styleframe.config.ts`. */
	stylesheet?: string;
	/** The installation page's "Verify the install" snippet, with its file name. */
	example: { title: string; code: string };
	/** Other component libraries its readers may know, as plain names. */
	alternatives: Array<string>;
}

/** The landing pages, in the order of `docsTheme.frameworks` in `app/app.config.ts`. */
export const LANDING_FRAMEWORKS: Array<LandingFramework> = [
	{
		value: "react",
		label: "React",
		install: "npm install @inkline/react",
		stylesheet: "@inkline/react/css",
		metaFramework: "Next.js",
		peer: { name: "react", version: "18 or newer" },
		example: {
			title: "src/App.tsx",
			code: `import { IButton } from "@inkline/react";

export default function App() {
  return <IButton label="It works" color="primary" />;
}`,
		},
		alternatives: ["MUI", "shadcn/ui"],
	},
	{
		value: "vue",
		label: "Vue",
		install: "npm install @inkline/vue",
		stylesheet: "@inkline/vue/css",
		metaFramework: "Nuxt",
		peer: { name: "vue", version: "3 or newer" },
		example: {
			title: "src/App.vue",
			code: `<script setup lang="ts">
import { IButton } from "@inkline/vue";
</script>

<template>
  <IButton label="It works" color="primary" />
</template>`,
		},
		alternatives: ["Vuetify", "PrimeVue"],
	},
	{
		value: "svelte",
		label: "Svelte",
		install: "npm install @inkline/svelte",
		stylesheet: "@inkline/svelte/css",
		metaFramework: "SvelteKit",
		peer: { name: "svelte", version: "5 or newer" },
		example: {
			title: "src/App.svelte",
			code: `<script lang="ts">
  import { IButton } from "@inkline/svelte";
</script>

<IButton label="It works" color="primary" />`,
		},
		alternatives: ["Skeleton", "Flowbite Svelte"],
	},
	{
		value: "solid",
		label: "Solid",
		install: "npm install @inkline/solid",
		stylesheet: "@inkline/solid/css",
		metaFramework: "SolidStart",
		peer: { name: "solid-js", version: "1 or newer" },
		example: {
			title: "src/App.tsx",
			code: `import { IButton } from "@inkline/solid";

export default function App() {
  return <IButton label="It works" color="primary" />;
}`,
		},
		alternatives: ["Kobalte"],
	},
	{
		value: "angular",
		label: "Angular",
		install: "npm install @inkline/angular",
		metaFramework: "Analog",
		peer: { name: "@angular/core", version: "22" },
		example: {
			title: "src/app/app.component.ts",
			code: `import { Component } from "@angular/core";
import { IButton } from "@inkline/angular";

@Component({
  standalone: true,
  selector: "app-root",
  imports: [IButton],
  template: \`<uf-i-button label="It works" color="primary" />\`,
})
export class AppComponent {}`,
		},
		alternatives: ["Angular Material", "PrimeNG"],
	},
	{
		value: "qwik",
		label: "Qwik",
		install: "npm install @inkline/qwik",
		metaFramework: "Qwik City",
		peer: { name: "@qwik.dev/core", version: "2.0.0-rc.5" },
		example: {
			title: "src/routes/index.tsx",
			code: `import { component$ } from "@qwik.dev/core";
import { IButton } from "@inkline/qwik";

export default component$(() => <IButton label="It works" color="primary" />);`,
		},
		alternatives: ["Qwik UI"],
	},
	{
		value: "astro",
		label: "Astro",
		install: "npm install @inkline/astro",
		stylesheet: "@inkline/astro/css",
		metaFramework: "Astro",
		peer: { name: "astro", version: "7" },
		example: {
			title: "src/pages/index.astro",
			code: `---
import { IButton } from "@inkline/astro";
---

<IButton label="It works" color="primary" />`,
		},
		alternatives: [],
	},
];

/** The landing pages' paths, `/react` to `/astro`, for the prerender list and the sitemap. */
export const LANDING_PATHS = LANDING_FRAMEWORKS.map(({ value }) => `/${value}`);

/** Whether a one-segment path names a landing page. Every other one is a 404. */
export function isLandingFramework(value: unknown): boolean {
	return LANDING_FRAMEWORKS.some((framework) => framework.value === value);
}

/** The landing page's framework, by its URL segment. */
export function landingFramework(value: unknown): LandingFramework | undefined {
	return LANDING_FRAMEWORKS.find((framework) => framework.value === value);
}
