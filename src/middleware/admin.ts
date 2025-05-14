export default defineNuxtRouteMiddleware(async to => {
  const { verifyTokenAsync } = useAuthService();
  let lang = 'en';
  if (typeof window !== 'undefined') {
    // Check if locale is 'en' and route contains 'affiliate'
    lang = localStorage.getItem('lang') || 'en';
  }

  if (to.query.lang !== lang) return navigateTo({ path: to.path, query: { ...to.query, lang } });

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
      if (lang === 'en' && to.fullPath.includes('affiliate')) {
        return navigateTo(`/`);
      }
      return;
    } else {
      return navigateTo(`/login?lang=${lang}`);
    }
  }
});
