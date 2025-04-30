<template>
  <div class="space-y-4 bg-white dark:bg-gray-800 shadow-md rounded-xl p-4">
    <div class="center-box--without-bg dark:text-primary">
      <h3>{{ $t('dashboard_page.title') }}</h3>
    </div>

    <div class="center-box--without-bg">
      <div class="card">
        <!-- Desktop view using PrimeVue DataTable -->
        <DataTable :value="[dashboardObj.user]" class="p-datatable-sm table-pc">
          <Column
            field="licenses_count"
            :header="$t('dashboard_page.table.license_purchased')"
          ></Column>
          <Column :header="$t('dashboard_page.table.create_at')">
            <template #body="{ data }">
              {{ formatDateStr(data.created_at) }}
            </template>
          </Column>
          <Column :header="$t('dashboard_page.table.information')">
            <template #body="{ data }">
              {{ formatDateTimeStr(data.last_login_at) }}
              <span v-if="data.last_login_ip">/{{ data.last_login_ip }}</span>
            </template>
          </Column>
          <Column :header="$t('dashboard_page.table.type_account')">
            <template #body="{ data }">
              <Badge v-if="data.licenses_count >= 10" value="VIP" severity="danger" />
              <Badge v-else-if="data.licenses_count >= 1" value="Normal" severity="warning" />
              <Badge v-else value="Newbie" severity="success" />
            </template>
          </Column>
        </DataTable>

        <!-- Mobile view using PrimeVue Card -->
        <Card class="table-mobile p-0">
          <template #content>
            <div class="p-grid p-fluid">
              <div class="p-col-12">
                <div class="p-field">
                  <label class="tb-header"
                    >{{ $t('dashboard_page.table.license_purchased') }}:</label
                  >
                  <div>{{ dashboardObj.user.licenses_count }}</div>
                </div>
              </div>
              <div class="p-col-12">
                <div class="p-field">
                  <label class="tb-header">{{ $t('dashboard_page.table.create_at') }}:</label>
                  <div>{{ formatDateStr(dashboardObj.user.created_at) }}</div>
                </div>
              </div>
              <div class="p-col-12">
                <div class="p-field">
                  <label class="tb-header">{{ $t('dashboard_page.table.information') }}:</label>
                  <div>
                    {{ formatDateTimeStr(dashboardObj.user.last_login_at) }}
                    <span v-if="dashboardObj.user.last_login_ip"
                      >/{{ dashboardObj.user.last_login_ip }}</span
                    >
                  </div>
                </div>
              </div>
              <div class="p-col-12">
                <div class="p-field">
                  <label class="tb-header">{{ $t('dashboard_page.table.type_account') }}:</label>
                  <div>
                    <Badge
                      v-if="dashboardObj.user.licenses_count >= 10"
                      value="VIP"
                      severity="danger"
                    />
                    <Badge
                      v-else-if="dashboardObj.user.licenses_count >= 1"
                      value="Normal"
                      severity="warning"
                    />
                    <Badge v-else value="Newbie" severity="success" />
                  </div>
                </div>
              </div>
            </div>
          </template>
        </Card>

        <div class="social-containter mt-3">
          <Button
            icon="pi pi-facebook"
            class="p-button-rounded p-button-text social social-fb"
            @click="openUrl('https://facebook.com/giaiphapmmodotnet')"
          />
          <Button
            icon="pi pi-youtube"
            class="p-button-rounded p-button-text social social-ytb"
            @click="openUrl('https://www.youtube.com/@giaiphapmmodotnet/playlists')"
          />
          <Button
            icon="pi pi-globe"
            class="p-button-rounded p-button-text social social-web"
            @click="openUrl('https://giaiphapmmo.vn/')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  definePageMeta({
    layout: 'admin',
  });

  const { t } = useI18n();
  const { getDashboardData } = useCustomerService();

  interface User {
    licenses_count: number;
    created_at: string;
    last_login_at: string;
    last_login_ip?: string;
    affiliate_code?: string;
  }

  interface DashboardData {
    user: User;
    aff_data: any[];
  }

  // const toast = useToast();
  const dashboardObj = ref<DashboardData>({
    user: {} as User,
    aff_data: [],
  });

  onMounted(async () => {
    const result = await getDashboardData(1);
    if (result.success === true) {
      dashboardObj.value = result.data;
    }
  });

  onUpdated(() => {
    document.title = t('dashboard_page.document_title');
  });

  // const copyAffCode = () => {
  //   if (dashboardObj.value.user.affiliate_code) {
  //     navigator.clipboard.writeText(dashboardObj.value.user.affiliate_code);
  //     toast.add({ severity: 'success', summary: t('affiliate_page.noti.coppied'), life: 3000 });
  //   }
  // };

  const formatDateStr = (dateStr?: string): string => {
    return dateStr ? formatDateString(dateStr) : '';
  };

  const formatDateTimeStr = (dateStr?: string): string => {
    return dateStr ? formatDateTimeString(dateStr) : '';
  };

  const openUrl = (url: string): void => {
    window.open(url, '_blank');
  };
</script>

<style scoped>
  .dashboard-container {
    margin-top: 20px;
    margin-bottom: 25px;
  }

  .p-field {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    padding: 0.5rem;
    border-bottom: 1px solid #f1f1f1;
  }

  .social-containter {
    padding-left: 5px;
    display: flex;
    gap: 0.5rem;
  }

  .social {
    font-size: 1.2rem;
  }

  .social-fb {
    color: #4267b2;
  }

  .social-ytb {
    color: #ff0000;
  }

  .social-web {
    color: #2c3e50;
  }

  .tb-header {
    font-weight: bold;
  }

  .table-pc {
    display: block;
  }

  .table-mobile {
    display: none;
  }

  @media (max-width: 960px) {
    .table-pc {
      display: none;
    }

    .table-mobile {
      display: block;
    }
  }
</style>
