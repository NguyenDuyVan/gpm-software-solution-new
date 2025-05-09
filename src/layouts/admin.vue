<!-- pages/admin/index.vue -->
<template>
  <div class="bg-gray-100 dark:bg-gray-900">
    <Header @toggle-sidebar="toggleSidebar" />

    <div class="flex w-screen h-[calc(100vh_-_96px)]">
      <div class="flex w-full">
        <CustomTransition name="slide-to-hide">
          <SidebarMenu v-if="showSidebar" @toggle-sidebar="toggleSidebar" />
        </CustomTransition>

        <!-- Page Content -->
        <div
          class="flex-1 space-y-2 overflow-auto bg-gray-100 dark:bg-gray-900 px-6 py-2 flex flex-col"
        >
          <Breadcrumb
            v-if="items.length > 0"
            :home="home"
            :model="items"
            class="bg-unset z-30 sticky top-0 w-fit shrink-0 rounded-2xl shadow bg-white dark:bg-gray-800"
            pt:root="py-1.5 px-4"
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

          <div class="flex-1 container mx-auto">
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
  const appStore = useAppStore();
  const isMobile = computed(() => appStore.isMobile);

  const home = ref({
    icon: 'pi pi-home',
    route: '/',
  });
  const items = computed<{ label: string; route: string }[]>(() => {
    switch (route.path) {
      case '/dashboard':
        return [{ label: 'Dashboard', route: '/dashboard' }];
      case '/buy':
        return [{ label: 'Buy Licence', route: '/buy' }];
      case '/transfer':
        return [
          { label: 'Buy Licence', route: '/buy' },
          { label: 'Transfer', route: '/transfer' },
        ];
      case '/license-management':
        return [{ label: 'License Management', route: '/license-management' }];
      case '/affiliate':
        return [{ label: 'Affiliate', route: '/affiliate' }];
      case '/affiliate-withdraw':
        return [
          { label: 'Affiliate', route: '/affiliate' },
          { label: 'Withdraw', route: '/affiliate-withdraw' },
        ];
      case '/support':
        return [{ label: 'Support', route: '/support' }];
      case '/my-account':
        return [{ label: 'My Account', route: '/my-account' }];
      default:
        return [];
    }
  });

  const showSidebar = ref(false);
  const toggleSidebar = () => {
    showSidebar.value = !showSidebar.value;
  };

  watch(isMobile, () => {
    showSidebar.value = !isMobile.value;
  });

  onMounted(() => {
    showSidebar.value = !isMobile.value;
  });
</script>
