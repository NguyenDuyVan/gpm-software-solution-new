<template>
  <Transition :name="name" :mode="mode">
    <slot />
  </Transition>
</template>
<script lang="ts" setup>
  withDefaults(
    defineProps<{
      name?: 'fade' | 'slide-to-hide';
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

  /* Sidebar slide-to-hide animation */
  .slide-to-hide-enter-active,
  .slide-to-hide-leave-active {
    transition: transform 0.3s ease;
  }

  .slide-to-hide-enter-from,
  .slide-to-hide-leave-to {
    transform: translateX(-100%);
  }
</style>
