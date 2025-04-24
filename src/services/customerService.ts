import { httpGetAsync, httpPostAsync } from './requestService';

interface APIResponse {
  success: boolean;
  message?: string;
  data?: any;
}

export const getCurrentUserAsync = async (): Promise<APIResponse> => {
  const url = `${process.env.VUE_APP_BACKEND_API_URL}/auth/get-current-user`;
  const resp = await httpGetAsync(url);

  return resp?.data || { success: false };
};

export const changePasswordAsync = async (password: string): Promise<APIResponse> => {
  const url = `${process.env.VUE_APP_BACKEND_API_URL}/auth/new-password?password=${password}`;
  const resp = await httpGetAsync(url);

  return resp?.data || { success: false };
};

export const getProjectsAsync = async (
  page: number,
  perPage: number,
  search: string,
  orderBy: string,
  orderByType: string
): Promise<APIResponse> => {
  const url = `${process.env.VUE_APP_BACKEND_API_URL}/customer/get-projects?page=${page}&per_page=${perPage}&search=${search}&order_by=${orderBy}&order_by_type=${orderByType}`;
  const resp = await httpGetAsync(url);

  return resp?.data || { success: false };
};

export const getProjectAsync = async (id: number | string): Promise<APIResponse> => {
  const url = `${process.env.VUE_APP_BACKEND_API_URL}/customer/get-project/${id}`;
  const resp = await httpGetAsync(url);

  return resp?.data || { success: false };
};

export const getCanBuyProjectsAsync = async (): Promise<APIResponse> => {
  const url = `${process.env.VUE_APP_BACKEND_API_URL}/customer/get-can-buy-projects`;
  const resp = await httpGetAsync(url);

  // 18.4.2025: nếu ngôn ngữ là English, chỉ cho phép hiển thị các project có global_price
  const lang = localStorage.getItem('lang') ?? 'vi';
  if (resp?.data && lang !== 'vi') {
    resp.data.data = resp.data.data.filter((item: any) => item.packages[0].global_price > 0);
  }

  return resp?.data || { success: false };
};

export const createOrderAsync = async (orderObj: object): Promise<APIResponse> => {
  const url = `${process.env.VUE_APP_BACKEND_API_URL}/customer/create-order`;
  const postData = JSON.stringify(orderObj);
  const resp = await httpPostAsync(url, postData);

  return resp?.data || { success: false };
};

export const getOrderDetailsAsync = async (tranferContent: string): Promise<APIResponse> => {
  const url = `${process.env.VUE_APP_BACKEND_API_URL}/customer/get-order-details?transfer_content=${tranferContent}`;
  const resp = await httpGetAsync(url);

  return resp?.data || { success: false };
};

export const getTransferInfoAsync = async (orderId: number | string): Promise<APIResponse> => {
  const url = `${process.env.VUE_APP_BACKEND_API_URL}/customer/get-transfer-info/${orderId}`;
  const resp = await httpGetAsync(url);

  return resp?.data || { success: false };
};

export const checkTransferedStatusAsync = async (
  orderId: number | string
): Promise<APIResponse> => {
  const url = `${process.env.VUE_APP_BACKEND_API_URL}/customer/check-transfered-status/${orderId}`;
  const resp = await httpGetAsync(url);

  return resp?.data || { success: false };
};

export const getLicensesAsync = async (): Promise<APIResponse> => {
  const url = `${process.env.VUE_APP_BACKEND_API_URL}/customer/get-licenses`;
  const resp = await httpGetAsync(url);

  return resp?.data || { success: false };
};

export const getSubLicensesAsync = async (id: number | string): Promise<APIResponse> => {
  const url = `${process.env.VUE_APP_BACKEND_API_URL}/customer/get-sub-licenses/${id}`;
  const resp = await httpGetAsync(url);

  return resp?.data || { success: false };
};

export const createSubLicensesAsync = async (id: number | string): Promise<APIResponse> => {
  const url = `${process.env.VUE_APP_BACKEND_API_URL}/customer/create-sub-licenses/${id}`;
  const resp = await httpGetAsync(url);

  return resp?.data || { success: false };
};

export const changeSubLicenseAsync = async (id: number | string): Promise<APIResponse> => {
  const url = `${process.env.VUE_APP_BACKEND_API_URL}/customer/change-sub-license/${id}`;
  const resp = await httpGetAsync(url);

  return resp?.data || { success: false };
};

export const deleteAllSubLicenseAsync = async (id: number | string): Promise<APIResponse> => {
  const url = `${process.env.VUE_APP_BACKEND_API_URL}/customer/delete-sub-license/${id}`;
  const resp = await httpGetAsync(url);

  return resp?.data || { success: false };
};

export const changeLicenseAsync = async (id: number | string): Promise<APIResponse> => {
  const url = `${process.env.VUE_APP_BACKEND_API_URL}/customer/change-license/${id}`;
  const resp = await httpGetAsync(url);

  return resp?.data || { success: false };
};

export const resetLicenseAsync = async (id: number | string): Promise<APIResponse> => {
  const url = `${process.env.VUE_APP_BACKEND_API_URL}/customer/reset-license/${id}`;
  const resp = await httpGetAsync(url);

  return resp?.data || { success: false };
};

export const getDashboardData = async (page: number | string): Promise<APIResponse> => {
  const url = `${process.env.VUE_APP_BACKEND_API_URL}/customer/get-dashboard-data-2?page=${page}`;
  const resp = await httpGetAsync(url);

  return resp?.data || { success: false };
};

export const getAffiliateInfoAsync = async (affCode: string): Promise<APIResponse> => {
  const url = `${process.env.VUE_APP_BACKEND_API_URL}/customer/get-affiliate-info/${affCode}`;
  const resp = await httpGetAsync(url);

  return resp?.data || { success: false };
};

export const getAffiliateOrdersAsync = async (): Promise<APIResponse> => {
  const url = `${process.env.VUE_APP_BACKEND_API_URL}/customer/get-affiliate-orders`;
  const resp = await httpGetAsync(url);

  return resp?.data || { success: false };
};

export const getAffiliateOrderDetailsAsync = async (id: number | string): Promise<APIResponse> => {
  const url = `${process.env.VUE_APP_BACKEND_API_URL}/customer/get-affiliate-order/${id}`;
  const resp = await httpGetAsync(url);

  return resp?.data || { success: false };
};

export const createAffiliateOrderAsync = async (withdrawPoint: number): Promise<APIResponse> => {
  const url = `${process.env.VUE_APP_BACKEND_API_URL}/customer/create-affiliate-order`;
  const postObj = { withdraw_point: withdrawPoint };
  const resp = await httpPostAsync(url, JSON.stringify(postObj));

  return resp?.data || { success: false };
};
