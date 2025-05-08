<template>
  <div
    class="max-w-2xl w-full mx-auto my-auto p-4 md:p-8 rounded-2xl border border-gray-200 shadow-2xl bg-white dark:bg-gray-800 dark:border-gray-700"
  >
    <div class="w-full">
      <div class="text-center mb-4">
        <h3 class="font-semibold">{{ $t('sign_up.title') }}</h3>
        <p class="text-gray-500 text-sm md:text-base">
          {{ $t('sign_up.content') }}
        </p>
      </div>
      <Form
        v-slot="$form"
        :resolver="resolver"
        :initial-values="{
          email: email,
          password: password,
          repassword: repassword,
          displayName: displayName,
          fbName: fbName,
          fbUrl: fbUrl,
        }"
        :validate-on-value-update="false"
        validate-on-blur
        @submit="submitRegister"
      >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="mb-4">
            <label for="email" class="block text-sm/6 font-medium">Email </label>
            <InputText v-model="email" name="email" type="email" placeholder="Email" fluid />
            <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">{{
              $form?.email?.error?.message
            }}</Message>
          </div>
          <div class="mb-5 relative">
            <label for="password" class="block text-sm/6 font-medium">{{
              $t('sign_up.pass')
            }}</label>
            <Password
              v-model="password"
              :feedback="false"
              :toggle-mask="true"
              name="password"
              type="password"
              fluid
              :placeholder="$t('sign_up.pass')"
              input-id="password"
            />
            <Message
              v-if="$form.password?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $form?.password?.error?.message }}</Message
            >
          </div>
          <div class="mb-4">
            <label for="repassword" class="block text-sm/6 font-medium">{{
              $t('sign_up.repassword')
            }}</label>
            <Password
              v-model="repassword"
              :feedback="false"
              :toggle-mask="true"
              name="repassword"
              type="repassword"
              fluid
              :placeholder="$t('sign_up.repassword')"
              input-id="repassword"
            />
            <Message
              v-if="$form.repassword?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $form?.repassword?.error?.message }}</Message
            >
          </div>
          <div class="mb-4">
            <label for="displayName" class="block text-sm/6 font-medium">{{
              $t('sign_up.full_name')
            }}</label>
            <InputText
              v-model="displayName"
              fluid
              name="displayName"
              type="text"
              :placeholder="$t('sign_up.full_name')"
              input-id="displayName"
            />
            <Message
              v-if="$form.displayName?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $form?.displayName?.error?.message }}</Message
            >
          </div>
          <div class="mb-4">
            <label for="fbName" class="block text-sm/6 font-medium">{{
              $t('sign_up.fb_name')
            }}</label>
            <InputText v-model="fbName" name="fbName" :placeholder="$t('sign_up.fb_name')" fluid />
            <Message v-if="$form.fbName?.invalid" severity="error" size="small" variant="simple">{{
              $form?.fbName?.error?.message
            }}</Message>
          </div>
          <div class="mb-4">
            <label for="fbUrl" class="block text-sm/6 font-medium">{{
              $t('sign_up.fb_link')
            }}</label>
            <InputText v-model="fbUrl" name="fbUrl" :placeholder="$t('sign_up.fb_link')" fluid />
            <Message v-if="$form.fbUrl?.invalid" severity="error" size="small" variant="simple">{{
              $form?.fbUrl?.error?.message
            }}</Message>
          </div>
        </div>
        <div v-if="errorMsg" class="text-red-500 text-sm">
          <span>{{ errorMsg }}</span>
        </div>
        <div class="my-4 flex items-start">
          <Checkbox v-model="isAcceptedPolicy" input-id="acceptPolicy" class="mt-1" binary />
          <label for="acceptPolicy" class="ml-2 text-sm">
            {{ $t('sign_up.term') }}
          </label>
        </div>
        <Button
          type="submit"
          label="Sign Up"
          fluid
          :disabled="!isAcceptedPolicy || isSubmitting"
          :loading="isSubmitting"
        >
          {{ $t('sign_up.submit') }}
        </Button>
        <div class="mt-8 flex flex-col sm:flex-row justify-between items-center text-sm px-2">
          <div>
            <span>
              {{ $t('sign_up.re_signup') }}
              <NuxtLink to="/login" class="text-blue-600 font-semibold">
                &nbsp;{{ $t('sign_up.sign_in') }}
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
  import { zodResolver } from '@primevue/forms/resolvers/zod';
  import { z } from 'zod';

  definePageMeta({
    layout: 'auth',
    path: '/register',
    name: 'Register',
  });

  useHead({
    title: 'Register | User site',
  });

  const router = useRouter();
  const { t } = useI18n();
  const { registerAsync } = useAuthService();

  const resolver = ref(
    zodResolver(
      z
        .object({
          email: z.string().email({ message: t('sign_up.email_required') }),
          password: z.string().min(6, { message: t('sign_up.pass_invalid') }),
          repassword: z.string().min(6, { message: t('sign_up.pass_invalid') }),
          displayName: z
            .string()
            .min(1, { message: t('sign_up.full_name') + ' ' + t('common.no_data') }),
        })
        .refine(data => data.password === data.repassword, {
          message: t('sign_up.repass_invalid'),
          path: ['repassword'],
        })
    )
  );

  const email = ref('');
  const password = ref('');
  const repassword = ref('');
  const displayName = ref('');
  const fbName = ref('');
  const fbUrl = ref('');
  const isSubmitting = ref(false);
  const errorMsg = ref('');
  const isAcceptedPolicy = ref(false);

  const submitRegister = async () => {
    isSubmitting.value = true;
    errorMsg.value = '';

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
      isSubmitting.value = false;
      errorMsg.value = resp.data;
    }
  };
</script>
