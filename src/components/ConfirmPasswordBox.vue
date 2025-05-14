<template>
  <Dialog
    v-model:visible="isShowConfirmPasswordBox"
    :header="$t('affiliate_withdraw.modal_confirm.title')"
    :style="{ width: '35%', minWidth: '300px' }"
    modal
  >
    <Form @submit="submitAsync">
      <div class="mb-2">
        <span class="text-red-500">*</span> {{ $t('affiliate_withdraw.modal_confirm.content') }}
      </div>
      <InputText
        v-model="password"
        type="password"
        class="w-full mb-4"
        required
        :placeholder="$t('affiliate_withdraw.modal_confirm.content')"
      />
    </Form>
    <template #footer>
      <div class="flex justify-end gap-2">
        <Button
          :label="$t('affiliate_withdraw.modal_confirm.confirm.exit')"
          class="p-button-text"
          @click="setStateModal(false)"
        />
        <Button
          :label="$t('affiliate_withdraw.modal_confirm.confirm.accept')"
          class="p-button-success"
          @click="submitAsync"
        />
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
  const { loginAsync, getCurrentUserAsync } = useAuthService();

  const emit = defineEmits(['confirmEvent']);

  const isShowConfirmPasswordBox = ref(false);
  const password = ref('');

  const setStateModal = (value: boolean = true) => {
    isShowConfirmPasswordBox.value = value;
    password.value = '';
  };

  async function submitAsync() {
    const result = await getCurrentUserAsync();
    if (result.success === true) {
      const email = result.data.email;
      const loginResult = await loginAsync(email, password.value, '');
      if (loginResult.success) {
        emit('confirmEvent', true);
        setStateModal(false);
        return;
      }
    }
    setStateModal(false);
    emit('confirmEvent', false);
  }

  defineExpose({ setStateModal });
</script>
