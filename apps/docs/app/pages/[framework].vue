<script setup lang="ts">
import { corridor, ink, outline, stack } from "@uxfront/scene/formations";
import { FRAMEWORKS } from "@uxfront/ui";

import { isLandingFramework, landingFramework } from "~/data/frameworks";
import { GITHUB_URL, SHARE_IMAGE } from "~/data/site";

// A framework's landing page, /react to /astro, from its entry in
// app/data/frameworks.ts. Every other one-segment path is a 404.
definePageMeta({
	validate: (route) => isLandingFramework(route.params.framework),
});

// From the URL only. Off a docs route, useFramework() follows the reader's
// stored pick once mounted, which would change the page on hydration.
const route = useRoute();
const framework = landingFramework(route.params.framework)!;
const { label, value, install, peer, stylesheet, example, alternatives } = framework;
const pkg = `@inkline/${value}`;
const app =
	framework.metaFramework === label
		? `your ${label} app`
		: `your ${label} or ${framework.metaFramework} app`;

// Draft copy, for Alex's approval before the site goes live on inkline.io.
useUxHead({
	title: `${label} UI components - Inkline`,
	description: `Inkline for ${label}: accessible UI components in one native package, ${pkg}, themed with Styleframe and ready for ${app}.`,
	siteName: "Inkline",
	path: `/${value}`,
	sameAs: [GITHUB_URL],
	image: SHARE_IMAGE,
});

// Every docs link stays under this page's framework.
const docsUrl = docsPath("/getting-started", value);
const installUrl = docsPath("/getting-started/installation", value);

// The hero pours ink, the install chapter gathers around its code panel, and
// the stack deals the same component onto seven cards, one per framework.
const scene = [
	ink({ label: `Inkline for ${label}` }),
	outline({ label: "Install", lines: true }),
	stack({ label: "Why Inkline" }),
	corridor({ label: "Build with it" }),
];

const nav = [
	{ href: "#install", label: "Install", index: "01" },
	{ href: "#why", label: "Why Inkline", index: "02" },
];

const steps = [
	{ term: "Install", detail: install },
	{ term: "Peer dependency", detail: `${peer.name} ${peer.version}` },
	{
		term: "Styles",
		detail: stylesheet ? `import "${stylesheet}"` : "Built from your styleframe.config.ts",
	},
];

const coming =
	alternatives.length > 0
		? `Coming from ${alternatives.join(" or ")}? Here's what you get with Inkline:`
		: `Here's what you get with Inkline in ${app}:`;

const traits = [
	{
		title: "A native package",
		text: `${pkg} is ${label} components, with no wrapper layer and no shared runtime.`,
	},
	{
		title: "Accessible by default",
		text: "Each component starts from a native element or the WAI-ARIA pattern for its widget, so it works with a keyboard and a screen reader.",
	},
	{
		title: "Themed with Styleframe",
		text: "Give the design tokens preset your brand colour, and it builds the whole scale from 50 to 950.",
	},
	{
		title: "The same in seven frameworks",
		text: "All seven packages are built from one source, so the props, the markup and its ARIA match across them.",
	},
];
</script>

<template>
	<UxSite :scene="scene" skip-to="#install" skip-label="Skip to the install steps">
		<template #anchors>
			<UxAnchor
				v-for="(name, i) in FRAMEWORKS"
				:key="`stack-${name}`"
				:anchor="`stack:${i}`"
				:label="name"
			/>
		</template>
		<template #header>
			<SiteHeader :docs-url="docsUrl" :nav="nav" home-href="/" home-label="Inkline, home" />
		</template>

		<UxHero
			:kicker="`Inkline for ${label}`"
			:title="`UI components for ${label}`"
			:index="nav"
			:index-label="`Inkline for ${label}`"
			scroll-href="#install"
		>
			<template #lines>
				<UxHeroLine>UI components</UxHeroLine>
				<UxHeroLine>for <strong>{{ label }}</strong></UxHeroLine>
			</template>
			<template #lead>
				Accessible components in a native {{ label }} package, themed from one Styleframe config.
				Install it in {{ app }}:
				<br />
				<code class="landing-install">{{ install }}</code>
				<br />
				<UxPillLink class="mt-8" :href="docsUrl" :label="`Read the ${label} docs`" />
			</template>
		</UxHero>

		<UxSplit
			id="install"
			index="01"
			role="Install"
			:title="`Your first ${label} component`"
			:href="installUrl"
			link-label="Read the installation guide"
			:steps="steps.length"
		>
			<template #lead>
				Install {{ pkg }}, load its styles and render a button. If the button shows up styled,
				you're done.
			</template>
			<UxSpec :items="steps" />
			<template #aside>
				<UxCode :title="example.title" :code="example.code" />
			</template>
		</UxSplit>

		<UxChapter id="why" index="02" role="Why Inkline" :title="`Inkline for ${label}`" :steps="4">
			<template #lead>{{ coming }}</template>
			<UxTraits :items="traits" />
		</UxChapter>

		<UxFinale>
			<template #mark><UxFrontMark /></template>
			<template #title>Build with <strong>Inkline</strong>.</template>
			<template #lead>Install {{ pkg }} and render your first component in {{ app }}.</template>
			<template #actions>
				<UxPillLink :href="docsUrl" :label="`Read the ${label} docs`" />
			</template>
			<template #footer>
				<span>© 2026 Inkline</span>
				<a :href="GITHUB_URL">GitHub</a>
			</template>
		</UxFinale>
	</UxSite>
</template>

<style scoped>
/* The install command, in the hero: styled here, since the first frame paints
   before Tailwind loads. On a narrow phone it wraps rather than overflow. */
.landing-install {
	display: inline-block;
	max-width: 100%;
	margin-top: 1.5rem;
	padding: 0.5rem 0.75rem;
	border: 1px solid var(--ux-line-strong);
	border-radius: 4px;
	background: rgb(5 5 7 / 0.6);
	font-family: var(--font-ux-mono);
	font-size: 0.875rem;
	color: var(--ux-fg);
	overflow-wrap: anywhere;
}
</style>
