<template>
  <div
    class="max-w-lg w-full mx-auto my-auto p-4 md:p-8 rounded-2xl border border-gray-200 shadow-2xl bg-white dark:bg-gray-800 dark:border-gray-700"
  >
    <div class="w-full">
      <div class="text-center mb-4">
        <h3 class="font-semibold">{{ $t('reset_password.title') }}</h3>
      </div>
      <Form
        v-slot="$form"
        :resolver="resolver"
        :initial-values="{
          password,
          repassword,
        }"
        :validate-on-value-update="false"
        validate-on-blur
        @submit="onResetPassword"
      >
        <div class="mb-4">
          <label for="password" class="block mb-1 font-medium">{{
            $t('reset_password.pass')
          }}</label>
          <Password
            v-model="password"
            name="password"
            input-id="password"
            toggle-mask
            :feedback="false"
            fluid
          />
          <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">{{
            $form?.password?.error?.message
          }}</Message>
        </div>

        <div class="mb-4">
          <label for="repassword" class="block mb-1 font-medium">{{
            $t('reset_password.repassword')
          }}</label>
          <Password
            v-model="repassword"
            input-id="repassword"
            name="repassword"
            toggle-mask
            :feedback="false"
            fluid
          />
          <Message
            v-if="$form.repassword?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $form?.repassword?.error?.message }}</Message
          >
        </div>
        <div v-if="message" class="mb-4">
          <span :style="{ color: messageColor }">{{ message }}</span>
        </div>
        <Button
          type="submit"
          :label="$t('reset_password.submit')"
          fluid
          :loading="isSubmitting"
          :disabled="isSubmitting"
        />

        <div class="mt-8 flex flex-col sm:flex-row justify-end gap-8 items-center text-sm px-2">
          <SwitchMode />
          <MultiLang />
        </div>
      </Form>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { zodResolver } from '@primevue/forms/resolvers/zod';
  import { z } from 'zod';

  definePageMeta({
    layout: 'auth',
    middleware: 'auth',
    path: '/reset-password',
  });

  useHead({
    title: 'Reset password | User site',
  });

  const { resetPasswordAsync } = useAuthService();

  const route = useRoute();
  const { t } = useI18n();

  const password = ref('');
  const repassword = ref('');
  const isSubmitting = ref(false);
  const message = ref('');
  const messageColor = ref('#0080C0');
  const token = ref('');
  const email = ref('');

  onMounted(() => {
    token.value = String(route.query.token || '');
    email.value = String(route.query.email || '');
  });

  const onResetPassword = async ({ valid }: FormSubmitEvent<Record<string, any>>) => {
    if (!valid) return;

    isSubmitting.value = true;
    const resp = await resetPasswordAsync(email.value, password.value, token.value);
    message.value = resp.message;

    if (resp.success === true) {
      messageColor.value = '#0080C0';
      const msg = message.value;

      for (let i = 5; i >= 0; i--) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        message.value = `${msg}. ${t('reset_password.auto_redirect', { i })}`;
      }

      navigateTo('/login');
    } else {
      messageColor.value = 'red';
    }

    isSubmitting.value = false;
  };

  const resolver = ref(
    zodResolver(
      z
        .object({
          password: z.string().min(6, { message: t('login.pass_invalid') }),
          repassword: z.string().min(6, { message: t('reset_password.repassword_required') }),
        })
        .refine(data => data.password === data.repassword, {
          message: t('reset_password.repass_invalid'),
          path: ['repassword'],
        })
    )
  );
</script>
