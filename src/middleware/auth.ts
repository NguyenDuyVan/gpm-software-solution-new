export default defineNuxtRouteMiddleware(async () => {
  const { verifyTokenAsync } = useAuthService();
  // Check for authentication if required
  const verifyTokenResult = await verifyTokenAsync();
  if (verifyTokenResult.success === true) {
    return navigateTo('/dashboard');
  }
});
