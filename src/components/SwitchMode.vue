<template>
  <div>
    <ClientOnly>
      <div class="flex items-center gap-2">
        <i :class="`pi pi-sun text-xl ${isDarkMode ? 'text-gray-200' : 'text-yellow-500'}`"></i>
        <ToggleSwitch
          :default-value="isDarkMode"
          :class="isDarkMode ? 'dark-mode-switch' : 'light-mode-switch'"
          @change="toggleColorMode"
        />
        <i :class="`pi pi-moon text-xl ${isDarkMode ? 'text-yellow-500' : 'text-gray-200'}`"></i>
      </div>
    </ClientOnly>
  </div>
</template>
<script lang="ts" setup>
  const colorMode = useColorMode();
  const isDarkMode = computed(() => colorMode.value === 'dark');
  const toggleColorMode = () => {
    colorMode.preference = isDarkMode.value ? 'light' : 'dark';
  };
</script>
<style lang=""></style>
