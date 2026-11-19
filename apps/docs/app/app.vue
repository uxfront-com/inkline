<script setup lang="ts">
// This app.vue replaces the Docus one, so docs pages mount the Docus shell
// (header, sidebar, search) themselves. The homepage brings its own, and
// doesn't load this one.
const DocusApp = defineAsyncComponent(() => import("docus/app/app.vue"));

const route = useRoute();
const usesDocus = computed(() => route.path === "/docs" || route.path.startsWith("/docs/"));

useHead({
  titleTemplate: (title) => (title ? `${title} - Inkline` : "Inkline"),
});

// On a framework page, like /docs/vue/components/button, the title names the
// framework: "Button - Inkline Vue". Docus's app.vue, inside this one, sets its
// own `%s - Inkline` template, and a later entry wins a tie, so this one is
// `high`. It holds a template only on a framework route: elsewhere the entries
// above and the page's own, like the homepage's, decide as before. Off a
// framework route, useFramework() also follows the reader's stored pick once
// mounted, which would change the title on hydration.
const { current } = useFramework();
const frameworkSite = computed(() =>
  route.name === "docs-framework" && current.value ? `Inkline ${current.value.label}` : undefined,
);

useHead(
  () => {
    const site = frameworkSite.value;
    return site ? { titleTemplate: (title?: string) => (title ? `${title} - ${site}` : site) } : {};
  },
  { tagPriority: "high" },
);
</script>

<template>
  <NuxtRouteAnnouncer />
  <DocusApp v-if="usesDocus" />
  <NuxtPage v-else />
</template>
