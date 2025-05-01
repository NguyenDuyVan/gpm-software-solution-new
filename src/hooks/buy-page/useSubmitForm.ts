import type { CustomerObject, OrderObject, UIData } from '@/types/buy';
import { useCustomerAddress } from './useCustomerAddress';
import { useCustomerInfo } from './useCustomerInfo';
import { usePaymentProcess } from './usePaymentProcess';
import { useValidateForm } from './useValidateForm';

export const useSubmitForm = (
  softwareData: UIData,
  customerObj: CustomerObject,
  orderObj: OrderObject
) => {
  const isLoadingSubmit = ref<boolean>(false);

  // Compose hooks
  const addressHook = useCustomerAddress(customerObj);

  const { isSubmmited, validateForm } = useValidateForm(
    orderObj,
    customerObj,
    addressHook.liveInVietnam
  );

  const { updateCustomerData } = useCustomerInfo(customerObj);

  const { createOrder } = usePaymentProcess(orderObj);

  // Submit form
  const submitAsync = async (): Promise<void> => {
    isSubmmited.value = true;

    // Validate form
    const isValid = validateForm();
    if (!isValid) return;

    isLoadingSubmit.value = true;

    // Get selected modules
    const slectedModulesName: string[] = [];
    softwareData.projectModules.forEach(item => {
      if (item.selected) slectedModulesName.push(item.name);
    });

    // Format address
    const formattedAddress = addressHook.formatFullAddress();

    // Update customer info
    await updateCustomerData(formattedAddress);

    // Create order
    await createOrder(slectedModulesName);

    isLoadingSubmit.value = false;
  };
  return {
    submitAsync,
    isLoadingSubmit,
    isSubmmited,
  };
};
