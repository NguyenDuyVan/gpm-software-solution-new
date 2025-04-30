<template>
  <Transition :name="name" :mode="mode">
    <slot />
  </Transition>
</template>
<script lang="ts" setup>
  withDefaults(
    defineProps<{
      name?: string;
      mode?: 'out-in' | 'default' | 'in-out';
    }>(),
    {
      name: 'fade',
      mode: 'default',
    }
  );
</script>

<style lang="scss">
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease-in-out;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
