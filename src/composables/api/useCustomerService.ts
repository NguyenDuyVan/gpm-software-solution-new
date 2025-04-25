import { useRequestService } from './useRequestService';

interface APIResponse {
  success: boolean;
  message?: string;
  data?: any;
}

export const useCustomerService = () => {
  const { httpGetAsync, httpPostAsync } = useRequestService();
  const getCurrentUserAsync = async (): Promise<APIResponse> => {
    const url = `/auth/get-current-user`;
    const resp = await httpGetAsync(url);

    return resp?.data || { success: false };
  };

  const changePasswordAsync = async (password: string): Promise<APIResponse> => {
    const url = `/auth/new-password?password=${password}`;
    const resp = await httpGetAsync(url);

    return resp?.data || { success: false };
  };

  const getProjectsAsync = async (
    page: number,
    perPage: number,
    search: string,
    orderBy: string,
    orderByType: string
  ): Promise<APIResponse> => {
    const url = `/customer/get-projects?page=${page}&per_page=${perPage}&search=${search}&order_by=${orderBy}&order_by_type=${orderByType}`;
    const resp = await httpGetAsync(url);

    return resp?.data || { success: false };
  };

  const getProjectAsync = async (id: number | string): Promise<APIResponse> => {
    const url = `/customer/get-project/${id}`;
    const resp = await httpGetAsync(url);

    return resp?.data || { success: false };
  };

  const getCanBuyProjectsAsync = async (): Promise<APIResponse> => {
    const url = `/customer/get-can-buy-projects`;
    const resp = await httpGetAsync(url);

    // 18.4.2025: nếu ngôn ngữ là English, chỉ cho phép hiển thị các project có global_price
    const lang = localStorage.getItem('lang') ?? 'vi';
    if (resp?.data && lang !== 'vi') {
      resp.data.data = resp.data.data.filter((item: any) => item.packages[0].global_price > 0);
    }

    return resp?.data || { success: false };
  };

  const createOrderAsync = async (orderObj: object): Promise<APIResponse> => {
    const url = `/customer/create-order`;
    const postData = JSON.stringify(orderObj);
    const resp = await httpPostAsync(url, postData);

    return resp?.data || { success: false };
  };

  const getOrderDetailsAsync = async (tranferContent: string): Promise<APIResponse> => {
    const url = `/customer/get-order-details?transfer_content=${tranferContent}`;
    const resp = await httpGetAsync(url);

    return resp?.data || { success: false };
  };

  const getTransferInfoAsync = async (orderId: number | string): Promise<APIResponse> => {
    const url = `/customer/get-transfer-info/${orderId}`;
    const resp = await httpGetAsync(url);

    return resp?.data || { success: false };
  };

  const checkTransferedStatusAsync = async (orderId: number | string): Promise<APIResponse> => {
    const url = `/customer/check-transfered-status/${orderId}`;
    const resp = await httpGetAsync(url);

    return resp?.data || { success: false };
  };

  const getLicensesAsync = async (): Promise<APIResponse> => {
    const url = `/customer/get-licenses`;
    const resp = await httpGetAsync(url);

    return resp?.data || { success: false };
  };

  const getSubLicensesAsync = async (id: number | string): Promise<APIResponse> => {
    const url = `/customer/get-sub-licenses/${id}`;
    const resp = await httpGetAsync(url);

    return resp?.data || { success: false };
  };

  const createSubLicensesAsync = async (id: number | string): Promise<APIResponse> => {
    const url = `/customer/create-sub-licenses/${id}`;
    const resp = await httpGetAsync(url);

    return resp?.data || { success: false };
  };

  const changeSubLicenseAsync = async (id: number | string): Promise<APIResponse> => {
    const url = `/customer/change-sub-license/${id}`;
    const resp = await httpGetAsync(url);

    return resp?.data || { success: false };
  };

  const deleteAllSubLicenseAsync = async (id: number | string): Promise<APIResponse> => {
    const url = `/customer/delete-sub-license/${id}`;
    const resp = await httpGetAsync(url);

    return resp?.data || { success: false };
  };

  const changeLicenseAsync = async (id: number | string): Promise<APIResponse> => {
    const url = `/customer/change-license/${id}`;
    const resp = await httpGetAsync(url);

    return resp?.data || { success: false };
  };

  const resetLicenseAsync = async (id: number | string): Promise<APIResponse> => {
    const url = `/customer/reset-license/${id}`;
    const resp = await httpGetAsync(url);

    return resp?.data || { success: false };
  };

  const getDashboardData = async (page: number | string): Promise<APIResponse> => {
    const url = `/customer/get-dashboard-data-2?page=${page}`;
    const resp = await httpGetAsync(url);

    return resp?.data || { success: false };
  };

  const getAffiliateInfoAsync = async (affCode: string): Promise<APIResponse> => {
    const url = `/customer/get-affiliate-info/${affCode}`;
    const resp = await httpGetAsync(url);

    return resp?.data || { success: false };
  };

  const getAffiliateOrdersAsync = async (): Promise<APIResponse> => {
    const url = `/customer/get-affiliate-orders`;
    const resp = await httpGetAsync(url);

    return resp?.data || { success: false };
  };

  const getAffiliateOrderDetailsAsync = async (id: number | string): Promise<APIResponse> => {
    const url = `/customer/get-affiliate-order/${id}`;
    const resp = await httpGetAsync(url);

    return resp?.data || { success: false };
  };

  const createAffiliateOrderAsync = async (withdrawPoint: number): Promise<APIResponse> => {
    const url = `/customer/create-affiliate-order`;
    const postObj = { withdraw_point: withdrawPoint };
    const resp = await httpPostAsync(url, JSON.stringify(postObj));

    return resp?.data || { success: false };
  };
  return {
    getCurrentUserAsync,
    changePasswordAsync,
    getProjectsAsync,
    getProjectAsync,
    getCanBuyProjectsAsync,
    createOrderAsync,
    getOrderDetailsAsync,
    getTransferInfoAsync,
    checkTransferedStatusAsync,
    getLicensesAsync,
    getSubLicensesAsync,
    createSubLicensesAsync,
    changeSubLicenseAsync,
    deleteAllSubLicenseAsync,
    changeLicenseAsync,
    resetLicenseAsync,
    getDashboardData,
    getAffiliateInfoAsync,
    getAffiliateOrdersAsync,
    getAffiliateOrderDetailsAsync,
    createAffiliateOrderAsync,
  };
};
