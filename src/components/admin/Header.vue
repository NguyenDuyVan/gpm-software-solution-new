<template>
  <header class="bg-white shadow-sm z-10">
    <div class="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <!-- <img src="/logo.svg" alt="Logo" class="h-8 w-auto" /> -->
        </div>
        <div class="flex items-center space-x-4">
          <!-- Notifications -->
          <div class="relative">
            <PrimeOverlayBadge
              :value="unreadNotifications"
              severity="danger"
              :show-badge="unreadNotifications > 0"
              size="small"
            >
              <i class="pi pi-bell p-1" style="font-size: 1.2rem" @click="toggleNotifications" />
            </PrimeOverlayBadge>

            <div
              v-if="showNotifications"
              class="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-50"
            >
              <div class="px-4 py-2 border-b">
                <h3 class="text-lg font-medium">Notifications</h3>
              </div>
              <div class="max-h-64 overflow-y-auto">
                <div
                  v-for="(notification, index) in notifications"
                  :key="index"
                  class="px-4 py-2 hover:bg-gray-100"
                >
                  <p class="text-sm">{{ notification.message }}</p>
                  <p class="text-xs text-gray-500">
                    {{ notification.time }}
                  </p>
                </div>
                <div v-if="notifications.length === 0" class="px-4 py-2 text-gray-500 text-sm">
                  No notifications
                </div>
              </div>
            </div>
          </div>

          <!-- User Profile -->
          <div class="relative">
            <PrimeAvatar
              image="https://primefaces.org/cdn/primevue/images/avatar/asiyajavayant.png"
              class="mr-2"
              size="normal"
              shape="circle"
              @click="toggleUserMenu"
            />

            <div
              v-if="showUserMenu"
              class="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl p-2 z-50 space-y-1"
            >
              <NuxtLink
                to="/admin/profile"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-xl"
              >
                Your Profile
              </NuxtLink>
              <NuxtLink
                to="/admin/settings"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-xl"
              >
                Settings
              </NuxtLink>

              <NuxtLink
                to="/login"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-xl"
                @click="logout"
              >
                Sign out
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
  // User menu toggle
  const showUserMenu = ref(false);
  const toggleUserMenu = () => {
    showUserMenu.value = !showUserMenu.value;
    if (showUserMenu.value) {
      showNotifications.value = false;
    }
  };

  // Notifications
  const showNotifications = ref(false);
  const notifications = ref([
    { message: 'New order received', time: '5 minutes ago' },
    { message: 'Product inventory low', time: '1 hour ago' },
    { message: 'New user registered', time: '3 hours ago' },
  ]);
  const unreadNotifications = ref(2);
  const toggleNotifications = () => {
    showNotifications.value = !showNotifications.value;
    if (showNotifications.value) {
      showUserMenu.value = false;
      unreadNotifications.value = 0;
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
  };
</script>
