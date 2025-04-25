import axios from 'axios';

interface AddressData {
  // Define the structure of your address data
  [key: string]: any;
}

export const useAddressProvider = () => {
  const getAddressDataAsync = async function (): Promise<AddressData> {
    // Read content of /assets/data_dia_phuong.json and return it
    const resp = await axios.get('/assets/data_dia_phuong.json');
    return resp.data;
  };
  return {
    getAddressDataAsync,
  };
};
