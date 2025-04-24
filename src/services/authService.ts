import axios from 'axios';
import Cookies from 'js-cookie';
import { httpGetAsync, httpPostAsync, TOKEN_NAME } from './requestService';

interface RegisterData {
  email: string;
  password: string;
  re_password: string;
  display_name: string;
  support_info: string;
}

interface AuthResponse {
  success: boolean;
  message?: string;
  data?: any;
}

// Login account
// Return a object like: {success: true, message: "Thành công"}
export const loginAsync = async (
  email: string,
  password: string,
  loginToken: string = ''
): Promise<AuthResponse> => {
  const url = `${process.env.VUE_APP_BACKEND_API_URL}/auth/login?email=${email}&password=${password}&login_token=${loginToken}`;
  const resp = await httpPostAsync(url);

  if (resp?.data?.success === true) {
    Cookies.set(TOKEN_NAME, resp.data.data, { expires: 7, secure: true, sameSite: 'Strict' });
  }

  return resp?.data || { success: false };
};

export const registerAsync = async (
  email: string,
  password: string,
  repassword: string,
  displayName: string,
  fbName: string,
  fbUrl: string
): Promise<AuthResponse> => {
  const url = `${process.env.VUE_APP_BACKEND_API_URL}/auth/customer-register`;
  const obj: RegisterData = {
    email: email,
    password: password,
    re_password: repassword,
    display_name: displayName,
    support_info: JSON.stringify({
      facebook_url: fbUrl,
      facebook_name: fbName,
    }),
  };

  const response = await axios.post(url, obj);
  return response.data;
};

export const verifyTokenAsync = async (): Promise<AuthResponse> => {
  const token = Cookies.get(TOKEN_NAME);
  const userStore = useUserStore();

  if (token) {
    const authCache = localStorage.getItem('AUTH_CACHE');
    if (authCache) {
      const authCacheObj = JSON.parse(authCache);
      userStore.setCurrentUserDisplayName(authCacheObj.data.data.user.display_name);

      return authCacheObj;
    }

    // New request
    const url = `${process.env.VUE_APP_BACKEND_API_URL}/auth/check-token?route_name=`;
    const resp = await httpGetAsync(url);

    // Set access_routes to store
    if (resp?.data.success === true) {
      userStore.setCurrentUserDisplayName(resp.data.data.data.user.display_name);

      // Save to cache
      localStorage.setItem('AUTH_CACHE', JSON.stringify(resp.data));
    }

    return resp?.data || { success: false };
  }

  return { success: false };
};

export const getCurrentUserAsync = async (): Promise<AuthResponse> => {
  const url = `${process.env.VUE_APP_BACKEND_API_URL}/auth/get-current-user`;
  const resp = await httpGetAsync(url);

  return resp?.data || { success: false };
};

export const updateCurrentUserAsync = async (userObj: object): Promise<AuthResponse> => {
  const postData = JSON.stringify(userObj);
  const url = `${process.env.VUE_APP_BACKEND_API_URL}/auth/update-current-user`;
  const resp = await httpPostAsync(url, postData);

  return resp?.data || { success: false };
};

export const logoutAsync = async (): Promise<void> => {
  Cookies.remove(TOKEN_NAME);
  localStorage.removeItem('AUTH_CACHE');

  const url = `${process.env.VUE_APP_BACKEND_API_URL}/auth/logout`;
  await httpGetAsync(url);
};

export const forgotPasswordAsync = async (email: string): Promise<AuthResponse> => {
  const url = `${process.env.VUE_APP_BACKEND_API_URL}/auth/send-password-reset-link?email=${email}`;
  const resp = await httpGetAsync(url);

  return resp?.data || { success: false };
};

export const resetPasswordAsync = async (
  email: string,
  newPassword: string,
  token: string
): Promise<AuthResponse> => {
  const url = `${process.env.VUE_APP_BACKEND_API_URL}/auth/reset-password?token=${token}&password=${newPassword}&email=${email}`;
  const resp = await httpGetAsync(url);

  return resp?.data || { success: false };
};
