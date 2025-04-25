<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-16 w-auto" src="./../assets/imgs/logo.png" alt="Your Company" />
      <h2 class="mt-2 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
        Sign in to your account
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <PrimeForm
        v-slot="$form"
        :resolver="resolver"
        :initial-values="initialValues"
        class="flex flex-col gap-6 w-full"
        @submit="handleLogin"
      >
        <div>
          <label for="email" class="block text-sm/6 font-medium text-gray-900">Email address</label>
          <div class="mt-2">
            <PrimeInputText
              name="email"
              type="email"
              autocomplete="email"
              class="w-full !rounded-xl"
              fluid
            />
            <PrimeMessage
              v-if="$form.email?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $form?.email?.error?.message }}</PrimeMessage
            >
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm/6 font-medium text-gray-900">Password</label>
            <div class="text-sm">
              <a href="#" class="font-semibold text-emerald-600 hover:text-emerald-700"
                >Forgot password?</a
              >
            </div>
          </div>
          <div class="mt-2">
            <PrimePassword
              :feedback="false"
              type="password"
              name="password"
              autocomplete="password"
              class="w-full *:w-full *:!rounded-xl"
            />
            <PrimeMessage
              v-if="$form?.password?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $form.password.error?.message }}</PrimeMessage
            >
          </div>
        </div>

        <PrimeButton
          type="submit"
          label="Sign in"
          class="flex w-full justify-center !rounded-xl font-semibold"
          :loading="isLoading"
        />
      </PrimeForm>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { zodResolver } from '@primevue/forms/resolvers/zod';
  import { z } from 'zod';
  import type { FormSubmitEvent } from '@primevue/forms/form';

  definePageMeta({
    title: 'Login',
    middleware: ['login'],
    meta: [
      {
        name: 'description',
        content: 'Login to your account',
      },
    ],
  });

  const initialValues = ref<any>({
    email: '',
    password: '',
  });

  const isLoading = computed(() => false);

  const handleLogin = (event: FormSubmitEvent<Record<string, string>>) => {
    if (!event.valid || !event.values.email || !event.values.password) return;

    const { email, password } = event.values;
    // Perform login logic here
    console.log('Logging in with:', { email, password });
  };

  const resolver = ref(
    zodResolver(
      z.object({
        email: z
          .string()
          .email({ message: 'Invalid email address.' })
          .min(1, { message: 'Email is required.' }),
        password: z
          .string()
          .min(8, { message: 'Password must be at least 8 characters long.' })
          .max(20, { message: 'Password must not exceed 20 characters.' }),
      })
    )
  );
</script>
