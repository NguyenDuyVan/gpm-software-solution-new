<template>
  <div>
    <Card v-if="!isLoading" class="max-w-[700px] mx-auto w-full shadow-2xl">
      <template #title>
        <h4 class="text-primary mb-2">{{ $t('transfer_page.title') }}</h4>
      </template>
      <template #content>
        <Message severity="warn" class="mb-4">
          <span v-html="$t('transfer_page.warring_first')"></span>
        </Message>
        <Divider />
        <div class="grid grid-cols-1 xl:grid-cols-12 gap-4">
          <div class="xl:col-span-4">
            <label class="block text-gray-700">{{ $t('transfer_page.software_name') }}</label>
            <span class="font-bold block">{{ appName }}</span>
            <ul class="mt-2 ml-2 mb-4">
              <li v-for="item in modules" :key="item" class="mb-2">
                <Tag severity="info" class="text-xs px-3 py-1 rounded">{{ item }}</Tag>
              </li>
            </ul>

            <label class="block text-gray-700">{{ $t('transfer_page.price') }}</label>
            <span class="font-bold text-red-600 block mb-4">{{
              formatVnPrice(orderObj.actual_price)
            }}</span>

            <label class="block text-gray-700">{{ $t('transfer_page.transfer_content') }}</label>
            <span class="font-bold text-red-600 block mb-4">{{ orderObj.transfer_content }}</span>

            <label class="block text-gray-700">{{ $t('transfer_page.bank_account_number') }}</label>
            <span class="font-bold text-red-600 block">{{ bankAccountNumber }}</span>
            <span class="font-bold block mb-4">{{ bankName }} - {{ bankAccountName }}</span>
          </div>
          <div class="xl:col-span-8">
            <img :src="transferImage" class="w-full mx-auto max-w-96" />
          </div>
          <div class="col-span-full">
            <i class="text-gray-600 italic text-sm" v-html="$t('transfer_page.note')"></i>
          </div>
        </div>
      </template>
    </Card>
    <Loading v-else />
  </div>
</template>

<script setup lang="ts">
  definePageMeta({
    layout: 'admin',
    middleware: undefined,
  });

  const customerService = useCustomerService();

  // Reactive state
  const orderObj = ref({
    id: 0,
    actual_price: 0,
    transfer_content: '',
    project_module_names: '',
    project: {
      name: '',
    },
    project_package: {
      name: '',
    },
  });
  const appName = ref('');
  const modules = ref<string[]>([]);
  const transferImage = ref('/assets/img/loading_img.gif');
  const bankName = ref('MB Bank');
  const bankAccountNumber = ref('');
  const bankAccountName = ref('');
  const isLoading = ref(false);

  // Route and router
  const route = useRoute();
  const router = useRouter();
  const toast = useToast();
  const { t } = useI18n();
  useHead({
    title: t('transfer_page.document_title'),
  });

  // Format price in VND
  const formatVnPrice = (price: number) => {
    return formatPrice(price * 1000);
  };

  // Check transfer status periodically
  const checkTransferStatusAsync = () => {
    const intervalId = setInterval(async () => {
      const result = await customerService.checkTransferedStatusAsync(orderObj.value.id);
      if (result.success === true) {
        router.push({ name: 'buy' });
        clearInterval(intervalId);
      }
    }, 2000);
  };

  onMounted(async () => {
    isLoading.value = true;
    const transferContent = route.query.order as string;
    const result = await customerService.getOrderDetailsAsync(transferContent);

    if (result.success === true) {
      orderObj.value = result.data;
      modules.value = JSON.parse(orderObj.value?.project_module_names);
      appName.value = orderObj.value?.project.name + ' / ' + orderObj.value?.project_package.name;

      // Transfer info
      const transferGetResult = await customerService.getTransferInfoAsync(orderObj.value.id);

      if (transferGetResult.success === true) {
        orderObj.value.transfer_content = transferGetResult.data.transfer_content;
        transferImage.value = transferGetResult.data.qr_image;
        bankAccountName.value = transferGetResult.data.account_name;
        bankAccountNumber.value = transferGetResult.data.account_number;
        bankName.value = transferGetResult.data.bank_name;

        checkTransferStatusAsync();
      }
    } else {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: result.message,
        life: 3000,
      });
      navigateTo('/buy');
    }
    isLoading.value = false;
  });
</script>
