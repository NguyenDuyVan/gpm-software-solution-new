import type { CustomerObject, UIData } from '@/types/buy';
import { useCustomerInfo } from './useCustomerInfo';

export const useSubmitForm = (
  softwareData: UIData,
  customerObj: CustomerObject,
  // eslint-disable-next-line no-unused-vars
  createOrder: (_: string[]) => Promise<boolean>,
  formatFullAddress: () => string,
  isSubmmited: Ref<boolean>,
  validateForm: () => boolean
) => {
  const isLoadingSubmit = ref<boolean>(false);

  const { updateCustomerData } = useCustomerInfo(customerObj);

  const submitAsync = async (): Promise<void> => {
    isSubmmited.value = true;

    const isValid = validateForm();
    if (!isValid) return;

    isLoadingSubmit.value = true;

    const slectedModulesName: string[] = [];
    softwareData.projectModules.forEach(item => {
      if (item.selected) slectedModulesName.push(item.name);
    });

    const formattedAddress = formatFullAddress();
    await updateCustomerData(formattedAddress);
    await createOrder(slectedModulesName);

    isLoadingSubmit.value = false;
  };
  return {
    submitAsync,
    isLoadingSubmit,
    isSubmmited,
  };
};
