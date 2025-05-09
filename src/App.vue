<template>
  <NuxtLoadingIndicator />
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <ClientOnly>
      <Toast position="top-center" class="z-999" />
    </ClientOnly>
  </div>
</template>
<script setup lang="ts">
  import { useGetLocationInfo } from './composables/api/useGetLocationInfo';
  import type { Locale } from './types';

  const appStore = useAppStore();
  const { getLocationInfo } = useGetLocationInfo();
  const { setLocale } = useI18n();

  onBeforeMount(async () => {
    let lang = localStorage.getItem('lang');
    if (!lang) {
      const locationInfo = await getLocationInfo();
      lang = locationInfo?.countryCode?.toLowerCase() === 'vn' ? 'vi' : 'en';
      localStorage.setItem('lang', lang);
    }
    setLocale(lang as Locale);
  });

  onMounted(async () => {
    appStore.listenResize();
  });

  onUnmounted(() => {
    appStore.removeResizeListener();
  });
</script>
<style>
  .page-enter-active,
  .page-leave-active {
    transition: all 0.4s;
  }
  .page-enter-from,
  .page-leave-to {
    opacity: 0;
    filter: blur(1rem);
  }
</style>
