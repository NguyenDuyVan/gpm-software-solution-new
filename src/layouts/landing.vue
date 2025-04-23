<template>
  <div class="max-w-[768px] mx-auto">
    <slot />
    <Footer />
  </div>
</template>
<script setup lang="ts">
  import Footer from './components/Footer.vue';
</script>
