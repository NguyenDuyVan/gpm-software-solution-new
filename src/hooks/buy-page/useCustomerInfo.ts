import type { CustomerObject, CustomerUpdateObject } from '@/types/buy';

export function useCustomerInfo(customerObj: CustomerObject) {
  const { getCurrentUserAsync, updateCurrentUserAsync } = useAuthService();

  // Load user data
  const loadCustomerData = async (): Promise<void> => {
    const userResult = await getCurrentUserAsync();
    if (userResult.data) {
      const userData = userResult.data;
      Object.assign(customerObj, userData);
    }
  };

  // Prepare customer update object
  const prepareCustomerUpdateObj = (): CustomerUpdateObject => {
    return {
      id: customerObj.id,
      display_name: customerObj.display_name,
      phone_number: customerObj.phone_number,
      address: customerObj.address,
      tax_code: customerObj.tax_code,
    };
  };

  // Update customer data
  const updateCustomerData = async (address: string): Promise<void> => {
    customerObj.address = address;
    const customerUpdateObj = prepareCustomerUpdateObj();
    await updateCurrentUserAsync(customerUpdateObj);
  };

  return {
    loadCustomerData,
    updateCustomerData,
  };
}
