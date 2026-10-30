<script setup lang="ts">
// Replaces @uxfront/layer-docs's to put the version select between the docs and
// GitHub links (`docsTheme.headerLinks`), from the header's right side, beside its
// buttons. Below 768px, the byline leaves them no room, so they're in the header's
// menu instead (AppHeaderBody).
const appConfig = useAppConfig();
const links = computed(() => appConfig.docsTheme.headerLinks ?? []);
// GitHub is the last link.
const pages = computed(() => links.value.slice(0, -1));
const github = computed(() => links.value.slice(-1));
</script>

<template>
  <AppHeaderLinks :items="pages" orientation="horizontal" class="hidden md:flex" />
  <AppVersionSelect class="hidden md:inline-flex" />
  <AppHeaderLinks :items="github" orientation="horizontal" class="hidden md:flex" />
</template>
