<script setup lang="ts">
const { siteName } = useAppConfig();
const runtimeConfig = useRuntimeConfig();
const img = useImage();

const logoUrl = runtimeConfig?.public?.LOGO ? img(runtimeConfig?.public?.LOGO) : null;
const faviconUrl = '/logo.svg';
</script>

<template>
  <NuxtLink to="/" class="inline-flex items-center gap-2">
    <NuxtImg v-if="logoUrl" :src="logoUrl" alt="Logo" class="object-contain h-10" />
    <div v-else class="flex items-center gap-2 text-lg font-bold">
      <NuxtImg  :src="faviconUrl" alt="Logo" width="32" height="32" />
      <span>{{ siteName }}</span>
    </div>
  </NuxtLink>
</template>
