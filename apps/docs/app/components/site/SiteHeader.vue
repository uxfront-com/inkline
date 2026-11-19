<script setup lang="ts">
import type { UxNavItem } from "@uxfront/ui";

import { GITHUB_URL } from "~/data/site";

// The header of the pages outside the docs, the homepage and the framework
// landing pages: the wordmark signed "by UXFront", the page's sections, then
// the Documentation link, the Version select and GitHub.
defineProps<{
  /** The Documentation link, from docsPath(). */
  docsUrl: string;
  nav: UxNavItem[];
  /** Where the wordmark goes: the top of the page by default. */
  homeHref?: string;
  /** The wordmark link's accessible name, for a `homeHref` other than the top. */
  homeLabel?: string;
}>();
</script>

<template>
  <UxHeader
    brand="Inkline"
    :nav="nav"
    nav-label="Inkline"
    :home-href="homeHref"
    :home-label="homeLabel"
  >
    <template #mark />
    <template #brand><strong>Ink</strong>line</template>
    <template #byline>
      by
      <a href="https://uxfront.com">
        <UxFrontMark />
        <span><strong>UX</strong>Front</span>
      </a>
    </template>
    <template #actions>
      <NuxtLink class="header-link header-page" :to="docsUrl">Documentation</NuxtLink>
      <span class="header-version"><AppVersionSelect /></span>
      <a class="header-link" :href="GITHUB_URL" aria-label="GitHub">
        <UxGithubIcon class="header-icon" />
        <span class="header-label">GitHub</span>
      </a>
    </template>
  </UxHeader>
</template>

<style scoped>
/* The first frame only has the components' inline styles (Tailwind loads after
   it), so the header links are styled here rather than with utilities. */
.header-link {
  display: inline-flex;
  align-items: center;
  min-height: 2.75rem;
}

.header-icon {
  width: 1.125rem;
  height: 1.125rem;
}

/* The version select's trigger, styled like the links beside it. These rules
   are unlayered, so they also win over Nuxt UI's utilities once they load,
   which follow the docs' colour mode and could turn the text dark here. */
.header-version :deep(button) {
  position: relative;
  min-height: 2.75rem;
  padding: 0 1.5rem 0 0;
  border: 0;
  border-radius: 2px;
  background: none;
  font: inherit;
  font-size: 0.875rem;
  color: var(--ux-fg-2);
  cursor: pointer;
  transition: color 0.3s var(--ux-ease-out);
}

.header-version :deep(button:hover) {
  color: var(--ux-fg);
}

.header-version :deep(button:focus-visible) {
  outline: 1px solid var(--ux-fg);
  outline-offset: 4px;
}

/* Out of the flow at first paint too, so the trigger keeps its width when
   Nuxt UI's styles load and the links beside it don't shift. */
.header-version :deep([data-slot="trailing"]) {
  position: absolute;
  inset-block: 0;
  inset-inline-end: 0;
  display: flex;
  align-items: center;
  padding: 0;
}

.header-version :deep(.iconify) {
  color: inherit;
}

/* Phones can't fit the byline beside the links. The hero links to the docs just
   below, and the GitHub link's aria-label still names it without the label. */
@media (max-width: 639px) {
  .header-page,
  .header-label {
    display: none;
  }

  .header-link {
    min-width: 2.75rem;
    justify-content: flex-end;
  }
}
</style>
