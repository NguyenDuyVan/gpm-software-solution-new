<template>
  <div class="bg-white dark:bg-gray-800 w-64 flex flex-col gap-5 py-6">
    <nav class="flex-1">
      <ul class="space-y-2 px-3">
        <li v-for="item in MENU_CONFIG" :key="item.path">
          <NuxtLink
            :to="item.path"
            class="flex text-gray-800 dark:text-white items-center p-3 rounded-lg transition-colors hover:bg-primary-200 hover:text-white"
            :class="{
              '!bg-primary text-white': $route.path.startsWith(item.path),
            }"
          >
            <i :class="[item.icon, 'mr-3']" />
            <span>{{ $t(item.label) }}</span>
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script setup lang="ts">
  import { MENU_CONFIG } from '@/constants/menu';
</script>
