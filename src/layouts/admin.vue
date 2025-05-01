<!-- pages/admin/index.vue -->
<template>
  <div>
    <Header @toggle-sidebar="toggleSidebar" />

    <div class="flex w-screen h-[calc(100vh_-_96px)]">
      <div class="flex w-full">
        <CustomTransition>
          <SidebarMenu v-show="showSidebar" />
        </CustomTransition>

        <!-- Page Content -->
        <div
          class="flex-1 space-y-2 overflow-auto bg-gray-100 dark:bg-gray-900 px-6 py-2 flex flex-col"
        >
          <Breadcrumb
            v-if="items.length > 0"
            :home="home"
            :model="items"
            class="bg-unset"
            pt:root="py-1 px-4"
          >
            <template #item="{ item, props }">
              <NuxtLink
                v-slot="{ href, navigate }"
                :to="item.route"
                :class="{
                  '!text-primary': route.path === item.route,
                }"
                custom
              >
                <a :href="href" v-bind="props.action" @click="navigate">
                  <span :class="[item.icon]" />
                  <span class="font-semibold">{{ item.label }}</span>
                </a>
              </NuxtLink>
            </template>
          </Breadcrumb>

          <div class="flex-1">
            <slot />
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>
<script setup lang="ts">
  const route = useRoute();

  const home = ref({
    icon: 'pi pi-home',
    route: '/',
  });
  const items = computed<{ label: string; route: string }[]>(() => {
    if (route.path === '/dashboard') return [{ label: 'Dashboard', route: '/dashboard' }];
    else if (route.path === '/buy') return [{ label: 'Buy Licence', route: '/buy' }];
    return [];
  });

  const showSidebar = ref(true);
  const toggleSidebar = () => {
    showSidebar.value = !showSidebar.value;
  };
</script>
