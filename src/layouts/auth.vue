<!-- pages/admin/index.vue -->
<template>
  <div class="overflow-x-hidden">
    <div class="h-screen w-screen flex flex-col bg-gray-100 dark:bg-gray-800">
      <div
        class="flex justify-between items-center p-8 backdrop-blur-md sticky top-0 z-30 md:bg-transparent"
      >
        <div>
          <img class="mx-auto w-52" src="@/assets/imgs/logo.png" alt="Your Company" />
        </div>
        <div v-if="$route.path.includes('login')" class="flex gap-4 items-center">
          <p class="hidden md:block">{{ $t('login.re_signup') }}</p>
          <Button
            type="submit"
            :label="$t('login.sign_up')"
            class="!rounded-xl font-semibold shadow-xl shadow-primary-300 dark:shadow-primary-900"
            @click="navigateTo('/register')"
          />
        </div>
        <div v-else class="flex gap-4 items-center">
          <p class="hidden md:block">{{ $t('sign_up.re_signup') }}</p>
          <Button
            type="submit"
            :label="$t('sign_up.sign_in')"
            class="!rounded-xl font-semibold shadow-xl shadow-primary-300 dark:shadow-primary-900"
            @click="navigateTo('/login')"
          />
        </div>
      </div>

      <div class="my-auto flex-1 relative flex items-start">
        <div
          class="clip-wave absolute z-10 bottom-0 h-full w-full bg-gradient-to-t from-purple-500 to-blue-500 dark:from-purple-800 dark:to-blue-800"
          :style="{
            'clip-path': 'ellipse(67% 33% at 51% 87%)',
          }"
        ></div>
        <div class="w-full p-4 z-20">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
