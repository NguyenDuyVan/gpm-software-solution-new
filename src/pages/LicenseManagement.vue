<template>
  <div class="space-y-4">
    <Message
      severity="warn"
      closable
      icon="pi pi-exclamation-triangle"
      class="mt-3 p-2 shadow-md rounded-xl"
    >
      <span v-html="warringContent"></span>
    </Message>

    <Message
      severity="info"
      closable
      icon="pi pi-exclamation-triangle"
      class="mt-3 p-2 shadow-md rounded-xl"
    >
      <span v-html="instructionsContent"></span>
    </Message>

    <div class="mt-3 shadow-md rounded-xl overflow-hidden">
      <DataTable :value="licenseObjs" :loading="inLoading" class="w-full">
        <Column field="license" :header="$t('license.data_table1.license')">
          <template #body="{ data }">
            <span
              class="cursor-pointer"
              :title="$t('license.data_table1.title.copy')"
              @click="copy(data.license)"
            >
              <i class="pi pi-copy mr-1"></i>{{ data.license }}
            </span>
            <Button
              icon="pi pi-refresh"
              class="p-button-text p-0 ml-2"
              :title="$t('license.data_table1.title.change_license')"
              @click="changeLicenseAsync_event(data)"
            />
            <br />
            <span class="text-blue-600 cursor-pointer text-sm" @click="showSubLicenseModal(data)"
              >Quản lý Sub-license</span
            >
            <span class="text-gray-500 mx-1">|</span>
            <span class="text-red-700 cursor-pointer text-sm" @click="deleteSubLinceseAsync(data)"
              >Xóa sub-license</span
            >
          </template>
        </Column>
        <Column field="project.name" :header="$t('license.data_table1.software')">
          <template #body="{ data }">
            <span class="text-blue-600">{{ data.project.name }}</span>
          </template>
        </Column>
        <Column field="created_at" :header="$t('license.data_table1.buy_date')">
          <template #body="{ data }">
            {{ formatDateStr(data.created_at) }}
          </template>
        </Column>
        <Column field="active_devices_count" :header="$t('license.data_table1.device')">
          <template #body="{ data }">
            <span>
              <b class="text-red-600">{{ data.active_devices_count }}</b> /
              {{ data.limit_devices }}
              <Button
                icon="pi pi-refresh"
                class="p-button-text p-0 ml-2"
                :title="$t('license.data_table1.title.reset')"
                @click="resetDevicesAsync_event(data)"
              />
            </span>
          </template>
        </Column>
        <Column :header="''">
          <template #body="{ data }">
            <a
              :href="data.project.download_url"
              target="_blank"
              :title="$t('license.data_table1.title.download')"
            >
              <Button icon="pi pi-download" class="p-button-success p-1" />
            </a>
            <Button
              icon="pi pi-arrow-up"
              class="p-button-warning p-1 ml-2"
              :title="$t('license.data_table1.title.buy_more')"
              @click="showLicenseUpgradeModal(data)"
            />
          </template>
        </Column>
        <template #empty>
          <p class="text-center py-4">{{ $t('common.no_data') }}</p>
        </template>
      </DataTable>
    </div>

    <!-- Upgrade license -->
    <Dialog
      v-model:visible="isShowUpgradeModal"
      :header="$t('license.modal_upgrade.title')"
      :style="{ width: '700px' }"
      modal
    >
      <div class="flex flex-col md:flex-row gap-4">
        <div class="flex-1">
          <img :src="upgradeLicenseObj.transferImage" class="w-full" />
        </div>
        <div class="flex-1">
          <label>
            <h3 class="text-blue-600">{{ upgradeLicenseObj.projectObj?.name }}</h3>
          </label>
          <div class="mt-4">
            <b class="text-gray-700">{{ $t('license.modal_upgrade.buy_more_modules') }}</b>
            <div class="flex flex-wrap mt-2">
              <div
                v-for="item in upgradeLicenseObj.projectObj?.modules"
                :key="item.name"
                class="mr-4 mb-2 flex items-center"
              >
                <Checkbox
                  v-model="item.selected"
                  :input-id="'module-' + item.name"
                  :binary="true"
                  :disabled="item.disabled"
                />
                <label :for="'module-' + item.name" class="ml-2">{{ item.name }}</label>
              </div>
            </div>
          </div>
          <div v-if="upgradeLicenseObj.upDeviceRules.length > 0" class="mt-4">
            <b class="text-gray-700">{{ $t('license.modal_upgrade.buy_more_devices') }}</b>
            <InputNumber v-model="upgradeLicenseObj.upDevices" class="w-full mt-2" :min="0" />
            <h4 class="text-lg text-gray-900 mt-4">
              {{ $t('license.modal_upgrade.total') }}: {{ formatVnPrice(upgradeLicenseObj.price) }}
            </h4>
          </div>
          <Button
            label="Tạo mã QR"
            icon="pi pi-qrcode"
            class="p-button-success w-full mt-4"
            :loading="upgradeLicenseObj.isCalculating"
            @click="generateQRAsync"
          />
        </div>
      </div>
      <div class="mt-4">
        <p class="text-blue-600">{{ $t('license.modal_upgrade.content') }}</p>
      </div>
    </Dialog>

    <!-- Sub license-->
    <Dialog
      v-model:visible="isShowSubLicenseModal"
      :header="$t('license.modal_sublicense.title')"
      :style="{ width: '700px' }"
      modal
    >
      <div class="max-h-[600px] overflow-y-auto">
        <small>{{ $t('license.modal_sublicense.description') }}</small>
        <div v-if="subLicenseObj.licenseObj" class="bg-blue-100 text-blue-600 rounded p-4 my-4">
          <small v-if="subLicenseObj.numberSubLicCanCreate > 0">
            {{ $t('license.modal_sublicense.can_create.previos') }}
            <b>{{ subLicenseObj.numberSubLicCanCreate }}</b>
            {{ $t('license.modal_sublicense.can_create.next') }}
          </small>
          <small v-else class="text-red-600">{{
            $t('license.modal_sublicense.can_not_create')
          }}</small>
        </div>
        <div v-show="subLicenseObj.numberSubLicCanCreate > 0" class="mb-4">
          <Button
            label="Tạo Sub-license"
            class="p-button-success"
            @click="createSubLicensesEventAsync"
          />
        </div>
        <DataTable :value="subLicenseObj.subLicenseList" class="w-full">
          <Column field="sub_license" :header="$t('license.modal_sublicense.table.sub_license')">
            <template #body="{ data }">
              {{ data.sub_license }}
              <span
                class="cursor-pointer ml-2"
                :title="$t('license.modal_sublicense.table.copy')"
                @click="copy(data.sub_license)"
              >
                <i class="pi pi-copy"></i>
              </span>
              <Button
                icon="pi pi-refresh"
                class="p-button-text p-0 ml-2"
                :title="$t('license.modal_sublicense.table.title')"
                @click="changeSubLicenseEventAsync(data)"
              />
            </template>
          </Column>
          <Column field="device_id" :header="$t('license.modal_sublicense.table.login_ver')">
            <template #body="{ data }">
              <span v-if="data.device_id == null">0/1</span>
              <span v-else>1/1 ({{ data.machine_name }})</span>
            </template>
          </Column>
        </DataTable>
      </div>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
  import DOMPurify from 'dompurify';

  definePageMeta({
    layout: 'admin',
    middleware: 'admin',
    path: '/license-management',
  });

  useHead({
    title: 'License Management | User site',
  });

  const {
    getLicensesAsync,
    resetLicenseAsync,
    changeLicenseAsync,
    getProjectAsync,
    createOrderAsync,
    getTransferInfoAsync,
    getSubLicensesAsync,
    createSubLicensesAsync,
    changeSubLicenseAsync,
    deleteAllSubLicenseAsync,
  } = useCustomerService();
  const { t } = useI18n();
  const toast = useToast();

  const licenseObjs = ref<any[]>([]);
  const isShowUpgradeModal = ref(false);
  const isShowSubLicenseModal = ref(false);
  const inLoading = ref(false);

  const subLicenseObj = ref({
    licenseObj: null as any,
    numberSubLicCanCreate: 0,
    subLicenseList: [] as any[],
  });

  const upgradeLicenseObj = ref({
    transferImage: '/assets/img/loading_img.gif',
    bankName: 'MB Bank',
    bankAccountNumber: '',
    bankAccountName: '',
    transferContent: '',
    upDevices: 0,
    licenseObj: null as any,
    projectObj: null as any,
    price: 0,
    upDeviceRules: [] as any[],
    upDeviceMax: 20,
    isCalculating: false,
  });

  onMounted(async () => {
    inLoading.value = true;
    const result = await getLicensesAsync();
    if (result.success === true) {
      licenseObjs.value = result?.data;
    }
    inLoading.value = false;
  });

  function copy(item: string) {
    navigator.clipboard.writeText(item);
    toast.add({ severity: 'success', summary: 'Copy', detail: 'Đã copy vào bộ nhớ', life: 2000 });
  }

  function formatDateStr(dateString: string) {
    return formatDateString(dateString);
  }
  function formatVnPrice(price: number) {
    return formatPrice(price * 1000);
  }

  function changeLicenseAsync_event(item: any) {
    // Use your preferred dialog/confirm here, e.g. PrimeVue ConfirmDialog
    if (confirm(t('license.confirm.change_license.content'))) {
      changeLicenseAsync(item.id).then(result => {
        if (result.success === true) {
          item.license = result.data.license;
          toast.add({
            severity: 'success',
            summary: 'Success',
            detail: t('license.confirm.change_license.success'),
            life: 2000,
          });
        }
      });
    }
  }

  function resetDevicesAsync_event(item: any) {
    if (confirm(t('license.confirm.reset_device.content'))) {
      resetLicenseAsync(item.id).then(result => {
        if (result.success === true) {
          item.active_devices_count = 0;
          toast.add({
            severity: 'success',
            summary: 'Success',
            detail: t('license.confirm.reset_device.success'),
            life: 2000,
          });
        } else {
          toast.add({ severity: 'error', summary: 'Error', detail: result.message, life: 2000 });
        }
      });
    }
  }

  async function showLicenseUpgradeModal(licenseObj: any) {
    upgradeLicenseObj.value.licenseObj = licenseObj;
    const result = await getProjectAsync(upgradeLicenseObj.value.licenseObj.project.id);
    if (result?.success === true) {
      upgradeLicenseObj.value.projectObj = result.data;
      upgradeLicenseObj.value.price = 0;
      upgradeLicenseObj.value.upDevices = 0;

      let canUpgrade = false;

      // Module
      if (upgradeLicenseObj.value?.projectObj?.modules.length > 0) {
        const activeModules = JSON.parse(upgradeLicenseObj.value.licenseObj.active_modules);

        upgradeLicenseObj.value.projectObj.modules.forEach((module: any) => {
          if (activeModules.includes(module.name)) {
            module.disabled = true;
            module.selected = true;
          }
        });

        canUpgrade = true;
      }

      // Up devices
      if (upgradeLicenseObj.value?.projectObj?.meta_data) {
        const tmpObj = JSON.parse(upgradeLicenseObj.value.projectObj.meta_data);

        if (tmpObj.up_device_rules) {
          upgradeLicenseObj.value.upDeviceRules = tmpObj.up_device_rules;
          upgradeLicenseObj.value.upDeviceMax = tmpObj.up_device_max;
          canUpgrade = true;
        }
      }
      if (canUpgrade) isShowUpgradeModal.value = true;
      else
        toast.add({
          severity: 'warn',
          summary: 'Warning',
          detail: t('license.confirm.show_upgrade'),
          life: 2000,
        });
    }
  }

  // Sublicense
  async function showSubLicenseModal(licenseObj: any) {
    subLicenseObj.value.licenseObj = licenseObj;
    subLicenseObj.value.subLicenseList = [];
    isShowSubLicenseModal.value = true;

    const result = await getSubLicensesAsync(subLicenseObj.value.licenseObj.id);
    if (result.success === true) {
      subLicenseObj.value.numberSubLicCanCreate = licenseObj.limit_devices - result.data.length;
      subLicenseObj.value.subLicenseList = result.data;
    }
  }

  async function createSubLicensesEventAsync() {
    if (!confirm(t('license.confirm.create_sub_license'))) return;

    const result = await createSubLicensesAsync(subLicenseObj.value.licenseObj.id);
    if (result.success === true) {
      const regetResult = await getSubLicensesAsync(subLicenseObj.value.licenseObj.id);
      if (regetResult.success === true) {
        subLicenseObj.value.subLicenseList = regetResult.data;
      }
    } else {
      toast.add({ severity: 'error', summary: 'Error', detail: result.data, life: 2000 });
    }
  }

  async function changeSubLicenseEventAsync(subLicenseObj_: any) {
    const result = await changeSubLicenseAsync(subLicenseObj_.id);
    if (result.success === true) {
      subLicenseObj_.sub_license = result.data.sub_license;
    } else {
      toast.add({ severity: 'error', summary: 'Error', detail: result.data, life: 2000 });
    }
  }

  async function deleteSubLinceseAsync(licenseObj: any) {
    if (confirm('Delete all sub-license?')) {
      const result = await deleteAllSubLicenseAsync(licenseObj.id);
      if (result.success === true) {
        toast.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Delete sub-license success',
          life: 2000,
        });
      }
    }
  }

  // Upgrade license
  async function generateQRAsync() {
    if (
      upgradeLicenseObj.value.upDevices + upgradeLicenseObj.value.licenseObj.limit_devices >
      upgradeLicenseObj.value.upDeviceMax
    ) {
      toast.add({
        severity: 'warn',
        summary: 'Warning',
        detail: t('license.confirm.gen_qr', { upDeviceMax_: upgradeLicenseObj.value.upDeviceMax }),
        life: 2000,
      });
      upgradeLicenseObj.value.upDevices = 0;
      upgradeLicenseObj.value.transferImage = '/assets/img/loading_img.gif';
      return;
    }

    upgradeLicenseObj.value.isCalculating = true;
    const selectedModules = upgradeLicenseObj.value.projectObj.modules
      .filter((item: any) => item.selected && !item.disabled)
      .map((item: any) => item.name);

    const orderObj = {
      project_id: upgradeLicenseObj.value.projectObj.id,
      project_module_names: selectedModules,
      modify_license_mode: 'APPEND',
      modify_license_id: upgradeLicenseObj.value.licenseObj.id,
      modify_license_up_devices: upgradeLicenseObj.value.upDevices,
    };

    const result = await createOrderAsync(orderObj);

    if (result.success === true) {
      const transferGetResult = await getTransferInfoAsync(result.data.id);

      if (transferGetResult.success === true) {
        upgradeLicenseObj.value.transferContent = transferGetResult.data.transfer_content;
        upgradeLicenseObj.value.transferImage = transferGetResult.data.qr_image;
        upgradeLicenseObj.value.bankAccountName = transferGetResult.data.account_name;
        upgradeLicenseObj.value.bankAccountNumber = transferGetResult.data.account_number;
        upgradeLicenseObj.value.bankName = transferGetResult.data.bank_name;
        upgradeLicenseObj.value.isCalculating = false;
      }
    }
  }

  const isClient = typeof window !== 'undefined';

  const warringContent = computed(() => {
    if (isClient) {
      return DOMPurify.sanitize(t('license.warring'));
    }
    return t('license.warring');
  });

  const instructionsContent = computed(() => {
    if (isClient) {
      return DOMPurify.sanitize(t('license.instruction'));
    }
    return t('license.instruction');
  });
</script>
