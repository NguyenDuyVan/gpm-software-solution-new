<template>
  <div class="bg-emerald-800 text-white w-64 flex flex-col shadow-lg gap-5">
    <div class="p-4 border-b">
      <h2 class="text-xl font-bold">Admin Panel</h2>
    </div>
    <nav class="flex-1">
      <ul class="space-y-2 px-3">
        <li v-for="item in menuItems" :key="item.path">
          <NuxtLink
            :to="item.path"
            class="flex items-center p-3 rounded-lg transition-colors hover:bg-emerald-700"
            :class="{
              '!bg-white !text-gray-900': $route.path.startsWith(item.path),
              'text-gray-400': !$route.path.startsWith(item.path),
            }"
          >
            <i :class="[item.icon, 'mr-3']" />
            <span>{{ item.title }}</span>
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script setup lang="ts">
  // Sidebar navigation items
  const menuItems = ref([
    // { title: "Dashboard", path: "/admin", icon: "pi pi-home" },
    { title: 'Products', path: '/admin/product', icon: 'pi pi-box' },
    { title: 'Orders', path: '/admin/orders', icon: 'pi pi-shopping-cart' },
    { title: 'Users', path: '/admin/users', icon: 'pi pi-users' },
    { title: 'Settings', path: '/admin/settings', icon: 'pi pi-cog' },
  ]);
</script>
