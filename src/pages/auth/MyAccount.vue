<template>
  <Card class="max-w-5xl mx-auto">
    <template #title>
      <div class="flex items-center mb-6">
        <Avatar
          class="mr-4"
          :image="userObj.avatar ? backEndUrl + userObj.avatar : undefined"
          icon="pi pi-user"
          shape="circle"
          size="large"
        />
        <h4 class="mt-2 text-primary font-semibold">{{ $t('my_account.title') }}</h4>
      </div>
    </template>
    <template #content>
      <Form @submit="submitAsync">
        <!-- License info -->
        <div class="space-y-8">
          <div>
            <h5 class="font-bold mb-2">{{ $t('my_account.account_infor.title') }}</h5>
            <hr class="my-2" />
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="email" class="block font-medium mb-1"
                  >Email <span class="text-red-500">*</span></label
                >
                <InputText id="email" v-model="userObj.email" class="w-full" disabled />
              </div>
              <div>
                <label for="display_name" class="block font-medium mb-1">{{
                  $t('my_account.account_infor.display_name')
                }}</label>
                <InputText id="display_name" v-model="userObj.display_name" class="w-full" />
              </div>
              <div>
                <label for="support_fb" class="block font-medium mb-1">{{
                  $t('my_account.account_infor.facebook')
                }}</label>
                <InputText
                  id="support_fb"
                  v-model="supportInfos.facebook"
                  :disabled="!!supportInfos.facebook"
                  class="w-full"
                />
              </div>
              <div>
                <label for="support_tele" class="block font-medium mb-1">{{
                  $t('my_account.account_infor.telegram')
                }}</label>
                <InputText id="support_tele" v-model="supportInfos.telegram" class="w-full" />
              </div>
              <div class="col-span-2 flex items-center mt-2">
                <Checkbox v-model="isChangePassword" input-id="is_change_password" binary />
                <label for="is_change_password" class="ml-2">{{
                  $t('my_account.account_infor.is_change_password')
                }}</label>
              </div>
              <div>
                <label for="password" class="block font-medium mb-1">{{
                  $t('my_account.account_infor.password')
                }}</label>
                <Password
                  id="password"
                  v-model="userObj.password"
                  input-class="w-full"
                  class="w-full"
                  :disabled="!isChangePassword"
                  toggle-mask
                />
              </div>
              <div>
                <label for="re-password" class="block font-medium mb-1">{{
                  $t('my_account.account_infor.repassword')
                }}</label>
                <Password
                  id="re-password"
                  v-model="userObj.repassword"
                  input-class="w-full"
                  class="w-full"
                  :disabled="!isChangePassword"
                  toggle-mask
                />
              </div>
              <div class="col-span-2">
                <label for="phoneNum" class="block font-medium mb-1">{{
                  $t('my_account.account_infor.phone_number')
                }}</label>
                <InputText id="phoneNum" v-model="userObj.phone_number" class="w-full" />
              </div>
              <div v-if="liveInVietnam">
                <label for="province" class="block font-medium mb-1"
                  >{{ $t('my_account.account_infor.province.label')
                  }}<span class="text-red-500">*</span></label
                >
                <Dropdown
                  v-model="userObj.province"
                  :options="provinceListMap"
                  option-label="name"
                  option-value="value"
                  :placeholder="$t('my_account.account_infor.province.placeholder')"
                  filter
                  class="w-full"
                  @change="provinceChanged"
                />
              </div>
              <div v-if="liveInVietnam">
                <label for="district" class="block font-medium mb-1"
                  >{{ $t('my_account.account_infor.district.label')
                  }}<span class="text-red-500">*</span></label
                >
                <Dropdown
                  v-model="userObj.district"
                  :options="districtListMap"
                  option-label="name"
                  option-value="value"
                  :placeholder="$t('my_account.account_infor.district.placeholder')"
                  filter
                  class="w-full"
                  @change="districtChanged"
                />
              </div>
              <div v-if="liveInVietnam">
                <label for="ward" class="block font-medium mb-1"
                  >{{ $t('my_account.account_infor.ward.label')
                  }}<span class="text-red-500">*</span></label
                >
                <Dropdown
                  v-model="userObj.ward"
                  :options="wardListMap"
                  option-label="name"
                  option-value="value"
                  :placeholder="$t('my_account.account_infor.ward.placeholder')"
                  filter
                  class="w-full"
                />
              </div>
              <div class="col-span-2">
                <label for="address" class="block font-medium mb-1"
                  >{{ $t('my_account.account_infor.address') }}
                  <span class="text-red-500">*</span></label
                >
                <InputText id="address" v-model="userObj.addressText" class="w-full" required />
              </div>
              <div class="col-span-2">
                <label for="tax" class="block font-medium mb-1">{{
                  $t('my_account.account_infor.tax_code')
                }}</label>
                <InputText id="tax" v-model="userObj.tax_code" class="w-full" />
              </div>
            </div>
          </div>

          <div v-if="liveInVietnam">
            <h5 class="font-bold mb-2">{{ $t('my_account.affiliate_infor.title') }}</h5>
            <hr class="my-2" />
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label for="aff_code" class="block font-medium mb-1">{{
                  $t('my_account.affiliate_infor.aff_code')
                }}</label>
                <InputText id="aff_code" v-model="userObj.affiliate_code" class="w-full" disabled />
              </div>
              <div>
                <label for="aff_point" class="block font-medium mb-1">{{
                  $t('my_account.affiliate_infor.aff_point')
                }}</label>
                <InputText
                  id="aff_point"
                  v-model="userObj.affiliate_point"
                  class="w-full"
                  disabled
                />
              </div>
              <div>
                <label for="payment_bank_id" class="block font-medium mb-1">{{
                  $t('my_account.affiliate_infor.payment_bank_id')
                }}</label>
                <InputText id="payment_bank_id" v-model="userObj.payment_bank_id" class="w-full" />
              </div>
              <div>
                <label for="payment_bank_user_name" class="block font-medium mb-1">{{
                  $t('my_account.affiliate_infor.payment_bank_user_name')
                }}</label>
                <InputText
                  id="payment_bank_user_name"
                  v-model="userObj.payment_bank_user_name"
                  class="w-full"
                />
              </div>
              <div>
                <label for="payment_bank_name" class="block font-medium mb-1">{{
                  $t('my_account.affiliate_infor.bank_name')
                }}</label>
                <Dropdown
                  v-model="userObj.payment_bank_name"
                  :options="bankOptions"
                  option-label="name"
                  option-value="value"
                  :placeholder="$t('my_account.affiliate_infor.bank_name_placeholder')"
                  filter
                  show-clear
                  class="w-full"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-end gap-4 items-center mt-6">
          <Button type="submit" label="Update" :loading="onSubmiting" />
          <RouterLink to="/dashboard">
            <Button label="Cancel" severity="danger" />
          </RouterLink>
        </div>
      </Form>
    </template>
  </Card>
</template>

<script setup lang="ts">
  definePageMeta({
    layout: 'admin',
    path: '/my-account',
  });

  const { getCurrentUserAsync, updateCurrentUserAsync } = useAuthService();
  const { getAddressDataAsync } = useAddressProvider();

  const { t, locale } = useI18n();
  const toast = useToast();

  const userObj = ref<any>({
    province: null,
    district: null,
    ward: null,
    addressText: null,
    password: '',
    repassword: '',
  });
  const supportInfos = ref<any>({
    facebook: '',
    telegram: '',
  });
  const isChangePassword = ref(false);
  const backEndUrl = import.meta.env.VITE_APP_BACKEND_URL || '';
  const onSubmiting = ref(false);
  const addressData = ref<any>({});
  const provinceList = ref<string[]>([]);
  const districtList = ref<string[]>([]);
  const wardList = ref<string[]>([]);
  const liveInVietnam = computed(() => locale.value === 'vi');
  const bankOptions = [
    { name: 'ACB', value: 'ACB' },
    { name: 'MBBANK', value: 'MBBANK' },
    { name: 'Vietcombank', value: 'Vietcombank' },
    { name: 'Agribank', value: 'Agribank' },
    { name: 'Sacombank', value: 'Sacombank' },
    { name: 'VPBank', value: 'VPBank' },
    { name: 'Techcombank', value: 'Techcombank' },
    { name: 'VIB Bank', value: 'VIBBank' },
    { name: 'BIDV', value: 'BIDV' },
    { name: 'TP Bank', value: 'TP Bank' },
    { name: 'VietinBank', value: 'VietinBank' },
    { name: 'OCB Bank', value: 'OCB Bank' },
    { name: 'Lienvietpost Bank', value: 'Lienvietpost Bank' },
    { name: 'Oceanbank', value: 'Oceanbank' },
  ];

  onMounted(async () => {
    document.title = 'My account';
    addressData.value = await getAddressDataAsync();

    const result = await getCurrentUserAsync();
    if (result.success === true) {
      userObj.value = { ...result.data, password: '', repassword: '' };
      if (!userObj.value.support_info) userObj.value.support_info = '{}';
      supportInfos.value = JSON.parse(userObj.value.support_info);
    }

    provinceList.value = Object.keys(addressData.value).sort((a, b) => a.localeCompare(b));

    // Fill address from raw data
    if (userObj.value.address && userObj.value.address.length > 0) {
      const addressParts = userObj.value.address.split(',');
      if (addressParts.length === 4) {
        userObj.value.addressText = addressParts[0].trim();
        userObj.value.province = addressParts[3].trim();
        provinceChanged();
        userObj.value.district = addressParts[2].trim();
        districtChanged();
        userObj.value.ward = addressParts[1].trim();
      } else {
        userObj.value.addressText = userObj.value.address;
      }
    }
  });

  const provinceListMap = computed(() =>
    provinceList.value.map(item => ({ name: item, value: item }))
  );
  const districtListMap = computed(() =>
    districtList.value.map(item => ({ name: item, value: item }))
  );
  const wardListMap = computed(() => wardList.value.map(item => ({ name: item, value: item })));

  function provinceChanged() {
    wardList.value = [];
    if (addressData.value[userObj.value.province]) {
      districtList.value = Object.keys(addressData.value[userObj.value.province]).sort((a, b) =>
        a.localeCompare(b)
      );
    } else {
      districtList.value = [];
    }
    userObj.value.district = null;
    userObj.value.ward = null;
  }

  function districtChanged() {
    if (addressData.value[userObj.value?.province]?.[userObj.value?.district]) {
      wardList.value = addressData.value[userObj.value.province][userObj.value.district].sort(
        (a: string, b: string) => a.localeCompare(b)
      );
    } else {
      wardList.value = [];
    }
    userObj.value.ward = null;
  }

  async function submitAsync() {
    if (
      userObj.value.password &&
      userObj.value.password.length > 0 &&
      userObj.value.password.length < 6
    ) {
      toast.add({ severity: 'error', summary: t('my_account.noti.pass_required') });
      return;
    }
    if (userObj.value.password && userObj.value.password !== userObj.value.repassword) {
      toast.add({ severity: 'error', summary: t('my_account.noti.pass_wrong') });
      return;
    }
    if (liveInVietnam.value) {
      if (!userObj.value.province) {
        toast.add({ severity: 'error', summary: t('my_account.noti.province_required') });
        return;
      }
      if (!userObj.value.district) {
        toast.add({ severity: 'error', summary: t('my_account.noti.district_required') });
        return;
      }
      if (!userObj.value.ward) {
        toast.add({ severity: 'error', summary: t('my_account.noti.ward_required') });
        return;
      }
    }
    onSubmiting.value = true;
    userObj.value.support_info = JSON.stringify(supportInfos.value);

    if (!liveInVietnam.value) {
      userObj.value.address = userObj.value.addressText;
    } else {
      userObj.value.address =
        userObj.value.addressText.replace(',', '') +
        ', ' +
        userObj.value.ward +
        ', ' +
        userObj.value.district +
        ', ' +
        userObj.value.province;
    }

    const result = await updateCurrentUserAsync(userObj.value);

    if (result.success === true) {
      toast.add({ severity: 'success', summary: t('my_account.noti.success') });
    } else {
      toast.add({ severity: 'error', summary: result.message });
    }
    onSubmiting.value = false;
  }
</script>
