<template>
  <div class="flex flex-col min-h-screen">
    <AppHeader />

    <Transition name="slide-from-right">
      <LazyCart v-if="isShowingCart" />
    </Transition>

    <Transition name="slide-from-left">
      <LazyMobileMenu v-if="isShowingMobileMenu" />
    </Transition>

    <NuxtPage />

    <Transition name="fade">
      <div v-if="isShowingCart || isShowingMobileMenu" class="bg-black opacity-25 inset-0 z-40 fixed" @click="closeCartAndMenu"></div>
    </Transition>

    <AppFooter />
    
    
<!-- Bulina flotantă cu iconița oficială de YouTube Shorts -->
    <NuxtLink to="/reelsalesletter" class="reel-floating-badge" aria-label="Vezi Reel Sales Letter">
      <div class="reel-icon-wrapper">
        <!-- Iconiță oficială tip YouTube Shorts -->
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.77 10.32l-10-5.5C6.57 4.31 5 5.19 5 6.6v10.8c0 1.41 1.57 2.29 2.77 1.78l10-5.5c1.2-.66 1.2-2.38 0-3.04z" />
        </svg>
      </div>
      <span class="reel-pulse-ring"></span>
    </NuxtLink>

  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const { isShowingCart, toggleCart } = useCart();
const { isShowingMobileMenu, toggleMobileMenu, addBodyClass, removeBodyClass } = useHelpers();
const { siteName } = useAppConfig();
const config = useRuntimeConfig();

const primaryColor = computed(() => config.public.PRIMARY_COLOR || '#0459c7');
const safePrimaryColor = computed(() => {
  const color = String(primaryColor.value).trim();
  return /^#[0-9a-f]{6}$/i.test(color) || /^#[0-9a-f]{3}$/i.test(color) ? color : '#0459c7';
});

const closeCartAndMenu = () => {
  toggleCart(false);
  toggleMobileMenu(false);
};

watch([isShowingCart, isShowingMobileMenu], () => {
  isShowingCart.value || isShowingMobileMenu.value ? addBodyClass('overflow-hidden') : removeBodyClass('overflow-hidden');
});

watch(
  () => route.path,
  () => closeCartAndMenu(),
);

useHead({
  titleTemplate: `%s - ${siteName}`,
  style: [
    {
      innerHTML: `:root { --color-primary: ${safePrimaryColor.value}; }`,
    },
  ],
});
</script>