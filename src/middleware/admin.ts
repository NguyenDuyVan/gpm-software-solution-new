export default defineNuxtRouteMiddleware(() => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('accessToken');

    if (!token) {
      return navigateTo('/login');
    }
  }
});
