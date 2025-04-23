<!-- pages/admin/index.vue -->
<template>
  <div class="flex bg-gray-100 w-screen h-screen">
    <AdminSidebar />

    <!-- Main Content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Header -->
      <AdminHeader />

      <!-- Page Content -->
      <div class="flex-1 space-y-2 overflow-auto bg-gray-100 px-6 py-2">
        <PrimeBreadcrumb :home="home" :model="items" class="bg-unset">
          <template #item="{ item, props }">
            <router-link
              v-slot="{ href, navigate }"
              :to="item.route.replace(':id', route.params.id)"
              :class="{
                '!text-primary': route.path === item.route.replace(':id', route.params.id),
              }"
              custom
            >
              <a :href="href" v-bind="props.action" @click="navigate">
                <span :class="[item.icon]" />
                <span class="font-semibold">{{ item.label }}</span>
              </a>
            </router-link>
          </template>
        </PrimeBreadcrumb>

        <div class="bg-white shadow-md rounded-xl p-4">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  const route = useRoute();

  const home = ref({
    icon: 'pi pi-home',
    route: '/admin',
  });
  const items = ref<{ label: string; route: string }[]>([
    { label: 'Product', route: '/admin/product' },
    { label: 'Detail', route: '/admin/product/:id' },
  ]);
</script>
