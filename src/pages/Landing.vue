<template>
  <div class="flex justify-center">
    <div class="w-full bg-gray-50">
      <FlashSale />
      <div class="space-y-4">
        <div class="p-4 pb-0 bg-white space-y-2">
          <!-- Product Price -->
          <div class="text-red-500 font-bold text-lg">
            <span>₫{{ product?.price }}</span>
            <span class="line-through text-gray-500 text-sm ml-2"
              >₫{{ product?.comparePrice }}</span
            >
            <span class="bg-red-100 text-red-600 text-xs font-semibold ml-2 px-2 py-0.5 rounded">{{
              calculateDiscount(product?.price, product?.comparePrice)
            }}</span>
          </div>
          <!-- Product Title -->
          <div class="mt-2">
            <span class="bg-amber-500 text-white text-xs font-semibold px-1 py-0.5 rounded"
              >Star Shop</span
            >
            <span class="text-gray-800 font-medium text-sm ml-1">
              {{ product?.name }}
            </span>
          </div>

          <!-- Product Rating -->
          <div class="flex items-center mt-2">
            <span class="text-yellow-500 text-sm font-semibold">4.9</span>
            <span class="text-gray-500 text-sm ml-1">(453)</span>
            <span class="text-gray-500 text-sm ml-4">Đã Bán 10.3k</span>
          </div>

          <!-- Product Description -->
          <div class="flex items-center max-w-full gap-4 p-2 text-sm rounded">
            <div class="flex basis-1/3 items-center space-x-2">
              <Icon name="mdi:check-decagram-outline" class="text-3xl !bg-orange-300" />
              <p>Chính hãng 100%</p>
            </div>
            <div class="flex basis-1/3 items-center space-x-2">
              <Icon name="mdi:backup-restore" class="text-3xl !bg-orange-300" />
              <p>Trả hàng miễn phí</p>
            </div>
            <div class="flex basis-1/3 items-center space-x-2">
              <Icon name="mdi:truck-delivery-outline" class="text-3xl !bg-orange-300" />
              <p>Miễn phí vận chuyển</p>
            </div>
          </div>
        </div>

        <!-- Product Variant -->
        <div class="flex items-center justify-between p-3 bg-white">
          <span class="text-base font-semibold">Chọn các tùy chọn</span>
          <div class="flex items-center gap-1">
            <p>Mặc định</p>
            <Icon name="mdi:chevron-right" class="text-gray-500 text-2xl" />
          </div>
        </div>

        <!-- Product Payment Info -->
        <div class="p-3 bg-white">
          <ProductPaymentInfo />
        </div>

        <!-- Product Description -->
        <div class="p-3 bg-white">
          <p class="font-semibold py-2">Giới thiệu về sản phẩm</p>
          <TiptapEditor :content="product?.description" />
        </div>

        <!-- Buy Now Form -->
        <div id="buy-now-form">
          <BuyNowForm />
        </div>

        <!-- Buy Now -->
        <div class="flex fixed justify-center bottom-0 left-0 right-0">
          <div class="max-w-[768px] w-full pt-4 px-1 pb-8 bg-white flex gap-2">
            <a
              href="#help"
              class="text-center flex-1 bg-white text-red-500 border border-solid border-red-500 font-semibold py-2 rounded-lg hover:bg-red-100 transition block"
            >
              Hỗ trợ
            </a>
            <a
              href="#buy-now-form"
              class="text-center flex-1 bg-red-500 text-white font-semibold py-2 rounded-lg hover:bg-red-600 transition block"
            >
              Mua ngay
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import type { Product } from '@/types';

  const route = useRoute();
  const router = useRouter();

  definePageMeta({
    layout: 'landing',
  });

  const { data, error } = await useFetch<{ data: Product }>(
    `/api/product?productId=${route.query.p}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  if (error.value) {
    router.push({ name: '404' });
  }
  const product = ref<Product | undefined>(data.value?.data);
</script>
