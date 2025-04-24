import type { AxiosResponse } from 'axios';
import axios from 'axios';
import Cookies from 'js-cookie';

export const TOKEN_NAME = 'token';

export const httpGetAsync = async (url: string): Promise<AxiosResponse | null> => {
  const token = Cookies.get(TOKEN_NAME);

  try {
    const resp = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return resp;
  } catch (error: any) {
    if (error.message.includes('401')) {
      Cookies.remove(TOKEN_NAME);
      localStorage.removeItem('AUTH_CACHE');
      document.location.href = '/login';
    }
    return null;
  }
};

export const httpPostAsync = async (url: string, data?: string): Promise<AxiosResponse | null> => {
  const token = Cookies.get(TOKEN_NAME);

  try {
    const resp = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return resp;
  } catch (error: any) {
    if (error.message.includes('401')) {
      Cookies.remove(TOKEN_NAME);
      localStorage.removeItem('AUTH_CACHE');
      document.location.href = '/login';
    }
    return null;
  }
};
