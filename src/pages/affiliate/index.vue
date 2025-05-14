<template>
  <div class="max-w-7xl mx-auto">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Left Column -->
      <div class="lg:col-span-2 space-y-6">
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
          <div class="h-2 bg-gradient-to-r from-emerald-400 to-emerald-600" />
          <div class="p-6">
            <div class="flex items-start justify-between mb-4">
              <div>
                <div class="flex items-center gap-2">
                  <h3 class="text-lg font-medium mr-2">
                    {{ $t('affiliate_page.account_status_title') }}
                  </h3>
                  <Tag
                    :value="
                      dashboardObj.user.affiliate_verified === 1
                        ? $t('affiliate_page.account_status.verified')
                        : $t('affiliate_page.account_status.unverified')
                    "
                    :severity="dashboardObj.user.affiliate_verified === 1 ? 'success' : 'danger'"
                  />
                </div>
                <p class="mt-1">
                  {{ $t('affiliate_page.aff_point') }}
                  <span class="font-medium">{{
                    dashboardObj.user.affiliate_point.toLocaleString()
                  }}</span>
                </p>
                <small
                  v-if="dashboardObj.user.affiliate_verified == 0"
                  class="text-sm italic"
                  v-html="$t('affiliate_page.desc')"
                ></small>
              </div>
              <div class="bg-amber-100 h-10 w-10 flex justify-center items-center p-5 rounded-full">
                <i class="text-amber-600 pi pi-trophy" />
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
          <div class="px-6 py-4 border-b border-slate-200">
            <div class="flex items-center">
              <i class="pi pi-link h-5 w-5 text-emerald-600 mr-2" />
              <h3 class="text-lg font-medium">{{ $t('affiliate_page.referral_links_title') }}</h3>
            </div>
          </div>
          <div class="p-6 space-y-4">
            <p class="text-sm mb-4">
              {{ $t('affiliate_page.referral_links_desc') }}
            </p>

            <div class="mb-4">
              <label class="block text-sm font-medium mb-1">{{
                $t('affiliate_page.aff_code')
              }}</label>
              <div class="relative flex">
                <InputText
                  :value="dashboardObj.user.affiliate_code"
                  readonly
                  :class="`w-full pr-10 font-mono text-sm`"
                />
                <Button
                  icon="pi pi-copy"
                  class="absolute right-0 inset-y-0 px-3 flex items-center justify-center"
                  :severity="'success'"
                  rounded
                  text
                  @click="() => copyAffCode()"
                />
              </div>
            </div>

            <div class="mb-4">
              <label class="block text-sm font-medium mb-1">{{
                $t('affiliate_page.aff_link')
              }}</label>
              <div class="relative flex">
                <InputText
                  :value="`${WEBSITE_URL}?ref=${dashboardObj.user.affiliate_code}`"
                  readonly
                  :class="`w-full pr-10 font-mono text-sm`"
                />
                <Button
                  icon="pi pi-copy"
                  class="absolute right-0 inset-y-0 px-3 flex items-center justify-center"
                  :severity="'success'"
                  rounded
                  text
                  @click="() => copyAffCode(WEBSITE_URL)"
                />
              </div>
            </div>

            <Message severity="info" closable>
              <p class="font-medium">{{ $t('affiliate_page.pro_tip') }}</p>
              <p class="mt-1 text-sm italic">
                {{ $t('affiliate_page.pro_tip_desc') }}
              </p>
            </Message>
          </div>
        </div>

        <div>
          <!-- Affiliate History -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
            <div class="px-6 py-4 border-b border-slate-200">
              <h3 class="text-lg font-medium">
                {{ $t('affiliate_page.aff_history') }}
              </h3>
            </div>
            <DataTable :value="dashboardObj.aff_data.data" class="mb-4" responsive-layout="scroll">
              <template #empty>
                <div class="text-center">{{ $t('common.no_data') }}</div>
              </template>

              <Column
                field="created_at"
                :header="$t('affiliate_page.table.time')"
                :body="dateBodyTemplate"
              />
              <Column field="customer.display_name" :header="$t('affiliate_page.table.customer')" />
              <Column field="project.name" :header="$t('affiliate_page.table.software')" />
              <Column field="affiliate_point" :header="$t('affiliate_page.table.aff_point')" />
            </DataTable>
          </div>
        </div>

        <div v-if="dashboardObj.aff_data.data.length > 0" class="text-center">
          <Button
            class="rounded-full px-4 py-2 bg-blue-100 text-blue-600 hover:bg-blue-200"
            :label="$t('common.load_more')"
            :loading="loadingMore"
            @click="loadMorePageAsync"
          />
        </div>
      </div>

      <!-- Right Column -->
      <div class="lg:col-span-1 space-y-6">
        <!-- Withdrawal Section -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
          <div class="px-6 py-4 border-b border-slate-200">
            <div class="flex justify-between items-center">
              <h3 class="text-lg font-medium">
                {{ $t('affiliate_page.withdraw') }}
              </h3>
            </div>
          </div>
          <div class="p-6">
            <div
              class="bg-gray-50 border border-gray-200 dark:border-gray-500 dark:bg-gray-800 rounded-lg p-4 mb-4"
            >
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm">{{ $t('affiliate_page.available_withdraw') }}</p>
                  <p class="text-2xl font-semibold text-green-600">
                    {{ dashboardObj.user.affiliate_point }}
                  </p>
                </div>
                <div
                  class="p-3 h-12 w-12 flex justify-center items-center bg-emerald-100 rounded-full"
                >
                  <i class="pi pi-wallet text-emerald-600" />
                </div>
              </div>
              <p class="mt-2 text-xs text-amber-600">{{ $t('affiliate_withdraw.desc') }}</p>
            </div>

            <Button
              :label="$t('affiliate_page.withdraw')"
              icon="pi pi-arrow-right"
              class="w-full py-2.5 px-4 font-medium flex items-center justify-center"
              :severity="dashboardObj.user.affiliate_point >= 500 ? 'help' : 'secondary'"
              @click="() => $router.push('/affiliate-withdraw')"
            />
          </div>
        </div>

        <!-- Tips Section -->
        <div
          class="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-xl p-6 text-white shadow-md"
        >
          <h3 class="text-lg font-medium mb-2">{{ $t('affiliate_page.boost_earnings') }}</h3>
          <p class="text-emerald-100 mb-4">
            {{ $t('affiliate_page.boost_earnings_desc') }}
          </p>
          <ul class="space-y-2 mb-4">
            <li class="flex items-start">
              <span
                class="inline-block h-5 w-5 rounded-full bg-white dark:bg-gray-800/20 flex-shrink-0 mr-2"
              />
              <span class="text-sm">{{ $t('affiliate_page.tip_share_social') }}</span>
            </li>
            <li class="flex items-start">
              <span
                class="inline-block h-5 w-5 rounded-full bg-white dark:bg-gray-800/20 flex-shrink-0 mr-2"
              />
              <span class="text-sm">{{ $t('affiliate_page.tip_create_tutorial') }}</span>
            </li>
            <li class="flex items-start">
              <span
                class="inline-block h-5 w-5 rounded-full bg-white dark:bg-gray-800/20 flex-shrink-0 mr-2"
              />
              <span class="text-sm">{{ $t('affiliate_page.tip_engage_customers') }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { WEBSITE_URL } from '@/constants';

  definePageMeta({
    layout: 'admin',
    middleware: 'admin',
  });

  const { t, locale } = useI18n();
  const toast = useToast();
  const { getDashboardData } = useCustomerService();
  const router = useRouter();

  type AffiliateData = {
    created_at: string;
    customer: { display_name: string };
    project: { name: string };
    affiliate_point: number;
    // Add other fields if necessary
  };

  watch(
    locale,
    value => {
      if (value === 'en') {
        router.push('/');
      }
    },
    { immediate: true }
  );

  const dashboardObj = reactive<{
    user: {
      affiliate_point: number;
      affiliate_verified: number;
      affiliate_code: string;
    };
    aff_data: {
      data: AffiliateData[];
    };
  }>({
    user: {
      affiliate_point: 0,
      affiliate_verified: 0,
      affiliate_code: '',
    },
    aff_data: {
      data: [],
    },
  });

  const affPage = ref(1);
  const loadingMore = ref(false);

  const loadDashboard = async () => {
    const result = await getDashboardData(affPage.value);
    if (result.success === true) {
      Object.assign(dashboardObj, result.data);
    }
  };

  onMounted(() => {
    document.title = 'Affiliate | User site';
    loadDashboard();
  });

  const loadMorePageAsync = async () => {
    loadingMore.value = true;
    affPage.value++;
    const result = await getDashboardData(affPage.value);
    loadingMore.value = false;
    if (result.success === true) {
      dashboardObj.aff_data.data.push(...(result?.data?.aff_data?.data || []));
    }
  };

  const copyAffCode = (websiteUrl?: string) => {
    let clipboardText = dashboardObj.user.affiliate_code;
    if (websiteUrl) {
      clipboardText = `${websiteUrl}?ref=${dashboardObj.user.affiliate_code}`;
    }
    navigator.clipboard.writeText(clipboardText);
    toast.add({ severity: 'success', summary: t('affiliate_page.noti.coppied'), life: 2000 });
  };

  const dateBodyTemplate = (row: any) => formatDateTimeString(row.created_at);
</script>
