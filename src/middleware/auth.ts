export default defineNuxtRouteMiddleware(async to => {
  const { verifyTokenAsync } = useAuthService();
  let lang = 'en';

  if (typeof window !== 'undefined') {
    // Check if locale is 'en' and route contains 'affiliate'
    lang = localStorage.getItem('lang') || 'en';
  }

  if (to.query.lang !== lang) return navigateTo({ path: to.path, query: { ...to.query, lang } });
  // Check for authentication if required
  const verifyTokenResult = await verifyTokenAsync();
  if (verifyTokenResult.success === true) {
    return navigateTo('/dashboard');
  }
});
