<script setup lang="ts">
// Replaces @uxfront/layer-docs's to add the Version select below 768px, beside the
// Framework one, in the same indent, and shown below 768px only, like the links
// (`docsTheme.headerLinks`) the menu starts with there, where AppHeaderCTA has no
// room for them. Then Docus's navigation.
import DocusAppHeaderBody from "docus/app/components/app/AppHeaderBody.vue";

const versionLabelId = useId();
</script>

<template>
  <AppHeaderLinks orientation="vertical" class="mb-4 -mx-2.5 md:hidden" />
  <AppHeaderFramework />
  <div class="md:hidden">
    <span :id="versionLabelId" class="w-full pr-2.5 py-1.5 flex items-center text-sm text-muted">
      Version
    </span>
    <div class="mb-2 ms-2.5 -me-2.5 border-s border-default">
      <div class="ps-1.5 -ms-px">
        <AppVersionSelect :aria-labelledby="versionLabelId" class="w-full" />
      </div>
    </div>
  </div>
  <DocusAppHeaderBody />
</template>
