<!-- pages/admin/index.vue -->
<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-semibold text-gray-800">Products</h1>
      <PrimeButton label="Add New" icon="pi pi-plus" />
    </div>

    <!-- Data Table -->
    <PrimeDataTable
      :value="products"
      :paginator="true"
      :rows="50"
      striped-rows
      scrollable
      scroll-height="calc(100vh - 260px)"
      :size="'small'"
      responsive-layout="scroll"
      :loading="isLoading"
      :show-gridlines="true"
    >
      <PrimeColumn field="id" header="ID" sortable />
      <PrimeColumn field="name" header="Name" sortable />
      <PrimeColumn field="price" header="Price" sortable>
        <template #body="slotProps">
          <span class="text-green-500 font-semibold">
            {{ formatCurrency(slotProps.data.price) }}
          </span>
        </template>
      </PrimeColumn>
      <PrimeColumn field="comparePrice" header="Compare Price" sortable />
      <PrimeColumn field="status" header="Status" sortable>
        <template #body="slotProps">
          <PrimeBadge
            :value="slotProps.data.status"
            :severity="getBadgeSeverity(slotProps.data.status)"
          />
        </template>
      </PrimeColumn>
      <PrimeColumn field="createdAt" header="Created Date" sortable>
        <template #body="slotProps">
          {{ formatDate(slotProps.data.createdAt) }}
        </template>
      </PrimeColumn>
      <PrimeColumn field="description" header="Description" sortable>
        <template #body="slotProps">
          <p class="truncate">
            {{ slotProps.data.description }}
          </p>
        </template>
      </PrimeColumn>
      <PrimeColumn header="Actions">
        <template #body="slotProps">
          <div class="flex space-x-2">
            <PrimeButton
              icon="pi pi-eye"
              class="p-button-primary p-button-md"
              @click="handlePreviewProduct(slotProps.data.productId)"
            />
            <PrimeButton
              icon="pi pi-pencil"
              class="p-button-text p-button-md"
              @click="navigateTo(`/admin/product/${slotProps.data.productId}`)"
            />
            <PrimeButton icon="pi pi-trash" class="p-button-text p-button-danger p-button-md" />
          </div>
        </template>
      </PrimeColumn>
    </PrimeDataTable>
  </div>
</template>
<script lang="ts" setup>
  import { PrimeBadge, PrimeDataTable } from '#components';
  import { useGetProductsQuery } from '~/composables/api/query/useProductQuery';

  definePageMeta({
    layout: 'admin',
    middleware: ['admin'],
    meta: {
      title: 'Admin - Products',
      description: 'Manage your products here.',
    },
  });

  const { data: products, isLoading } = useGetProductsQuery();

  const handlePreviewProduct = (productId: number) => {
    if (!productId) return;
    // Logic to handle product preview
    window.open(`/landing?p=${productId}`, '_blank');
  };

  const getBadgeSeverity = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'warning';
      case 'draft':
        return 'info';
      default:
        return 'info';
    }
  };
</script>
