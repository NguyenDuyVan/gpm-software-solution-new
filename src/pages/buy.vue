<template>
  <div>
    <div v-if="step === 1" class="center-box--without-bg">
      <h3>{{ $t('buy_page.title') }}</h3>
    </div>
    <div v-if="step === 2">
      <Button
        icon="pi pi-arrow-left"
        class="p-button-outlined p-button-secondary"
        :label="$t('buy_page.term.back')"
        @click="step = 1"
      />
    </div>

    <Form ref="form" @submit.prevent="submitAsync">
      <div>
        <!-- Step 1-->
        <div v-if="step === 1" class="row">
          <div class="col-md-8">
            <div class="center-box blue-top-border">
              <h6 style="color: #0080c0">{{ $t('buy_page.software_info.title') }}</h6>
              <br />
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="project" class="block mb-2">
                      {{ $t('buy_page.software_info.software_name.label')
                      }}<span class="cl-red">*</span>
                    </label>
                    <SelectBox
                      id="project"
                      ref="selectProject"
                      v-model="orderObj.project_id"
                      :place-holder="softWarePlaceholder"
                      @onchange="projectChangedEvent"
                    >
                    </SelectBox>
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="form-group">
                    <label for="modules" class="block mb-2">{{
                      $t('buy_page.software_info.package')
                    }}</label>
                    <Dropdown
                      v-model="orderObj.project_package_id"
                      :options="uiData.projectPackages"
                      option-label="name"
                      option-value="id"
                      class="w-full"
                      @change="projectPackageChangedEvent"
                    />
                  </div>
                </div>

                <!-- Modules -->
                <div class="col-md-12">
                  <div v-if="uiData.projectModules.length > 0" class="projectModuleContainer">
                    <div class="form-group">
                      <label for="modules" class="block mb-2">Modules</label>

                      <div class="modules-container">
                        <div
                          v-for="item in uiData.projectModules"
                          :key="item.name"
                          class="modules-container__item"
                        >
                          <Checkbox
                            :inputId="'module-' + item.name"
                            v-model="item.selected"
                            :binary="true"
                            :disabled="item.disabled"
                          />
                          <label :for="'module-' + item.name" class="ml-2">{{ item.name }}</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Address -->
            <div class="center-box blue-top-border">
              <div class="address">
                <h6 style="color: #0080c0">{{ $t('buy_page.customer_info.title') }}</h6>
                <br />
                <p style="color: gray">{{ $t('buy_page.customer_info.title') }}</p>

                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="displayName" class="block mb-2">
                        {{ $t('buy_page.customer_info.user_name') }}<span class="cl-red">*</span>
                      </label>
                      <InputText
                        id="displayName"
                        ref="displayNameInput"
                        v-model="customerObj.display_name"
                        class="w-full"
                        required
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="phoneNum" class="block mb-2">{{
                        $t('buy_page.customer_info.phone')
                      }}</label>
                      <InputText id="phoneNum" v-model="customerObj.phone_number" class="w-full" />
                    </div>
                  </div>
                </div>

                <div v-show="!isGlobal" class="field-checkbox mt-3 mb-3">
                  <Checkbox id="notInVietNam" v-model="notInVietNam" :binary="true" />
                  <label for="notInVietNam" class="ml-2">{{
                    $t('buy_page.customer_info.not_in_vi')
                  }}</label>
                </div>

                <div class="row">
                  <div v-if="!notInVietNam" class="col-md-4">
                    <div class="form-group">
                      <label for="province" class="block mb-2">
                        {{ $t('buy_page.customer_info.province.label')
                        }}<span class="cl-red">*</span>
                      </label>
                      <Dropdown
                        v-model="customerObj.province"
                        filter
                        :options="provinceListMap"
                        option-label="name"
                        option-value="value"
                        :placeholder="$t('buy_page.customer_info.province.placeholder')"
                        class="w-full"
                        @change="provinceChanged"
                      />
                    </div>
                  </div>
                  <div v-if="!notInVietNam" class="col-md-4">
                    <div class="form-group">
                      <label for="district" class="block mb-2">
                        {{ $t('buy_page.customer_info.district.label')
                        }}<span class="cl-red">*</span>
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
                  <div v-if="!notInVietNam" class="col-md-4">
                    <div class="form-group">
                      <label for="ward" class="block mb-2">
                        {{ $t('buy_page.customer_info.ward.label') }}<span class="cl-red">*</span>
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
                </div>

                <div class="form-group">
                  <label for="address" class="block mb-2">
                    {{ $t('buy_page.customer_info.address') }} <span class="cl-red">*</span>
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
                  <small
                    style="margin-bottom: 10px; display: block"
                    v-html="$t('buy_page.tax.content')"
                  ></small>
                  <InputText id="tax" v-model="customerObj.tax_code" class="w-full" />
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-4">
            <div class="center-box blue-top-border">
              <h6 style="color: #0080c0">{{ $t('buy_page.software_info.payment_method') }}</h6>
              <br />
              <div class="form-group">
                <label for="paymentMethod" class="block mb-2">
                  {{ $t('buy_page.software_info.select_payment_method')
                  }}<span class="cl-red">*</span>
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
                    strokeWidth="4"
                    fill="var(--surface-ground)"
                    animationDuration=".5s"
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
              <br />
              <h6 style="color: #111111">
                {{ $t('buy_page.software_info.total') }}:
                {{ formatVnPrice(orderObj.actual_price) }}
              </h6>
              <br />
            </div>
            <div class="center-box--without-bg saving-wrapper">
              <Button
                label="$t('buy_page.term.next')"
                icon="pi pi-arrow-right"
                iconPos="right"
                class="p-button-success"
                @click="nextStep()"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Rule -->
      <div v-if="step === 2" class="center-box blue-top-border">
        <div class="warning-container">
          <h6 style="color: #0080c0">{{ $t('buy_page.term.title') }}</h6>
          <br />
          <div class="inline">
            <p v-html="$t('buy_page.term.content')"></p>
            <p v-html="$t('buy_page.term.content2')"></p>
          </div>
        </div>
      </div>

      <!-- Checkout -->
      <div v-if="step === 2" class="center-box--without-bg saving-wrapper">
        <div class="field-checkbox mb-3">
          <Checkbox id="argeeCheckbox" v-model="argeeRule" :binary="true" />
          <label for="argeeCheckbox" class="ml-2">{{ $t('buy_page.term.agree_rule') }}</label>
        </div>

        <Button
          type="submit"
          :disabled="!argeeRule"
          :loading="onSubmiting"
          icon="pi pi-check"
          label="$t('buy_page.term.payment')"
          class="p-button-success"
        />
      </div>
    </Form>
  </div>
</template>
<script setup lang="ts">
  import { Form } from '#components';
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
  const selectProject = ref<any>(null);
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
  const uiData = reactive<UIData>({
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
  const notInVietNam = ref<boolean>(false);
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
    return uiData.projectModules.map(item => item.selected);
  });

  const softWarePlaceholder = computed<string>(() => {
    return t('buy_page.software_info.software_name.placeholder');
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
    if (!form.value?.checkValidity()) {
      form.value?.reportValidity();
    } else if (!orderObj.project_id) {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: t('my_account.noti.software_name_required'),
        life: 3000,
      });
      return;
    } else {
      if (!notInVietNam.value) {
        if (!customerObj.province) {
          toast.add({
            severity: 'error',
            summary: 'Error',
            detail: t('my_account.noti.province_required'),
            life: 3000,
          });
          return;
        }

        if (!customerObj.district) {
          toast.add({
            severity: 'error',
            summary: 'Error',
            detail: t('my_account.noti.district_required'),
            life: 3000,
          });
          return;
        }

        if (!customerObj.ward) {
          toast.add({
            severity: 'error',
            summary: 'Error',
            detail: t('my_account.noti.ward_required'),
            life: 3000,
          });
          return;
        }
      }

      step.value = 2;
      const element = document.querySelector('.main-content-body');
      if (element) {
        element.scrollTo({
          top: 0,
        });
      }
    }
  };

  const submitAsync = async (): Promise<void> => {
    onSubmiting.value = true;

    // Standardize data
    const slectedModulesName: string[] = [];
    uiData.projectModules.forEach(item => {
      if (item.selected) slectedModulesName.push(item.name);
    });
    orderObj.project_module_names = slectedModulesName;

    // Update user info
    if (notInVietNam.value) customerObj.address = customerObj.addressText || '';
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
  const projectChangedEvent = (): void => {
    const selectedProject = uiData.projects.find(item => item.id == orderObj.project_id);
    if (selectedProject === undefined) return;

    uiData.projectModules = [];
    uiData.projectPackages = [];

    selectedProject.modules.forEach(item => {
      uiData.projectModules.push({
        name: item.name,
        price: item.price,
        global_price: item.global_price,
        selected: false,
      });
    });

    uiData.projectPackages = selectedProject.packages;
    if (uiData.projectPackages.length > 0) {
      orderObj.project_package_id = uiData.projectPackages[0].id;
      orderObj.actual_price = uiData.projectPackages[0].price;
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
      const selectPackage = uiData.projectPackages.find(
        item => item.id == orderObj.project_package_id
      );
      if (selectPackage) {
        orderObj.actual_price = parseInt(getPriceByLocation(selectPackage));
        const selectedModules = uiData.projectModules.filter(
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
      uiData.projects = result.data;

      // Auto select from 'f' query param
      let autoSelectId: string | number | undefined = undefined;
      const storedF = localStorage.getItem('f');
      if (storedF) {
        const project = uiData.projects.find(p => p.name === storedF);
        if (project) {
          orderObj.project_id = project.id;
          autoSelectId = project.id;
          projectChangedEvent();
        }
      }

      selectProject.value.updateSuggestList(result.data, 'name', 'id');
      selectProject.value.setSelectedId(autoSelectId);

      if (storedF) localStorage.removeItem('f');
    }
  };

  // Lifecycle hooks
  onMounted(async () => {
    isGlobal.value = (localStorage.getItem('lang') ?? 'vi') !== 'vi';
    notInVietNam.value = isGlobal.value;
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
        notInVietNam.value = false;
      } else {
        customerObj.addressText = customerObj.address;
        notInVietNam.value = true;
      }
    }
  });
</script>

<style scoped>
  .modules-container {
    display: flex;
    flex-wrap: wrap;
    background: #f7f7f7;
    padding: 15px;
    border-radius: 5px;
  }

  .modules-container__item {
    padding: 5px 15px 5px 0px;
    display: flex;
    align-items: center;
  }

  .field-checkbox {
    display: flex;
    align-items: center;
  }

  .radioLicenseModeContainer {
    margin-right: 5px;
    margin-bottom: 30px;
  }
</style>
