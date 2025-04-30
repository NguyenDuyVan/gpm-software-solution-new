<template>
  <div class="flex min-h-screen bg-base-100">
    <div class="hidden lg:flex flex-col justify-center items-center w-1/2 bg-gray-50">
      <img src="/assets/auth-img.png" alt="" class="max-w-xs" />
    </div>
    <div class="flex flex-col justify-center w-full lg:w-1/2 px-6 py-12">
      <div class="max-w-lg w-full mx-auto">
        <NuxtLink to="/" class="mb-10 block max-w-xs">
          <img src="/assets/logo-gpm.png" alt="Logo" class="h-10" />
        </NuxtLink>
        <h4 class="mb-3 font-semibold text-2xl">{{ $t('sign_up.title') }}</h4>
        <p class="mb-8 text-gray-500 text-lg">
          {{ $t('sign_up.content') }}
        </p>
        <form class="space-y-4" @submit.prevent="submitRegister">
          <div>
            <InputText
              v-model="email"
              :placeholder="$t('sign_up.email')"
              :class="{ 'p-invalid': emailError }"
              class="w-full"
              @input="resetError('email')"
            />
          </div>
          <div>
            <Password
              v-model="password"
              :placeholder="$t('sign_up.pass')"
              :feedback="false"
              toggle-mask
              class="w-full"
              input-class="w-full"
              :class="{ 'p-invalid': passError }"
              @input="resetError('password')"
            />
          </div>
          <div>
            <Password
              v-model="repassword"
              :placeholder="$t('sign_up.repassword')"
              :feedback="false"
              toggle-mask
              class="w-full"
              input-class="w-full"
              :class="{ 'p-invalid': passError }"
              @input="resetError('password')"
            />
          </div>
          <div>
            <InputText
              v-model="displayName"
              :placeholder="$t('sign_up.full_name')"
              class="w-full"
            />
          </div>
          <div>
            <InputText v-model="fbName" :placeholder="$t('sign_up.fb_name')" class="w-full" />
          </div>
          <div>
            <InputText v-model="fbUrl" :placeholder="$t('sign_up.fb_link')" class="w-full" />
          </div>
          <div v-if="errorMsg" class="text-red-500 text-sm">
            {{ errorMsg }}
          </div>
          <div class="flex items-center">
            <Checkbox v-model="isAcceptedPolicy" input-id="acceptPolicy" :binary="true" />
            <label for="acceptPolicy" class="ml-2 text-sm">
              {{ $t('sign_up.term') }}
            </label>
          </div>
          <Button
            type="submit"
            label="Sign Up"
            class="w-full mt-4"
            :disabled="!isAcceptedPolicy || onSubmitting"
          />
          <div class="mt-8 flex flex-col sm:flex-row justify-between items-center text-sm">
            <span>
              {{ $t('sign_up.re_signup') }}
              <NuxtLink to="/login" class="text-primary-600 font-semibold">
                {{ $t('sign_up.sign_in') }}
              </NuxtLink>
            </span>
            <div class="mt-2 sm:mt-0">
              <MultiLang />
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const router = useRouter();
  const { t } = useI18n();
  const { registerAsync } = useAuthService();

  const email = ref('');
  const password = ref('');
  const repassword = ref('');
  const displayName = ref('');
  const fbName = ref('');
  const fbUrl = ref('');
  const onSubmitting = ref(false);
  const errorMsg = ref('');
  const emailError = ref(false);
  const passError = ref(false);
  const isAcceptedPolicy = ref(false);

  const resetError = (type: string) => {
    if (type === 'email') {
      emailError.value = false;
    } else {
      passError.value = false;
    }
    errorMsg.value = '';
  };

  const submitRegister = async () => {
    onSubmitting.value = true;

    if (!isValidEmail(email.value)) {
      onSubmitting.value = false;
      emailError.value = true;
      errorMsg.value = t('sign_up.email_required');
      return;
    }
    if (password.value.length < 6) {
      onSubmitting.value = false;
      passError.value = true;
      errorMsg.value = t('sign_up.pass_invalid');
      return;
    }
    if (password.value !== repassword.value) {
      onSubmitting.value = false;
      passError.value = true;
      errorMsg.value = t('sign_up.repass_invalid');
      return;
    }

    const resp = await registerAsync(
      email.value,
      password.value,
      repassword.value,
      displayName.value,
      fbName.value,
      fbUrl.value
    );

    if (resp.success === true) {
      router.push('/login');
    } else {
      onSubmitting.value = false;
      errorMsg.value = resp.data;
    }
  };
</script>

<style scoped>
  /* No custom styles, use Tailwind and PrimeVue */
</style>
