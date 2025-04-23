import { ref } from 'vue';
import { appPoster } from './api/fetcher';

const token = ref(localStorage.getItem('token') || '');

export const useAuth = () => {
  const login = async (email: string, password: string) => {
    const response = await appPoster('/api/users/login', { email, password });
    const data = await response.json();
    token.value = data.accessToken;
    localStorage.setItem('token', data.accessToken);
  };

  const logout = () => {
    token.value = '';
    localStorage.removeItem('token');
  };

  const isAuthenticated = () => !!token.value;

  return { token, login, logout, isAuthenticated };
};
