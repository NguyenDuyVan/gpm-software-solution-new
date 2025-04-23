<template>
  <div
    class="flex items-center justify-between w-full px-4 py-2 md:px-6 md:py-4 bg-orange-500 text-white shadow-lg md:text-xl text-sm"
  >
    <div class="flex items-center space-x-2">
      <Icon name="mdi:flash" class="md:text-3xl text-xl" />

      <span class="font-semibold">Flash Sale</span>
    </div>
    <div class="font-medium">
      Kết thúc sau <span class="font-bold">{{ timeLeft }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { useCountdownTimer } from '../composables/useCountdownTimer';

  const { timeLeft } = useCountdownTimer(4);
</script>
