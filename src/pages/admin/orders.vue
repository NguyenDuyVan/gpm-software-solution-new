<!-- pages/admin/index.vue -->
<template>
  <main class="flex-1 overflow-auto bg-gray-100 p-6">
    <div class="bg-white shadow-md rounded-lg p-4">
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-2xl font-semibold text-gray-800">
          {{ currentPage }}
        </h1>
        <PrimeButton label="Add New" icon="pi pi-plus" />
      </div>

      <!-- Data Table -->
      <PrimeDataTable
        :value="items"
        :paginator="true"
        :rows="50"
        striped-rows
        scrollable
        scroll-height="calc(100vh - 260px)"
        :size="'small'"
        responsive-layout="scroll"
      >
        <PrimeColumn field="id" header="ID" sortable />
        <PrimeColumn field="name" header="Name" sortable />
        <PrimeColumn field="category" header="Category" sortable />
        <PrimeColumn field="status" header="Status" sortable />
        <PrimeColumn field="date" header="Date" sortable />
        <PrimeColumn header="Actions">
          <template #body>
            <div class="flex space-x-2">
              <PrimeButton icon="pi pi-pencil" class="p-button-text p-button-sm" />
              <PrimeButton icon="pi pi-trash" class="p-button-text p-button-danger p-button-sm" />
            </div>
          </template>
        </PrimeColumn>
      </PrimeDataTable>
    </div>
  </main>
</template>
<script lang="ts">
  definePageMeta({
    layout: 'admin',
  });
</script>

<script setup lang="ts">
  // Current page title
  const currentPage = ref('Orders');

  // Sample data for table
  const items = ref([
    {
      id: 1,
      name: 'Laptop Pro',
      category: 'Electronics',
      status: 'In Stock',
      date: '2025-03-15',
    },
    {
      id: 2,
      name: 'Wireless Mouse',
      category: 'Accessories',
      status: 'Low Stock',
      date: '2025-03-12',
    },
    {
      id: 3,
      name: 'USB-C Cable',
      category: 'Accessories',
      status: 'In Stock',
      date: '2025-03-10',
    },
    {
      id: 4,
      name: 'Monitor 24"',
      category: 'Electronics',
      status: 'Out of Stock',
      date: '2025-03-05',
    },
    {
      id: 5,
      name: 'Wireless Keyboard',
      category: 'Accessories',
      status: 'In Stock',
      date: '2025-03-01',
    },
    {
      id: 6,
      name: 'Smartphone X',
      category: 'Electronics',
      status: 'In Stock',
      date: '2025-02-28',
    },
    {
      id: 7,
      name: 'Headphones',
      category: 'Audio',
      status: 'Low Stock',
      date: '2025-02-25',
    },
    {
      id: 8,
      name: 'Tablet Mini',
      category: 'Electronics',
      status: 'In Stock',
      date: '2025-02-20',
    },
    {
      id: 9,
      name: 'Smart Watch',
      category: 'Wearables',
      status: 'In Stock',
      date: '2025-02-15',
    },
    {
      id: 10,
      name: 'Bluetooth Speaker',
      category: 'Audio',
      status: 'Out of Stock',
      date: '2025-02-10',
    },
    {
      id: 11,
      name: 'Gaming Mouse',
      category: 'Gaming',
      status: 'In Stock',
      date: '2025-02-05',
    },
    {
      id: 12,
      name: 'External SSD',
      category: 'Storage',
      status: 'In Stock',
      date: '2025-02-01',
    },
    {
      id: 13,
      name: 'Portable Charger',
      category: 'Accessories',
      status: 'In Stock',
      date: '2025-01-28',
    },
    {
      id: 14,
      name: 'Drone Pro',
      category: 'Electronics',
      status: 'Low Stock',
      date: '2025-01-25',
    },
    {
      id: 15,
      name: 'Action Camera',
      category: 'Cameras',
      status: 'In Stock',
      date: '2025-01-20',
    },
    {
      id: 16,
      name: 'VR Headset',
      category: 'Gaming',
      status: 'Out of Stock',
      date: '2025-01-15',
    },
    {
      id: 17,
      name: 'Smart Thermostat',
      category: 'Home Automation',
      status: 'In Stock',
      date: '2025-01-10',
    },
    {
      id: 18,
      name: 'Electric Scooter',
      category: 'Transportation',
      status: 'Low Stock',
      date: '2025-01-05',
    },
    {
      id: 19,
      name: 'Fitness Tracker',
      category: 'Wearables',
      status: 'In Stock',
      date: '2025-01-01',
    },
    {
      id: 20,
      name: 'Noise Cancelling Headphones',
      category: 'Audio',
      status: 'In Stock',
      date: '2024-12-28',
    },
    {
      id: 21,
      name: 'Smart Light Bulb',
      category: 'Home Automation',
      status: 'In Stock',
      date: '2024-12-25',
    },
    {
      id: 22,
      name: 'Gaming Chair',
      category: 'Gaming',
      status: 'Out of Stock',
      date: '2024-12-20',
    },
  ]);
</script>
