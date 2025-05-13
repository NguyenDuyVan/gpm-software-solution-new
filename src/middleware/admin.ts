export default defineNuxtRouteMiddleware(async to => {
  const { verifyTokenAsync } = useAuthService();

  if (typeof window !== 'undefined') {
    const lang = localStorage.getItem('lang') || 'en';
    // Check if locale is 'en' and route contains 'affiliate'
    if (lang === 'en' && to.fullPath.includes('affiliate')) {
      return navigateTo('/');
    }
  }

  // Store query params in localStorage
  if (to.query.f) {
    localStorage.setItem('f', to.query.f as string);
  }
  if (to.query.ref) {
    localStorage.setItem('ref', to.query.ref as string);
  }

  // Handle not found routes
  if (to.matched.length === 0) {
    return navigateTo('/not-found');
  }

  // Check for authentication if required
  if (to.meta.requiresAuth) {
    const verifyTokenResult = await verifyTokenAsync();
    if (verifyTokenResult.success === true || (to.name && to.name.toString().includes('home'))) {
      return;
    } else {
      return navigateTo('/login');
    }
  }
});
