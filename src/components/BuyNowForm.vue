<template>
  <div class="px-6 py-12 bg-white">
    <div class="max-w-sm mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow">
      <form class="space-y-4">
        <!-- Name Input -->
        <input
          type="text"
          placeholder="Họ và Tên"
          class="w-full px-4 py-2 border border-gray-300 text-sm rounded focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <!-- Phone Input -->
        <input
          type="text"
          placeholder="Số điện thoại"
          class="w-full px-4 py-2 border border-gray-300 text-sm rounded focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <!-- Quantity Input -->
        <input
          type="number"
          placeholder="Số lượng"
          class="w-full px-4 py-2 border border-gray-300 text-sm rounded focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        <!-- Address Input -->
        <input
          type="text"
          placeholder="Địa chỉ"
          class="w-full px-4 py-2 border border-gray-300 text-sm rounded focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        <!-- Submit Button -->
        <button
          type="button"
          class="w-full bg-red-500 text-white font-semibold py-2 rounded-lg hover:bg-pink-600 transition"
        >
          Mua Ngay
        </button>
      </form>
    </div>
  </div>
</template>
<script>
  export default {};
</script>
<style lang=""></style>
