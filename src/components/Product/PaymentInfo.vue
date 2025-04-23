<template>
  <div class="bg-white space-y-2">
    <!-- Payment Method -->
    <div>
      <h2 class="text-lg font-semibold text-gray-800">Hình thức thanh toán</h2>
      <div class="flex items-center mt-2">
        <span class="bg-green-600 text-white text-xs font-medium px-2 py-1 rounded">COD</span>
        <span class="ml-2 text-gray-700 text-sm">Thanh toán bằng tiền mặt (COD)</span>
      </div>
    </div>

    <div class="border-t border-gray-300 my-4" />

    <!-- Shipping Fee -->
    <div>
      <div class="flex justify-between items-center">
        <h2 class="text-lg font-semibold text-gray-800">Vận chuyển</h2>
        <div class="flex items-center">
          <span class="text-gray-700">22.200đ</span>
          <span class="ml-2 text-red-500 font-medium">Free</span>
          <svg
            class="w-4 h-4 ml-1 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
      <div class="mt-4 text-sm text-gray-600">
        <span
          class="px-2 py-0.5 border leading-6 border-solid border-cyan-500 rounded text-cyan-500"
          >Voucher giảm phí vận chuyển</span
        >
        <span class="ml-2"
          >Giảm 5000đ phí vận chuyển đối với các đơn hàng trị giá 25000đ trở lên, giảm 25000đ phí
          vận chuyển đối với các đơn hàng trị giá 80.000đ trở lên</span
        >
      </div>
    </div>

    <div class="border-t border-gray-300 my-4" />

    <!-- Return Policy -->
    <div class="mb-2">
      <h2 class="text-lg font-semibold text-gray-800">Chính sách đổi trả</h2>
      <p class="mt-2 text-gray-700 text-sm">
        Trả hàng trong vòng 7 ngày - Hủy đơn để đăng - Hoàn hàng miễn phí
      </p>
    </div>
  </div>
</template>
<script>
  export default {};
</script>
<style lang=""></style>
