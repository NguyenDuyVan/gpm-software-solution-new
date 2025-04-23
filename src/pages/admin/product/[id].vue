<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Edit Product</h1>
    <div v-if="isLoading" class="space-y-4">
      <!-- Skeleton for Product Name -->
      <div class="h-6 bg-gray-300 rounded w-1/3" />
      <!-- Skeleton for Description -->
      <div class="h-24 bg-gray-300 rounded" />
      <!-- Skeleton for Price -->
      <div class="grid grid-cols-2 gap-4">
        <div class="h-6 bg-gray-300 rounded w-1/2" />
        <div class="h-6 bg-gray-300 rounded w-1/2" />
      </div>
      <!-- Skeleton for Status -->
      <div class="h-6 bg-gray-300 rounded w-1/4" />
      <!-- Skeleton for Images -->
      <div class="grid grid-cols-4 gap-4">
        <div v-for="n in 4" :key="n" class="h-24 bg-gray-300 rounded" />
      </div>
      <!-- Skeleton for Variants -->
      <div v-for="n in 2" :key="n" class="grid grid-cols-3 gap-4">
        <div class="h-6 bg-gray-300 rounded" />
        <div class="h-6 bg-gray-300 rounded" />
        <div class="h-6 bg-gray-300 rounded" />
      </div>
    </div>
    <PrimeForm v-else class="space-y-4" @submit.prevent="updateProduct">
      <!-- Product Name -->
      <div>
        <label for="name" class="block text-sm font-medium">Product Name</label>
        <input
          id="name"
          v-model="productDetail.name"
          type="text"
          class="mt-1 block w-full border rounded-md p-2"
        />
      </div>

      <!-- Description -->
      <div>
        <label for="description" class="block text-sm font-medium">Description</label>
        <PrimeTextarea
          id="description"
          v-model="productDetail.description"
          rows="4"
          class="mt-1 block w-full border rounded-md p-2"
        />
      </div>

      <!-- Price -->
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label for="price" class="block text-sm font-medium">Price</label>
          <input
            id="price"
            v-model="productDetail.price"
            type="number"
            step="0.01"
            class="mt-1 block w-full border rounded-md p-2"
          />
        </div>
        <div>
          <label for="comparePrice" class="block text-sm font-medium">Compare Price</label>
          <input
            id="comparePrice"
            v-model="productDetail.comparePrice"
            type="number"
            step="0.01"
            class="mt-1 block w-full border rounded-md p-2"
          />
        </div>
      </div>

      <!-- Status -->
      <div>
        <label for="status" class="block text-sm font-medium">Status</label>
        <PrimeDropdown
          id="status"
          v-model="productDetail.status"
          :options="statusOptions"
          class="mt-1 w-full"
        />
      </div>

      <!-- Images -->
      <div>
        <label class="block text-sm font-medium">Images</label>
        <div class="grid grid-cols-4 gap-4 mt-2">
          <div v-for="(image, index) in productDetail.images" :key="image.id" class="relative">
            <img :src="image.url" alt="Product Image" class="w-full h-24 object-cover rounded-md" />
            <button
              type="button"
              class="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
              @click="removeImage(index)"
            >
              ✕
            </button>
          </div>
        </div>
        <PrimeFileUpload
          mode="basic"
          name="file"
          accept="image/*"
          custom-upload
          class="mt-4"
          @upload="addImage"
        />
      </div>

      <!-- Variants -->
      <div>
        <label class="block text-sm font-medium">Variants</label>
        <div
          v-for="variant in productDetail.variants"
          :key="variant.id"
          class="grid grid-cols-3 gap-4 mt-2"
        >
          <input
            v-model="variant.name"
            type="text"
            placeholder="Variant Name"
            class="border rounded-md p-2"
          />
          <input
            v-model="variant.price"
            type="number"
            step="0.01"
            placeholder="Price"
            class="border rounded-md p-2"
          />
          <input
            v-model="variant.stock"
            type="number"
            placeholder="Stock"
            class="border rounded-md p-2"
          />
        </div>
        <PrimeButton
          type="button"
          class="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
          @click="addVariant"
        >
          Add Variant
        </PrimeButton>
      </div>

      <!-- Submit Button -->
      <PrimeButton type="submit" class="bg-green-500 text-white px-4 py-2 rounded-md">
        Save Changes
      </PrimeButton>
    </PrimeForm>
  </div>
</template>

<script lang="ts" setup>
  import type { FileUploadUploadEvent } from 'primevue/fileupload';
  import { useGetProductDetailQuery } from '~/composables/api/query/useProductQuery';
  import { ProductStatus, type Product, type ProductImages } from '~/types';

  definePageMeta({
    layout: 'admin',
    middleware: ['admin'],
    meta: {
      title: 'Admin - Products',
      description: 'Manage your products here.',
    },
  });

  const route = useRoute();

  const productDetail = ref<Product>({
    id: 0,
    name: '',
    description: '',
    price: 0,
    comparePrice: 0,
    status: ProductStatus.ACTIVE,
    images: [],
    variants: [],
  });
  const { isLoading, data } = useGetProductDetailQuery(route.params.id as string);

  watchEffect(() => {
    if (data.value) {
      productDetail.value = data.value;
    }
  });

  const statusOptions = ['ACTIVE', 'INACTIVE'];

  // const updateProduct = (): void => {
  //   console.log('Updated product:', productDetail.value);
  // };

  const addImage = (event: FileUploadUploadEvent): void => {
    if (!productDetail.value) return;
    const newImage: ProductImages = {
      productId: +productDetail.value.id,
      url: URL.createObjectURL(Array.isArray(event.files) ? event.files[0] : event.files),
    };
    productDetail.value.images.push(newImage);
  };

  const removeImage = (index: number): void => {
    productDetail.value?.images.splice(index, 1);
  };

  const addVariant = (): void => {
    productDetail.value?.variants.push({
      id: Date.now(),
      name: '',
      price: 0,
      stock: 0,
      productId: +productDetail.value.id,
    });
  };
</script>
