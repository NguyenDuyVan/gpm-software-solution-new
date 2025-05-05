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
  const appStore = useAppStore();

  onMounted(() => {
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
