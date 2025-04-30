<template>
  <div>
    <Card class="bg-white dark:bg-gray-800 shadow rounded-xl">
      <template #title>
        <div class="flex justify-between items-center">
          <h4 class="text-primary mb-2">{{ $t('buy_page.software_info.title') }}</h4>
          <div v-show="!isGlobal" class="flex items-center">
            <label for="liveInVietnam" class="mr-2 text-sm">{{
              $t('buy_page.customer_info.live_in_vi')
            }}</label>
            <Checkbox id="liveInVietnam" v-model="liveInVietnam" :binary="true" />
          </div>
        </div>
      </template>
      <template #content>
        <Form ref="form" @submit.prevent="submitAsync">
          <div class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="form-group">
                <label for="project" class="block mb-2">
                  {{ $t('buy_page.software_info.software_name.label')
                  }}<span class="text-red-600">*</span>
                </label>

                <Dropdown
                  v-model="orderObj.project_id"
                  :options="softwareList"
                  option-value="id"
                  option-label="name"
                  filter
                  :placeholder="t('buy_page.software_info.software_name.placeholder')"
                  class="w-full"
                  @value-change="onSelectedSoftware"
                />
              </div>

              <div class="form-group">
                <label for="modules" class="block mb-2">{{
                  $t('buy_page.software_info.package')
                }}</label>
                <Dropdown
                  v-model="orderObj.project_package_id"
                  :options="softwareData.projectPackages"
                  option-label="name"
                  option-value="id"
                  class="w-full"
                  @change="projectPackageChangedEvent"
                />
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
                    required
                  />
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

                    <Dropdown
                      v-model="customerObj.province"
                      :options="provinceListMap"
                      option-label="name"
                      option-value="value"
                      filter
                      :placeholder="$t('buy_page.customer_info.province.placeholder')"
                      class="w-full"
                      @value-change="provinceChanged"
                    />
                  </div>
                </div>
                <div v-if="liveInVietnam" class="col-md-4">
                  <div class="form-group">
                    <label for="district" class="block mb-2">
                      {{ $t('buy_page.customer_info.district.label')
                      }}<span class="text-red-600">*</span>
                    </label>
                    <Dropdown
                      v-model="customerObj.district"
                      filter
                      :options="districtListMap"
                      option-label="name"
                      option-value="value"
                      :placeholder="$t('buy_page.customer_info.district.placeholder')"
                      class="w-full"
                      @change="districtChanged"
                    />
                  </div>
                </div>
                <div v-if="liveInVietnam" class="col-md-4">
                  <div class="form-group">
                    <label for="ward" class="block mb-2">
                      {{ $t('buy_page.customer_info.ward.label')
                      }}<span class="text-red-600">*</span>
                    </label>
                    <Dropdown
                      v-model="customerObj.ward"
                      filter
                      :options="wardListMap"
                      option-label="name"
                      option-value="value"
                      :placeholder="$t('buy_page.customer_info.ward.placeholder')"
                      class="w-full"
                    />
                  </div>
                </div>

                <div class="form-group">
                  <label for="address" class="block mb-2">
                    {{ $t('buy_page.customer_info.address') }}
                    <span class="text-red-600">*</span>
                  </label>
                  <InputText
                    id="address"
                    v-model="customerObj.addressText"
                    class="w-full"
                    required
                  />
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
                <Dropdown
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
                    v-show="onLoadingAffInfo"
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
                <Checkbox id="argeeCheckbox" v-model="argeeRule" :binary="true" />
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
                    :loading="onSubmiting"
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
  </div>
</template>
<script setup lang="ts">
  import type {
    OrderObject,
    UIData,
    CustomerObject,
    AddressData,
    PaymentMethod,
    CustomerUpdateObject,
    ApiResponse,
    TransferData,
    Project,
  } from '@/types/buy';

  definePageMeta({
    layout: 'admin',
    middleware: undefined,
  });

  // Setup component
  const { t } = useI18n();
  const router = useRouter();
  const toast = useToast();
  const { getAddressDataAsync } = useAddressProvider();
  const { getCurrentUserAsync, updateCurrentUserAsync } = useAuthService();
  const db = useCustomerService();

  useHead({
    title: computed(() => t('buy_page.document_title')),
  });

  // References
  const form = ref<HTMLFormElement | null>(null);
  const softwareList = ref<Project[]>([]);
  const displayNameInput = ref<HTMLInputElement | null>(null);

  // Reactive state
  const isGlobal = ref<boolean>();
  const orderObj = reactive<OrderObject>({
    modify_license_mode: 'NEW',
    project_id: '',
    project_module_names: [],
    project_package_id: null,
    actual_price: 0,
    affiliate_code: null,
  });

  const affMessage = ref<string>('');
  const softwareData = reactive<UIData>({
    projectModules: [], // {name: '', selected: false}
    projectPackages: [],
    projects: [],
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

  const addressData = ref<AddressData>({});
  const provinceList = ref<string[]>([]);
  const districtList = ref<string[]>([]);
  const wardList = ref<string[]>([]);
  const liveInVietnam = ref<boolean>(false);
  const onLoadingAffInfo = ref<boolean>(false);
  const onSubmiting = ref<boolean>(false);
  const argeeRule = ref<boolean>(false);
  const paymentMethods = ref<PaymentMethod[]>([
    { name: t('buy_page.software_info.bank'), value: 'BANKING' },
    { name: 'Card / Paypal', value: 'GLOBAL_GATEWAY' },
    { name: 'Crypto', value: 'CRYPTO' },
  ]);
  const paymentMethod = ref<string>('BANKING');
  const step = ref<number>(1);

  // Computed properties
  const projectModuleSelected = computed<boolean[]>(() => {
    return softwareData.projectModules.map(item => item.selected);
  });

  const provinceListMap = computed(() => {
    return provinceList.value.map(item => {
      return { name: item, value: item };
    });
  });

  const districtListMap = computed(() => {
    return districtList.value.map(item => {
      return { name: item, value: item };
    });
  });

  const wardListMap = computed(() => {
    return wardList.value.map(item => {
      return { name: item, value: item };
    });
  });

  // Watchers
  watch(projectModuleSelected, () => {
    caculatePriceAsync();
  });

  // Methods
  const nextStep = (): void => {
    // if (!form.value?.checkValidity()) {
    //   form.value?.reportValidity();
    // } else if (!orderObj.project_id) {
    //   toast.add({
    //     severity: 'error',
    //     summary: 'Error',
    //     detail: t('my_account.noti.software_name_required'),
    //     life: 3000,
    //   });
    //   return;
    // } else {
    //   if (liveInVietnam.value) {
    //     if (!customerObj.province) {
    //       toast.add({
    //         severity: 'error',
    //         summary: 'Error',
    //         detail: t('my_account.noti.province_required'),
    //         life: 3000,
    //       });
    //       return;
    //     }

    //     if (!customerObj.district) {
    //       toast.add({
    //         severity: 'error',
    //         summary: 'Error',
    //         detail: t('my_account.noti.district_required'),
    //         life: 3000,
    //       });
    //       return;
    //     }

    //     if (!customerObj.ward) {
    //       toast.add({
    //         severity: 'error',
    //         summary: 'Error',
    //         detail: t('my_account.noti.ward_required'),
    //         life: 3000,
    //       });
    //       return;
    //     }
    //   }

    // }
    step.value = 2;
    const element = document.querySelector('.main-content-body');
    if (element) {
      element.scrollTo({
        top: 0,
      });
    }
  };

  const submitAsync = async (): Promise<void> => {
    onSubmiting.value = true;

    // Standardize data
    const slectedModulesName: string[] = [];
    softwareData.projectModules.forEach(item => {
      if (item.selected) slectedModulesName.push(item.name);
    });
    orderObj.project_module_names = slectedModulesName;

    // Update user info
    if (!liveInVietnam.value) customerObj.address = customerObj.addressText || '';
    else
      customerObj.address =
        (customerObj.addressText?.replace(',', '') || '') +
        ', ' +
        (customerObj.ward || '') +
        ', ' +
        (customerObj.district || '') +
        ', ' +
        (customerObj.province || '');

    const customerUpdateObj: CustomerUpdateObject = {
      id: customerObj.id,
      display_name: customerObj.display_name,
      phone_number: customerObj.phone_number,
      address: customerObj.address,
      tax_code: customerObj.tax_code,
    };
    await updateCurrentUserAsync(customerUpdateObj);

    // Insert to db
    const result: ApiResponse<TransferData> = await db.createOrderAsync(orderObj);

    if (result.success === true) {
      toast.add({
        severity: 'success',
        summary: 'Success',
        detail: t('buy_page.noti.success'),
        life: 3000,
      });
      router.push({
        name: 'transfer',
        query: { order: result.data?.transfer_content },
      });
    } else {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: result.message || 'Unknown error',
        life: 3000,
      });
      step.value = 1;
    }

    onSubmiting.value = false;
  };

  // Events
  const onSelectedSoftware = (): void => {
    const project_id = orderObj.project_id;

    const selectedProject = softwareData.projects.find(item => item.id == project_id);
    if (selectedProject === undefined) return;

    softwareData.projectModules = [];
    softwareData.projectPackages = [];

    selectedProject.modules.forEach(item => {
      softwareData.projectModules.push({
        name: item.name,
        price: item.price,
        global_price: item.global_price,
        selected: false,
      });
    });

    softwareData.projectPackages = selectedProject.packages;
    if (softwareData.projectPackages.length > 0) {
      orderObj.project_package_id = softwareData.projectPackages[0].id;
      orderObj.actual_price = softwareData.projectPackages[0].price;
    }
  };

  const affCodeChangedEvent = async (): Promise<void> => {
    await caculatePriceAsync();
  };

  const projectPackageChangedEvent = async (): Promise<void> => {
    await caculatePriceAsync();
  };

  const caculatePriceAsync = async (): Promise<void> => {
    try {
      const selectPackage = softwareData.projectPackages.find(
        item => item.id == orderObj.project_package_id
      );
      if (selectPackage) {
        orderObj.actual_price = parseInt(getPriceByLocation(selectPackage));
        const selectedModules = softwareData.projectModules.filter(
          item => item.selected && !item.disabled
        );
        selectedModules.forEach(item => {
          orderObj.actual_price += parseInt(getPriceByLocation(item));
        });

        if (orderObj.affiliate_code) {
          onLoadingAffInfo.value = true;
          const checker: ApiResponse<any> = await db.getAffiliateInfoAsync(orderObj.affiliate_code);

          if (checker.success === true) {
            const saleOffPercent = parseInt(process.env.VUE_APP_AFFILIATE_PERCENT_FOR_BUYER || '0');
            if (orderObj.actual_price > 0) {
              orderObj.actual_price = ((100 - saleOffPercent) * orderObj.actual_price) / 100;
            }
          }

          affMessage.value = checker.message || '';
          onLoadingAffInfo.value = false;
        }
      }
    } catch (error) {
      console.error('Error calculating price:', error);
    }
  };

  const getPriceByLocation = (obj: { price: number; global_price: number }): string => {
    if (isGlobal.value) return obj.global_price.toString();
    return obj.price.toString();
  };

  const formatVnPrice = (price: number): string => {
    if (!isGlobal.value) return formatPrice(price * 1000);
    return price + ' USD';
  };

  const provinceChanged = (): void => {
    wardList.value = [];
    if (customerObj.province && addressData.value[customerObj.province]) {
      districtList.value = Object.keys(addressData.value[customerObj.province]);
      districtList.value.sort((a, b) => a.localeCompare(b));
    } else districtList.value = [];
    customerObj.district = null;
    customerObj.ward = null;
  };

  const districtChanged = (): void => {
    if (
      customerObj.province &&
      customerObj.district &&
      addressData.value[customerObj.province] &&
      addressData.value[customerObj.province][customerObj.district]
    ) {
      wardList.value = addressData.value[customerObj.province][customerObj.district];
      wardList.value.sort((a, b) => a.localeCompare(b));
    } else wardList.value = [];
    customerObj.ward = null;
  };

  // Data loader
  const loadProjectSelectBoxAsync = async (): Promise<void> => {
    const result: ApiResponse<Project[]> = await db.getCanBuyProjectsAsync();
    if (result.success === true && result.data) {
      softwareData.projects = result.data;

      // Auto select from 'f' query param
      let autoSelectId: string | number | undefined = undefined;
      const storedF = localStorage.getItem('f');
      if (storedF) {
        const project = softwareData.projects.find(p => p.name === storedF);
        if (project) {
          orderObj.project_id = project.id;
          autoSelectId = project.id;
          onSelectedSoftware(project);
        }
      }

      softwareList.value = result.data;
      if (autoSelectId) orderObj.project_id = autoSelectId;

      if (storedF) localStorage.removeItem('f');
    }
  };

  // Lifecycle hooks
  onMounted(async () => {
    isGlobal.value = localStorage.getItem('lang') === 'en';
    liveInVietnam.value = !isGlobal.value;
    await loadProjectSelectBoxAsync();

    const storedRef = localStorage.getItem('ref');
    if (storedRef) {
      orderObj.affiliate_code = storedRef;
      caculatePriceAsync();
    }

    const userResult = await getCurrentUserAsync();
    if (userResult.data) {
      const userData = userResult.data;
      Object.assign(customerObj, userData);
    }

    addressData.value = await getAddressDataAsync();

    // Get all province
    provinceList.value = Object.keys(addressData.value);
    provinceList.value.sort((a, b) => a.localeCompare(b));

    // Fill address from raw data
    if (customerObj.address && customerObj.address.split('').length > 0) {
      const addressParts = customerObj.address.split(',');

      if (addressParts.length == 4) {
        customerObj.addressText = addressParts[0].trim();
        customerObj.province = addressParts[3].trim();
        provinceChanged();

        customerObj.district = addressParts[2].trim();
        districtChanged();

        customerObj.ward = addressParts[1].trim();
        liveInVietnam.value = true;
      } else {
        customerObj.addressText = customerObj.address;
      }
    }
  });
</script>
