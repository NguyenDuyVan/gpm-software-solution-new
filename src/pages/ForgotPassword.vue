<template>
  <div class="auth bg-base d-flex flex-wrap">
    <div class="auth-left d-lg-block d-none">
      <div class="d-flex align-items-center flex-column h-100 justify-content-center">
        <img class="img-" src="../../assets/auth-img.png" alt="" />
      </div>
    </div>

    <div class="auth-right py-32 px-24 d-flex flex-column justify-content-center">
      <div class="max-w-464-px mx-auto w-100">
        <div>
          <a href="index.html" class="mb-40 max-w-290-px">
            <img src="../../assets/logo-gpm.png" alt="" style="height: 40px" />
          </a>
          <h4 class="mb-12">{{ $t('forgot.title') }}</h4>
          <p class="mb-32 text-secondary-light text-lg">
            {{ $t('forgot.content') }}
          </p>
        </div>
        <form @submit.prevent="submit">
          <div class="icon-field mb-16">
            <span class="icon top-50 translate-middle-y">
              <iconify-icon icon="mage:email"></iconify-icon>
            </span>
            <input
              type="email"
              class="form-control h-56-px bg-neutral-50 radius-12"
              placeholder="Email"
              v-model="email"
            />
          </div>
          <div v-if="message">
            <br />
            <span :style="{ color: messageColor }">{{ message }}</span>
          </div>
          <button
            type="submit"
            class="btn btn-primary text-sm btn-sm px-12 py-16 w-100 radius-12 mt-32"
            :class="{ 'loading-btn': onSubmiting }"
          >
            <div class="spinner-border text-light spinner-border-sm" role="status">
              <span class="sr-only">Loading...</span>
            </div>
            <span>Reset password</span>
          </button>
          <div class="mt-32 text-center text-sm flex justify-between auth-footer px-2">
            <div class="flex items-center col-sm-7 col-12">
              <span class="redirect-register">
                {{ $t('forgot.remember') }}
                <router-link :to="{ name: 'login' }" class="text-primary-600 fw-semibold"
                  >&nbsp;{{ $t('forgot.sign_in') }}</router-link
                >
              </span>
            </div>
            <div class="mb-0 col-sm-5 col-12 box-language">
              <MultiLanguage />
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
  import { forgotPasswordAsync } from '@/services/authService';
  import MultiLanguage from '@/components/MultiLanguage.vue';
  export default {
    name: 'PasswordRecoverPage',
    components: {
      MultiLanguage,
    },
    data() {
      return {
        title: 'Forgot password | User site',
        email: '',
        onSubmiting: false,
        message: '',
        messageColor: '#0080C0',
      };
    },
    created() {
      document.title = this.title;
    },
    methods: {
      async submit() {
        this.onSubmiting = true;
        this.message = '';
        if (this.email.length == 0) {
          this.onSubmiting = false;
          this.messageColor = 'red';
          this.message = this.$t('forgot.email_required');
          return;
        }
        const resp = await forgotPasswordAsync(this.email);
        this.message = resp.message;
        if (resp.success === true) this.messageColor = '#0080C0';
        else this.messageColor = 'red';
        this.onSubmiting = false;
      },
    },
  };
</script>
<style scoped>
  @import url('@/assets/style/login.css');
</style>
