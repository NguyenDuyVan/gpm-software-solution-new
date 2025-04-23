export default defineEventHandler(async event => {
  const config = useRuntimeConfig();

  const query = getQuery(event);
  if (!query.productId) {
    return {
      error: 'Missing parameter productId',
    };
  }

  const products = await $fetch(`${config.public.apiBase}/products/${query.productId}`, {
    method: 'GET',
  });

  return products;
});
