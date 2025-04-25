<template>
  <div class="bg-secondary w-64 flex flex-col shadow-lg gap-5">
    <div class="p-4 shadow">
      <img data-v-174a6438="" src="@/assets/imgs/logo.png" alt="" class="logo logo-notcollapsed" />
    </div>
    <nav class="flex-1">
      <ul class="space-y-2 px-3">
        <li v-for="item in MENU_CONFIG" :key="item.path">
          <NuxtLink
            :to="item.path"
            class="flex items-center p-3 rounded-lg transition-colors hover:bg-primary hover:text-white"
            :class="{
              'bg-primary text-white': $route.path.startsWith(item.path),
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
