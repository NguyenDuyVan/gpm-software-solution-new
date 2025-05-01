<template>
  <div class="flex min-h-screen bg-base-100">
    <div class="hidden lg:flex flex-col justify-center items-center w-1/2 bg-gray-50">
      <img class="max-w-xs" src="@/assets/auth-img.png" alt="" />
    </div>
    <div class="flex flex-col justify-center w-full lg:w-1/2 px-6 py-16">
      <div class="max-w-md w-full mx-auto">
        <div>
          <div class="mb-10 max-w-xs">
            <img src="@/assets/logo-gpm.png" alt="" class="h-10" />
          </div>
          <h4 class="mb-3 text-2xl font-semibold">{{ $t('login.title') }}</h4>
          <p class="mb-8 text-gray-500 text-lg">
            {{ $t('login.content') }}
          </p>
        </div>
        <Form @submit="submitLogin">
          <div class="mb-4">
            <span class="p-input-icon-left w-full">
              <i class="pi pi-envelope" />
              <InputText
                v-model="email"
                type="email"
                class="w-full"
                :placeholder="$t('login.email')"
                autocomplete="username"
              />
            </span>
          </div>
          <div class="mb-5 relative">
            <span class="p-input-icon-left w-full">
              <i class="pi pi-lock" />
              <Password
                v-model="password"
                :feedback="false"
                :toggle-mask="true"
                class="w-full"
                :placeholder="$t('login.pass')"
                input-id="your-password"
                autocomplete="current-password"
              />
            </span>
            <div v-if="errorMsg" class="text-red-500 text-sm mt-1">
              {{ errorMsg }}
            </div>
          </div>
          <div class="flex justify-between items-center mb-2">
            <div class="flex items-center">
              <Checkbox v-model="isRememberLogin" input-id="remember" binary class="mr-2" />
              <label for="remember" class="text-gray-700 text-sm">
                {{ $t('login.remember') }}
              </label>
            </div>
            <NuxtLink to="/forgot-password" class="text-primary-600 font-medium text-sm">
              {{ $t('login.forgot') }}
            </NuxtLink>
          </div>
          <Button
            type="submit"
            :label="$t('login.submit')"
            class="w-full mt-8"
            :loading="onSubmiting"
            :disabled="onSubmiting"
          />
          <div class="mt-8 flex flex-col sm:flex-row justify-between items-center text-sm px-2">
            <div class="mb-2 sm:mb-0">
              <span>
                {{ $t('login.re_signup') }}
                <NuxtLink to="/sign-up" class="text-primary-600 font-semibold">
                  &nbsp;{{ $t('login.sign_up') }}
                </NuxtLink>
              </span>
            </div>
            <div>
              <MultiLang />
            </div>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const { t } = useI18n();
  const router = useRouter();
  const { loginAsync } = useAuthService();
  const title = 'Login | User site';
  const email = ref<string>('');
  const password = ref<string>('');
  const loginToken = ref<string>('');
  const onSubmiting = ref(false);
  const errorMsg = ref<string>('');
  const isRememberLogin = ref(true);

  onMounted(() => {
    document.title = title;
    if (localStorage.getItem('isRememberLogin'))
      isRememberLogin.value =
        String(localStorage.getItem('isRememberLogin')).toLowerCase() === 'true';
    if (isRememberLogin.value) email.value = localStorage.getItem('email') || '';
  });

  const submitLogin = async () => {
    onSubmiting.value = true;
    errorMsg.value = '';

    if (!loginToken.value) {
      if (!email.value) {
        onSubmiting.value = false;
        errorMsg.value = t('login.email_required');
        return;
      } else if (!password.value || password.value.length < 6) {
        onSubmiting.value = false;
        errorMsg.value = t('login.pass_invalid');
        return;
      }
    }

    const loginResult = await loginAsync(email.value, password.value, loginToken.value);
    if (loginResult.success === true) {
      localStorage.setItem('isRememberLogin', String(isRememberLogin.value));
      localStorage.setItem('email', email.value);
      router.push('/dashboard');
    } else {
      onSubmiting.value = false;
      errorMsg.value = loginResult?.message || 'Login fscript Please try again!';
    }
  };
</script>
