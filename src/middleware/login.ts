export default defineNuxtRouteMiddleware(() => {
  if (typeof window !== 'undefined') {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      return navigateTo('/admin');
    }
  }
});
