<template>
  <Card v-if="!isLoading" class="bg-white dark:bg-gray-800 rounded-xl shadow-md">
    <template #title>
      <div class="flex justify-between items-center">
        <h4 class="text-primary mb-2">{{ $t('buy_page.software_info.title') }}</h4>
      </div>
    </template>
    <template #content>
      <Form ref="formRef" @submit="submitAsync">
        <div class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="form-group">
              <label for="project" class="block mb-2">
                {{ $t('buy_page.software_info.software_name.label')
                }}<span class="text-red-600">*</span>
              </label>

              <Select
                v-model="orderObj.project_id"
                :options="softwareData.projects"
                option-value="id"
                option-label="name"
                filter
                :placeholder="t('buy_page.software_info.software_name.placeholder')"
                class="w-full"
                @value-change="onSelectedSoftware"
              />
              <Message
                v-if="orderErrors.project_id"
                severity="error"
                size="small"
                variant="simple"
                >{{ orderErrors.project_id }}</Message
              >
            </div>

            <div class="form-group">
              <label for="modules" class="block mb-2">{{
                $t('buy_page.software_info.package')
              }}</label>
              <Select
                v-model="orderObj.project_package_id"
                :options="softwareData.projectPackages"
                option-label="name"
                option-value="id"
                class="w-full"
                @change="caculatePriceAsync"
              />
              <Message
                v-if="orderErrors.project_package_id"
                severity="error"
                size="small"
                variant="simple"
                >{{ orderErrors.project_package_id }}</Message
              >
            </div>
          </div>

          <!-- Modules -->
          <div class="col-md-12">
            <div v-if="softwareData.projectModules.length > 0" class="projectModuleContainer">
              <div class="form-group">
                <label for="modules" class="block mb-2">Modules</label>

                <div
                  class="grid grid-cols-2 xl:grid-cols-4 gap-4 flex-wrap bg-gray-100 dark:bg-gray-700 p-4 rounded-md"
                >
                  <div
                    v-for="item in softwareData.projectModules"
                    :key="item.name"
                    class="flex items-center"
                  >
                    <Checkbox
                      v-model="item.selected"
                      :input-id="'module-' + item.name"
                      :binary="true"
                      :disabled="item.disabled"
                    />
                    <label :for="'module-' + item.name" class="ml-2 truncate">{{
                      item.name
                    }}</label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Client info -->
          <div class="address">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="form-group">
                <label for="displayName" class="block mb-2">
                  {{ $t('buy_page.customer_info.user_name') }}<span class="text-red-600">*</span>
                </label>
                <InputText
                  id="displayName"
                  ref="displayNameInput"
                  v-model="customerObj.display_name"
                  class="w-full"
                />
                <Message
                  v-if="customerErrors.display_name"
                  severity="error"
                  size="small"
                  variant="simple"
                  >{{ customerErrors.display_name }}</Message
                >
              </div>
              <div class="form-group">
                <label for="phoneNum" class="block mb-2">{{
                  $t('buy_page.customer_info.phone')
                }}</label>
                <InputText id="phoneNum" v-model="customerObj.phone_number" class="w-full" />
              </div>

              <div v-if="liveInVietnam" class="col-md-4">
                <div class="form-group">
                  <label for="province" class="block mb-2">
                    {{ $t('buy_page.customer_info.province.label')
                    }}<span class="text-red-600">*</span>
                  </label>

                  <Select
                    v-model="customerObj.province"
                    :options="provinceListMap"
                    option-label="name"
                    option-value="value"
                    filter
                    :placeholder="$t('buy_page.customer_info.province.placeholder')"
                    class="w-full"
                    @value-change="provinceChanged"
                  />
                  <Message
                    v-if="customerErrors.province"
                    severity="error"
                    size="small"
                    variant="simple"
                    >{{ customerErrors.province }}</Message
                  >
                </div>
              </div>
              <div v-if="liveInVietnam" class="col-md-4">
                <div class="form-group">
                  <label for="district" class="block mb-2">
                    {{ $t('buy_page.customer_info.district.label')
                    }}<span class="text-red-600">*</span>
                  </label>
                  <Select
                    v-model="customerObj.district"
                    filter
                    :options="districtListMap"
                    option-label="name"
                    option-value="value"
                    :placeholder="$t('buy_page.customer_info.district.placeholder')"
                    class="w-full"
                    @change="districtChanged"
                  />
                  <Message
                    v-if="customerErrors.district"
                    severity="error"
                    size="small"
                    variant="simple"
                    >{{ customerErrors.district }}</Message
                  >
                </div>
              </div>
              <div v-if="liveInVietnam" class="col-md-4">
                <div class="form-group">
                  <label for="ward" class="block mb-2">
                    {{ $t('buy_page.customer_info.ward.label') }}<span class="text-red-600">*</span>
                  </label>
                  <Select
                    v-model="customerObj.ward"
                    filter
                    :options="wardListMap"
                    option-label="name"
                    option-value="value"
                    :placeholder="$t('buy_page.customer_info.ward.placeholder')"
                    class="w-full"
                  />
                  <Message
                    v-if="customerErrors.ward"
                    severity="error"
                    size="small"
                    variant="simple"
                    >{{ customerErrors.ward }}</Message
                  >
                </div>
              </div>

              <div class="form-group">
                <label for="address" class="block mb-2">
                  {{ $t('buy_page.customer_info.address') }}
                  <span class="text-red-600">*</span>
                </label>
                <InputText id="address" v-model="customerObj.addressText" class="w-full" />
                <Message
                  v-if="customerErrors.addressText"
                  severity="error"
                  size="small"
                  variant="simple"
                  >{{ customerErrors.addressText }}</Message
                >
              </div>
              <div class="form-group">
                <label for="tax" class="block mb-2">{{ $t('buy_page.tax.tax_code') }}</label>
                <InputText id="tax" v-model="customerObj.tax_code" class="w-full" />
              </div>
            </div>
          </div>
        </div>

        <!-- Payment info -->

        <div class="mt-6 space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="form-group">
              <label for="paymentMethod" class="block mb-2">
                {{ $t('buy_page.software_info.select_payment_method')
                }}<span class="text-red-600">*</span>
              </label>
              <Select
                id="paymentMethod"
                v-model="paymentMethod"
                :options="paymentMethods"
                option-label="name"
                option-value="value"
                :placeholder="$t('buy_page.software_info.payment_method')"
                class="w-full"
              />
            </div>
            <div class="form-group">
              <label for="affiliate_code" class="block mb-2">
                {{ $t('buy_page.software_info.aff_code') }}
                <ProgressSpinner
                  v-show="isLoadingAffInfo"
                  style="width: 20px; height: 20px; margin-left: 5px; vertical-align: middle"
                  stroke-width="4"
                  fill="var(--surface-ground)"
                  animation-duration=".5s"
                />
              </label>
              <InputText
                id="affiliate_code"
                v-model="orderObj.affiliate_code"
                class="w-full"
                @input="affCodeChangedEvent"
              />

              <div v-if="affMessage != ''">
                <Message severity="info" class="mt-3">{{ affMessage }}</Message>
              </div>
            </div>
          </div>
          <div class="py-4 space-y-2">
            <div class="field-checkbox mb-3">
              <Checkbox v-model="argeeRule" input-id="argeeCheckbox" :binary="true" />
              <label
                for="argeeCheckbox"
                class="ml-2"
                v-html="$t('buy_page.term.agree_rule')"
              ></label>
            </div>
            <div class="flex justify-between">
              <div class="center-box--without-bg saving-wrapper">
                <Button
                  severity="success"
                  :class="`font-bold ${!argeeRule ? '!cursor-not-allowed !opacity-40' : 'cursor-pointer'}`"
                  :label="$t('buy_page.term.payment')"
                  icon="pi pi-money-bill"
                  :disabled="!argeeRule"
                  :loading="isLoadingSubmit"
                  type="submit"
                ></Button>
              </div>
              <div>
                {{ $t('buy_page.software_info.total_money') }}:
                <span class="font-bold text-green-600 ml-2">{{
                  formatVnPrice(orderObj.actual_price)
                }}</span>
              </div>
            </div>

            <small
              class="italic"
              v-html="
                t('buy_page.tax.content', {
                  html: `<a href='https://facebook.com/giaiphapmmodotnet' style='color:#0d6efd'>Fanpage</a>`,
                  interpolation: { escapeValue: false },
                })
              "
            />
          </div>
        </div>
      </Form>
    </template>
  </Card>
  <Loading v-else />
</template>
<script setup lang="ts">
  import { useCustomerAddress } from '@/hooks/buy-page/useCustomerAddress';
  import { useCustomerInfo } from '@/hooks/buy-page/useCustomerInfo';
  import { usePaymentProcess } from '@/hooks/buy-page/usePaymentProcess';
  import { useSoftwareData } from '@/hooks/buy-page/useSoftwareData';
  import { useSubmitForm } from '@/hooks/buy-page/useSubmitForm';
  import { useValidateForm } from '@/hooks/buy-page/useValidateForm';
  import type { OrderObject, CustomerObject } from '@/types/buy';

  definePageMeta({
    layout: 'admin',
    middleware: 'admin',
  });

  // Setup component
  const { t, locale } = useI18n();
  useHead({
    title: computed(() => t('buy_page.document_title')),
  });

  // References
  const formRef = ref<any>(null);
  const displayNameInput = ref<HTMLInputElement | null>(null);
  const isLoading = ref<boolean>(false);
  const liveInVietnam = computed(() => locale.value === 'vi');

  // Form data
  const orderObj = reactive<OrderObject>({
    modify_license_mode: 'NEW',
    project_id: null,
    project_module_names: [],
    project_package_id: null,
    actual_price: 0,
    affiliate_code: null,
  });

  const customerObj = reactive<CustomerObject>({
    province: null,
    district: null,
    ward: null,
    addressText: null,
    display_name: '',
    phone_number: '',
    tax_code: '',
    address: '',
    id: null,
  });

  const {
    onSelectedSoftware,
    isLoadingAffInfo,
    loadProjectSelectBoxAsync,
    affMessage,
    formatVnPrice,
    caculatePriceAsync,
    affCodeChangedEvent,
    softwareData,
  } = useSoftwareData(orderObj);

  const { loadCustomerData } = useCustomerInfo(customerObj);

  // Initialize hooks with shared state
  const {
    provinceListMap,
    districtListMap,
    wardListMap,
    provinceChanged,
    districtChanged,
    initializeAddressData,
    formatFullAddress,
  } = useCustomerAddress(customerObj);

  const { createOrder } = usePaymentProcess(orderObj);
  const { orderErrors, customerErrors, isSubmmited, validateForm } = useValidateForm(
    orderObj,
    customerObj
  );
  const { submitAsync, isLoadingSubmit } = useSubmitForm(
    softwareData,
    customerObj,
    createOrder,
    formatFullAddress,
    isSubmmited,
    validateForm
  );

  const { paymentMethods, paymentMethod, argeeRule } = usePaymentProcess(orderObj);

  // Computed for selected modules
  const projectModuleSelected = computed<boolean[]>(() => {
    return softwareData.projectModules.map(item => item.selected);
  });

  // Watch selected modules for price calculation
  watch(projectModuleSelected, () => {
    caculatePriceAsync();
  });

  onMounted(async () => {
    isLoading.value = true;

    const storedRef = localStorage.getItem('ref');
    if (storedRef) {
      orderObj.affiliate_code = storedRef;
    }

    await Promise.all([
      loadProjectSelectBoxAsync(),
      storedRef ? caculatePriceAsync() : Promise.resolve(),
      loadCustomerData(),
      initializeAddressData(),
    ]);

    isLoading.value = false;
  });
</script>
