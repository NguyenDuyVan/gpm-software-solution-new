<template>
  <div class="card animate-fade-in">
    <div class="card-header">
      <h2 class="text-lg font-semibold text-primary-800">{{ $t('withdrawForm.title') }}</h2>
    </div>
    <div class="card-body">
      <p class="text-sm text-gray-600 mb-4">
        {{ $t('withdrawForm.minimumWithdrawal', { min: 500, multiplier: 10 }) }}
      </p>

      <div class="mb-6">
        <label for="amount" class="block text-sm font-medium text-gray-700 mb-1">
          {{ $t('withdrawForm.amount') }}
        </label>
        <div class="relative">
          <input
            id="amount"
            v-model="amount"
            type="number"
            class="input-field pr-12"
            :class="{ 'border-danger-500 focus:ring-danger-500': amountError }"
            min="0"
            step="10"
            @input="validateAmount"
          />
          <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <span class="text-gray-500">{{ $t('general.points') }}</span>
          </div>
        </div>
        <p v-if="amountError" class="mt-1 text-sm text-danger-500 animate-pulse-once">
          {{ amountError }}
        </p>
      </div>

      <div class="mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h3 class="font-medium text-gray-700 mb-2">
          {{ $t('withdrawForm.bankAccountInfo') }}
        </h3>
        <div v-if="hasBankAccount" class="text-sm text-gray-600">
          <!-- Bank information would go here -->
          <p>{{ bankName }}</p>
          <p>{{ maskAccountNumber(accountNumber) }}</p>
          <p>{{ accountHolder }}</p>
        </div>
        <div v-else class="text-sm text-gray-500 italic">
          {{ $t('withdrawForm.noBankAccount') }}
        </div>
        <button
          class="mt-3 text-sm text-primary-600 hover:text-primary-800 font-medium flex items-center transition-colors"
          @click="editBankDetails"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
          {{ $t('withdrawForm.editBankDetails') }}
        </button>
      </div>

      <div class="alert alert-warning">
        <div class="flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <p class="text-sm">
            {{ $t('withdrawForm.processingTimeWarning', { days: '3-5' }) }}
          </p>
        </div>
      </div>

      <div v-if="successMessage" class="alert alert-success mt-4 animate-fade-in">
        <div class="flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <p class="text-sm">{{ successMessage }}</p>
        </div>
      </div>

      <div class="mt-6">
        <button
          class="btn btn-primary w-full flex justify-center items-center"
          :class="{ 'opacity-50 cursor-not-allowed': isSubmitting || !isFormValid }"
          :disabled="isSubmitting || !isFormValid"
          @click="submitWithdrawal"
        >
          <span v-if="isSubmitting" class="mr-2">
            <svg
              class="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </span>
          {{ $t('withdrawForm.submitButton') }}
        </button>
      </div>
    </div>

    <div class="mt-8 mx-auto">
      <DataTable :value="affOrderObjs" :loading="inLoading" class="w-full" data-key="id">
        <template #empty>
          <div class="text-center text-gray-400 py-4">{{ $t('common.no_data') }}</div>
        </template>
        <Column field="created_at" :header="$t('affiliate_withdraw.table.time')">
          <template #body="slotProps">
            {{ formatDateTimeString(slotProps.data.created_at) }}
          </template>
        </Column>
        <Column field="withdraw_point" :header="$t('affiliate_withdraw.table.withdraw_point')" />
        <Column field="status" :header="$t('affiliate_withdraw.table.status')">
          <template #body="slotProps">
            <span :class="statusClass(slotProps.data.status)">
              {{ slotProps.data.status }}
            </span>
          </template>
        </Column>
        <Column :header="''">
          <template #body="slotProps">
            <Button
              :label="$t('affiliate_withdraw.table.detail')"
              class="p-button-secondary"
              @click="goAffiliateDetail(slotProps.data.id)"
            />
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup lang="ts">
  definePageMeta({
    layout: 'admin',
    middleware: undefined,
  });
  // State
  const amount = ref(0);
  const amountError = ref('');
  const isSubmitting = ref(false);
  const successMessage = ref('');

  // Mock data (in a real app, this would come from API)
  const hasBankAccount = ref(false);
  const bankName = ref('');
  const accountNumber = ref('');
  const accountHolder = ref('');

  // Computed
  const isFormValid = computed(() => {
    return amount.value >= 500 && amount.value % 10 === 0 && !amountError.value;
  });

  // Methods
  const validateAmount = () => {
    amountError.value = '';

    if (amount.value < 500) {
      amountError.value = $t('withdrawForm.errors.minimumAmount');
    } else if (amount.value % 10 !== 0) {
      amountError.value = $t('withdrawForm.errors.multipleRequired');
    }
  };

  const maskAccountNumber = number => {
    if (!number) return '';
    const visible = number.slice(-4);
    const masked = '•'.repeat(number.length - 4);
    return masked + visible;
  };

  const editBankDetails = () => {
    // In a real application, this would open a modal or navigate to bank details page
    alert($t('withdrawForm.bankDetailsEditMessage'));
  };

  const submitWithdrawal = async () => {
    if (!isFormValid.value) return;

    isSubmitting.value = true;

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      successMessage.value = $t('withdrawForm.successMessage');
      amount.value = 0;

      // Simulate redirect after success
      setTimeout(() => {
        // Would navigate to confirmation page in real app
        successMessage.value = '';
      }, 3000);
    } catch (error) {
      console.error('Withdrawal submission error:', error);
    } finally {
      isSubmitting.value = false;
    }
  };

  // Translation function (simplified for demo)
  const $t = (key, params = {}) => {
    const translations = {
      'withdrawForm.title': 'Lệnh rút tiền',
      'withdrawForm.minimumWithdrawal': `Số Affiliate point tối thiểu để đặt lệnh rút tiền là ${params.min} và là bội số của ${params.multiplier}`,
      'withdrawForm.amount': 'Số lượng điểm',
      'withdrawForm.bankAccountInfo': 'Tài khoản nhận tiền:',
      'withdrawForm.noBankAccount': 'Chưa có thông tin về tài khoản của bạn',
      'withdrawForm.editBankDetails': 'Chỉnh sửa thông tin',
      'withdrawForm.processingTimeWarning': `Lệnh rút tiền sẽ được xử lý trong vòng ${params.days} ngày làm việc kể từ ngày đặt lệnh rút. Hãy đảm bảo bạn đã điền thông tin ngân hàng chính xác tại mục thông tin tài khoản, chúng tôi sẽ không chịu bất cứ trách nhiệm nào nếu thông tin của bạn không đúng!`,
      'withdrawForm.submitButton': 'Đặt lệnh rút tiền',
      'withdrawForm.successMessage': 'Yêu cầu rút tiền của bạn đã được gửi thành công!',
      'withdrawForm.bankDetailsEditMessage':
        'Chức năng chỉnh sửa thông tin ngân hàng sẽ được mở ra trong một cửa sổ mới.',
      'withdrawForm.errors.minimumAmount': 'Số điểm tối thiểu phải là 500',
      'withdrawForm.errors.multipleRequired': 'Số điểm phải là bội số của 10',
      'general.points': 'điểm',
    };

    return translations[key] || key;
  };
</script>
