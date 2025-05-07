<template>
  <div
    class="bg-white dark:bg-gray-800 w-full md:w-64 flex flex-col gap-4 py-4 md:py-6 fixed top-16 md:top-0 left-0 bottom-0 md:static z-50"
  >
    <nav class="flex-1">
      <ul class="space-y-2 px-3">
        <li v-for="item in MENU_CONFIG" :key="item.path" @click="onClickMenu">
          <NuxtLink
            :to="item.path"
            class="flex text-gray-800 dark:text-white items-center p-3 rounded-2xl transition-colors border border-transparent hover:border-primary-300"
            :class="{
              '!text-primary !border-primary': $route.path.startsWith(item.path),
            }"
          >
            <i :class="[item.icon, 'mr-3']" />
            <span>{{ $t(item.label) }}</span>
          </NuxtLink>
        </li>
      </ul>
    </nav>
    <div class="flex gap-8 justify-end px-6">
      <SwitchMode class="md:hidden" />
      <MultiLang class="md:hidden" />
    </div>
  </div>
</template>
<script setup lang="ts">
  import { MENU_CONFIG } from '@/constants/menu';

  const emit = defineEmits(['toggleSidebar']);

  const appStore = useAppStore();
  const isMobile = computed(() => appStore.isMobile);

  const onClickMenu = () => {
    if (isMobile.value) {
      emit('toggleSidebar');
    }
  };
</script>
