export default defineNuxtRouteMiddleware(async to => {
  const { verifyTokenAsync } = useAuthService();

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
    // Replace this with your actual token verification logic
    const verifyTokenResult = await verifyTokenAsync();
    if (verifyTokenResult.success === true || (to.name && to.name.toString().includes('home'))) {
      return;
    } else {
      return navigateTo('/login');
    }
  }
});
