import type { AddressData, CustomerObject } from '@/types/buy';

export function useCustomerAddress(customerObj: CustomerObject) {
  const { getAddressDataAsync } = useAddressProvider();
  const addressData = ref<AddressData>({});
  const provinceList = ref<string[]>([]);
  const districtList = ref<string[]>([]);
  const wardList = ref<string[]>([]);
  const liveInVietnam = ref<boolean>(false);

  // Computed properties for UI
  const provinceListMap = computed(() => {
    return provinceList.value.map(item => {
      return { name: item, value: item };
    });
  });

  const districtListMap = computed(() => {
    return districtList.value.map(item => {
      return { name: item, value: item };
    });
  });

  const wardListMap = computed(() => {
    return wardList.value.map(item => {
      return { name: item, value: item };
    });
  });

  // Change handlers
  const provinceChanged = (): void => {
    wardList.value = [];
    if (customerObj.province && addressData.value[customerObj.province]) {
      districtList.value = Object.keys(addressData.value[customerObj.province]);
      districtList.value.sort((a, b) => a.localeCompare(b));
    } else districtList.value = [];
    customerObj.district = null;
    customerObj.ward = null;
  };

  const districtChanged = (): void => {
    if (
      customerObj.province &&
      customerObj.district &&
      addressData.value[customerObj.province] &&
      addressData.value[customerObj.province][customerObj.district]
    ) {
      wardList.value = addressData.value[customerObj.province][customerObj.district];
      wardList.value.sort((a, b) => a.localeCompare(b));
    } else wardList.value = [];
    customerObj.ward = null;
  };

  // Format address
  const formatFullAddress = (): string => {
    if (!liveInVietnam.value) return customerObj.addressText || '';

    return (
      (customerObj.addressText?.replace(',', '') || '') +
      ', ' +
      (customerObj.ward || '') +
      ', ' +
      (customerObj.district || '') +
      ', ' +
      (customerObj.province || '')
    );
  };

  // Parse address from stored value
  const parseStoredAddress = (address: string): void => {
    if (!address || address.length === 0) return;

    const addressParts = address.split(',');
    if (addressParts.length === 4) {
      customerObj.addressText = addressParts[0].trim();
      customerObj.province = addressParts[3].trim();
      provinceChanged();

      customerObj.district = addressParts[2].trim();
      districtChanged();

      customerObj.ward = addressParts[1].trim();
      liveInVietnam.value = true;
    } else {
      customerObj.addressText = address;
    }
  };

  // Initialize address data
  const initializeAddressData = async (): Promise<void> => {
    addressData.value = await getAddressDataAsync();
    provinceList.value = Object.keys(addressData.value);
    provinceList.value.sort((a, b) => a.localeCompare(b));

    // Parse existing address if any
    if (customerObj.address) {
      parseStoredAddress(customerObj.address);
    }
  };

  return {
    liveInVietnam,
    provinceListMap,
    districtListMap,
    wardListMap,
    provinceChanged,
    districtChanged,
    formatFullAddress,
    initializeAddressData,
  };
}
