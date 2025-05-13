<template>
  <div
    class="max-w-lg w-full mt-0 md:mt-8 lg:mt12 mx-auto my-auto p-4 md:p-8 rounded-2xl border border-gray-200 shadow-2xl bg-white dark:bg-gray-800 dark:border-gray-700"
  >
    <div class="mx-auto mb-4 w-full text-center">
      <h3 class="font-bold">{{ $t('forgot.title') }}</h3>
      <p class="text-sm md:text-base">
        {{ t('forgot.content') }}
      </p>
    </div>
    <div class="mt-4 mx-auto w-full">
      <Form
        v-slot="$form"
        :resolver="resolver"
        :initial-values="{
          email,
        }"
        :validate-on-value-update="false"
        validate-on-blur
        class="flex flex-col gap-6 w-full"
        @submit="handleForgotPassword"
      >
        <div>
          <label for="email" class="block text-sm/6 font-medium">Email </label>
          <div class="mt-2">
            <InputText
              v-model="email"
              name="email"
              type="email"
              aria-autocomplete="both"
              placeholder="Email"
              fluid
            />
            <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">{{
              $form?.email?.error?.message
            }}</Message>
          </div>
        </div>
        <Message
          v-if="message"
          :severity="messageSeverity"
          class="mb-4"
          size="small"
          variant="simple"
        >
          {{ message }}
        </Message>

        <Button
          type="submit"
          :label="$t('login.submit')"
          class="flex w-full justify-center !rounded-xl font-semibold"
          :loading="isSubmitting"
          :disabled="isSubmitting || !email"
        />

        <div class="flex flex-col sm:flex-row justify-between items-center text-sm px-2">
          <div class="mb-2 sm:mb-0">
            <span>
              {{ $t('forgot.remember') }}
              <NuxtLink to="/login" class="text-primary-600 font-semibold">
                &nbsp;{{ $t('forgot.sign_in') }}
              </NuxtLink>
            </span>
          </div>
          <div class="mt-2 sm:mt-0 flex gap-8">
            <SwitchMode />
            <MultiLang />
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { FormSubmitEvent } from '@primevue/forms/form';
  import { zodResolver } from '@primevue/forms/resolvers/zod';
  import { z } from 'zod';

  definePageMeta({
    layout: 'auth',
    middleware: 'auth',
    path: '/forgot-password',
  });

  useHead({
    title: 'Forgot password | User site',
  });

  const { t } = useI18n();
  const { forgotPasswordAsync } = useAuthService();

  const email = ref('');
  const isSubmitting = ref(false);
  const message = ref('');
  const messageSeverity = ref<'info' | 'error'>('info');

  const handleForgotPassword = async ({ valid }: FormSubmitEvent<Record<string, any>>) => {
    if (!valid) return;

    isSubmitting.value = true;

    const resp = await forgotPasswordAsync(email.value);
    message.value = resp.message || '';
    messageSeverity.value = resp.success === true ? 'info' : 'error';
    isSubmitting.value = false;
  };

  const resolver = ref(
    zodResolver(
      z.object({
        email: z
          .string()
          .min(1, { message: t('login.email_required') })
          .email({ message: 'Invalid email address.' }),
      })
    )
  );
</script>
