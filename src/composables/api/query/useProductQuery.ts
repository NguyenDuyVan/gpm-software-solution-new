import type { Product } from '~/types';
import { appFetcher } from '../fetcher';

const createQueryConfig = (endpoint: string) => {
  const config = useRuntimeConfig();
  return config.public.apiBase + endpoint;
};

export const useGetProductsQuery = () => {
  const url = createQueryConfig('/products');
  return useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await appFetcher(url);
      return response.data;
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export const useGetProductDetailQuery = (id: string | number) => {
  const url = createQueryConfig(`/products/${id}`);
  return useQuery<Product, Error>({
    queryKey: ['productDetail', id],
    queryFn: async () => {
      const response = await appFetcher(url);
      return response.data.data;
    },
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!id && !Array.isArray(id),
  });
};
