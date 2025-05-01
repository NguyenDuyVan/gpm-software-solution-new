<template>
  <div
    class="flex justify-center items-center w-full h-full bottom-0 opacity-50 z-50"
    :class="{ 'fixed top-0 left-0 right-0 bg-gray-200 dark:bg-gray-800': overlay }"
  >
    <div class="flex flex-col items-center justify-center">
      <i class="pi pi-spin pi-spinner" :style="`font-size: ${size}rem; color: ${color};`"></i>
      <div v-if="message" class="mt-4 text-base text-gray-800">{{ message }}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Loading',
    props: {
      size: {
        type: Number,
        default: 2,
      },
      color: {
        type: String,
        default: 'var(--primary-color, #3B82F6)',
      },
      overlay: {
        type: Boolean,
        default: false,
      },
      message: {
        type: String,
        default: '',
      },
    },
  };
</script>
