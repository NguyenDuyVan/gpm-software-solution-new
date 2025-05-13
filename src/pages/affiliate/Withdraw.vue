<template>
  <div class="max-w-5xl mx-auto space-y-4">
    <div class="flex gap-4 flex-wrap">
      <div
        class="p-4 space-y-2 flex-1 shadow-md bg-indigo-100 dark:bg-indigo-500 rounded-2xl text-indigo-700"
      >
        <div class="flex gap-2 items-center font-semibold">
          <i class="pi pi-dollar animate-shake"></i>
          <p>Điểm khả dụng</p>
        </div>
        <h3>{{ userObj.affiliate_point }}</h3>
      </div>
      <div
        class="p-4 space-y-2 flex-1 shadow-md bg-emerald-100 dark:bg-emerald-500 rounded-2xl text-emerald-700"
      >
        <div class="flex gap-2 items-center font-semibold">
          <i class="pi pi-check-circle animate-bounce"></i>
          <p>Đã hoàn thành</p>
        </div>
        <h3>100</h3>
      </div>
      <div
        class="p-4 space-y-2 flex-1 shadow-md bg-amber-100 dark:bg-amber-500 rounded-2xl text-amber-700"
      >
        <div class="flex gap-2 items-center font-semibold">
          <i class="pi pi-spinner-dotted animate-spin"></i>
          <p>Đang chờ xử lý</p>
        </div>
        <h3>100</h3>
      </div>
    </div>
    <Card>
      <template #title>
        <h4 class="text-primary mb-2">{{ $t('affiliate_withdraw.title') }}</h4>
      </template>
      <template #content>
        <div class="space-y-4">
          <p class="text-gray-500">
            {{ $t('affiliate_withdraw.desc') }}
          </p>

          <div class="flex flex-col gap-2">
            <label class="font-semibold">Số lượng điểm</label>
            <InputNumber v-model="withDrawPoint" :min="0" class="w-full">
              <template #incrementicon>
                <span class="pi pi-plus" />
              </template>
              <template #decrementicon>
                <span class="pi pi-minus" />
              </template>
            </InputNumber>
          </div>

          <div
            class="my-4 bg-gray-100 dark:bg-gray-800 p-4 space-y-2 rounded-xl border border-gray-300 dark:border-gray-700"
          >
            <label class="font-semibold block">{{
              $t('affiliate_withdraw.account_withdraw')
            }}</label>
            <div>
              <span
                v-if="
                  userObj.payment_bank_id ||
                  userObj.payment_bank_name ||
                  userObj.payment_bank_user_name
                "
                class="font-bold text-gray-700"
              >
                {{ userObj.payment_bank_id }} / {{ userObj.payment_bank_name }} -
                {{ userObj.payment_bank_user_name }}
              </span>
              <span v-else class="text-gray-500 text-sm italic">
                {{ $t('affiliate_withdraw.bank_info') }}
              </span>
            </div>
          </div>
          <div class="text-orange-600 space-y-4">
            <Message severity="warn" icon="pi pi-exclamation-circle" closable>
              <span class="text-sm" v-html="$t('affiliate_withdraw.infor_first')"></span>
            </Message>

            <Message severity="warn" icon="pi pi-exclamation-circle" closable>
              <span class="text-sm" v-html="$t('affiliate_withdraw.info_second')"></span>
            </Message>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="text-center">
          <Button
            :label="$t('affiliate_withdraw.btn_withdraw')"
            class="w-full mt-4"
            severity="help"
            @click="sendWithDrawCommand"
          />
        </div>
      </template>
    </Card>
    <div class="mt-8 mx-auto">
      <DataTable
        :value="affOrderObjs"
        :loading="inLoading"
        class="w-full rounded-xl overflow-hidden shadow-md"
        data-key="id"
      >
        <template #empty>
          <div class="text-center text-gray-400 py-4">{{ $t('common.no_data') }}</div>
        </template>
        <Column field="created_at" :header="$t('affiliate_withdraw.table.time')">
          <template #body="slotProps">
            {{ formatDateTimeStr(slotProps.data.created_at) }}
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

    <Dialog
      v-model:visible="isShowConfirmPasswordBox"
      modal
      :closable="false"
      header="Confirm Password"
    >
      <ConfirmPasswordBox ref="confirmPasswordBox" @confirm-event="confirmPasswordDoneEvent" />
    </Dialog>
  </div>
</template>

<script setup lang="ts">
  definePageMeta({
    layout: 'admin',
    middleware: 'admin',
    path: '/affiliate-withdraw',
    name: 'affiliate-withdraw',
  });

  const { createAffiliateOrderAsync, getAffiliateOrdersAsync } = useCustomerService();
  const { getCurrentUserAsync } = useAuthService();
  const { t, locale } = useI18n();
  const router = useRouter();
  const toast = useToast();

  const withDrawPoint = ref<number>(0);
  const affOrderObjs = ref<any[]>([]);
  const userObj = ref<any>({});
  const inLoading = ref<boolean>(false);
  const isShowConfirmPasswordBox = ref<boolean>(false);
  const confirmPasswordBox = ref();

  watch(
    locale,
    value => {
      if (value === 'en') {
        router.push('/');
      }
    },
    { immediate: true }
  );

  onMounted(async () => {
    document.title = 'Affiliate withdraw| User site';
    inLoading.value = true;
    const result = await getAffiliateOrdersAsync();
    if (result.success === true) {
      affOrderObjs.value = result.data;
    }
    const userResult = await getCurrentUserAsync();
    if (userResult.success === true) {
      userObj.value = userResult.data;
    }
    inLoading.value = false;
  });

  function statusClass(status: string) {
    if (status === 'SUCCESS') return 'text-green-600 font-bold';
    if (status === 'ERROR') return 'text-red-600 font-bold';
    return '';
  }

  function formatDateTimeStr(dateString: string) {
    return formatDateTimeString(dateString);
  }

  function goAffiliateDetail(id: number) {
    router.push({ name: 'affiliate-detail', query: { id } });
  }

  async function sendWithDrawCommand() {
    if (withDrawPoint.value < 500) {
      toast.add({
        severity: 'error',
        summary: t('affiliate_withdraw.noti.send_withdraw.error1'),
        detail: t('affiliate_withdraw.noti.send_withdraw.error1'),
      });
      return;
    }
    if (
      userObj.value.payment_bank_id === null ||
      userObj.value.payment_bank_name === null ||
      userObj.value.payment_bank_user_name === null
    ) {
      toast.add({
        severity: 'error',
        summary: t('affiliate_withdraw.noti.send_withdraw.error2'),
        detail: t('affiliate_withdraw.noti.send_withdraw.error2'),
      });

      return;
    }
    if (withDrawPoint.value % 10 !== 0) {
      toast.add({
        severity: 'error',
        summary: t('affiliate_withdraw.noti.send_withdraw.error3'),
        detail: t('affiliate_withdraw.noti.send_withdraw.error3'),
      });
      return;
    }
    isShowConfirmPasswordBox.value = true;
    // ConfirmPasswordBox should handle its own modal logic in Vue 3
  }

  async function confirmPasswordDoneEvent(eventResult: boolean) {
    isShowConfirmPasswordBox.value = false;
    if (eventResult === true) {
      const result = await createAffiliateOrderAsync(withDrawPoint.value);
      if (result.success === true) {
        affOrderObjs.value.unshift(result.data);
        toast.add({
          severity: 'success',
          summary: 'Tạo lệnh rút tiền thành công',
          detail: 'Lệnh rút tiền đã được tạo thành công.',
        });
      } else {
        toast.add({
          severity: 'error',
          summary: result.message,
          detail: result.message,
        });
      }
    } else {
      toast.add({
        severity: 'error',
        summary: 'Mật khẩu nhập lại không chính xác',
        detail: 'Vui lòng kiểm tra lại mật khẩu của bạn.',
      });
    }
  }
</script>
