import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import { useI18n } from 'vue-i18n';
import type { PaymentMethod, OrderObject, TransferData, ApiResponse } from '@/types/buy';

export function usePaymentProcess(orderObj: OrderObject) {
  const toast = useToast();
  const { t } = useI18n();
  const db = useCustomerService();

  const argeeRule = ref<boolean>(false);

  const paymentMethods = ref<PaymentMethod[]>([
    { name: t('buy_page.software_info.bank'), value: 'BANKING' },
    { name: 'Card / Paypal', value: 'GLOBAL_GATEWAY' },
    { name: 'Crypto', value: 'CRYPTO' },
  ]);

  const paymentMethod = ref<string>('BANKING');

  // Process order creation
  const createOrder = async (selectedModules: string[]): Promise<boolean> => {
    orderObj.project_module_names = selectedModules;

    // Insert to db
    const result: ApiResponse<TransferData> = await db.createOrderAsync(orderObj);

    if (result.success === true) {
      toast.add({
        severity: 'success',
        summary: 'Success',
        detail: t('buy_page.noti.success'),
        life: 3000,
      });
      navigateTo({
        path: '/transfer',
        query: { order: result.data?.transfer_content },
      });
      return true;
    } else {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: result.message || 'Unknown error',
        life: 3000,
      });
      return false;
    }
  };

  return {
    paymentMethods,
    paymentMethod,
    argeeRule,
    createOrder,
  };
}
