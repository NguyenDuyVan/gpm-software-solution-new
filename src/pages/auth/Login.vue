<template>
  <div
    class="max-w-lg w-full mt-0 md:mt-8 lg:mt12 mx-auto my-auto p-4 md:p-8 rounded-2xl border border-gray-200 shadow-2xl bg-white dark:bg-gray-800 dark:border-gray-700"
  >
    <div class="mx-auto mb-4 w-full text-center">
      <h3 class="font-bold">{{ $t('login.title') }}</h3>
      <p class="text-sm md:text-base">
        {{ $t('login.content') }}
      </p>
    </div>
    <div class="mt-4 mx-auto w-full">
      <Form
        v-slot="$form"
        :resolver="resolver"
        :initial-values
        :validate-on-value-update="false"
        validate-on-blur
        class="flex flex-col gap-6 w-full"
        @submit="handleLogin"
      >
        <div>
          <label for="email" class="block text-sm/6 font-medium">Email </label>
          <div class="mt-2">
            <InputText
              v-model="initialValues.email"
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

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm/6 font-medium">{{ $t('login.pass') }}</label>
            <div class="text-sm">
              <NuxtLink to="/forgot-password" class="text-primary-600 font-medium text-sm">
                {{ $t('login.forgot') }}
              </NuxtLink>
            </div>
          </div>
          <div class="mt-2">
            <Password
              v-model="initialValues.password"
              name="password"
              :feedback="false"
              type="password"
              class="w-full"
              fluid
              toggle-mask
              :placeholder="$t('login.pass')"
            />
            <Message
              v-if="$form?.password?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $form.password.error?.message }}</Message
            >
          </div>
          <Message v-if="errorMsg" severity="error" size="small" variant="simple">{{
            errorMsg
          }}</Message>
        </div>

        <div class="flex justify-between items-center mb-2">
          <div class="flex items-center">
            <Checkbox v-model="isRememberLogin" input-id="remember" binary class="mr-2" />
            <label for="remember" class="text-sm">
              {{ $t('login.remember') }}
            </label>
          </div>
        </div>

        <Button
          type="submit"
          :label="$t('login.submit')"
          class="flex w-full justify-center !rounded-xl font-semibold"
          :loading="isSubmit"
        />

        <div class="flex flex-col sm:flex-row justify-between items-center text-sm px-2">
          <div class="mb-2 sm:mb-0">
            <span>
              {{ $t('login.re_signup') }}
              <NuxtLink to="/register" class="text-primary-600 font-semibold">
                &nbsp;{{ $t('login.sign_up') }}
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
    path: '/login',
    middleware: 'auth',
  });

  useHead({
    title: 'Login | User site',
  });

  const { t } = useI18n();
  const { loginAsync } = useAuthService();
  const loginToken = ref<string>('');
  const isSubmit = ref(false);
  const errorMsg = ref<string>('');
  const isRememberLogin = ref(true);
  const initialValues = reactive({
    email: '',
    password: '',
  });

  onBeforeMount(() => {
    if (localStorage.getItem('isRememberLogin'))
      isRememberLogin.value =
        String(localStorage.getItem('isRememberLogin')).toLowerCase() === 'true';
    if (isRememberLogin.value) initialValues.email = localStorage.getItem('email') || '';
  });

  const handleLogin = async (event: FormSubmitEvent<Record<string, any>>) => {
    if (!event.valid) return;

    isSubmit.value = true;
    errorMsg.value = '';

    const loginResult = await loginAsync(
      initialValues.email,
      initialValues.password,
      loginToken.value
    );
    if (loginResult.success === true) {
      localStorage.setItem('isRememberLogin', String(isRememberLogin.value));
      localStorage.setItem('email', initialValues.email);
      navigateTo({ path: '/dashboard' });
    } else {
      isSubmit.value = false;
      errorMsg.value = loginResult?.message || t('login.failed');
    }
  };

  const resolver = ref(
    zodResolver(
      z.object({
        email: z
          .string()
          .min(1, { message: t('login.email_required') })
          .email({ message: 'Invalid email address.' }),
        password: z.string().min(6, { message: t('login.pass_invalid') }),
      })
    )
  );
</script>
