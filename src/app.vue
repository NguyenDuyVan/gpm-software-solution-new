<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <Toast position="top-center" />
  </div>
</template>
<script setup lang="ts">
  import { setGlobalToast } from '@/composables/api/fetcher';

  const toast = useToast();
  setGlobalToast(toast);
</script>
