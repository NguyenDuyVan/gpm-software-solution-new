<template>
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Left Column -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Affiliate Status -->
        <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div class="h-2 bg-gradient-to-r from-emerald-400 to-emerald-600" />
          <div class="p-6">
            <div class="flex items-start justify-between mb-4">
              <div>
                <div class="flex items-center">
                  <h3 class="text-lg font-medium text-slate-900 mr-2">Affiliate Status</h3>
                  <Tag
                    :value="currentTier.name"
                    :severity="
                      currentTierIndex === 0
                        ? 'secondary'
                        : currentTierIndex === 1
                          ? 'success'
                          : currentTierIndex === 2
                            ? 'warning'
                            : 'info'
                    "
                    class="ml-2"
                  />
                </div>
                <p class="mt-1 text-sm text-slate-500">
                  Your current affiliate points:
                  <span class="font-medium text-slate-700">{{
                    currentPoints.toLocaleString()
                  }}</span>
                </p>
              </div>
              <div class="bg-amber-100 p-2 rounded-full">
                <i class="h-5 w-5 text-amber-600 pi pi-trophy" />
              </div>
            </div>
          </div>
        </div>

        <!-- Referral Section -->
        <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div class="px-6 py-4 border-b border-slate-200">
            <div class="flex items-center">
              <i class="pi pi-link h-5 w-5 text-emerald-600 mr-2" />
              <h3 class="text-lg font-medium text-slate-900">Your Referral Links</h3>
            </div>
          </div>
          <div class="p-6 space-y-4">
            <p class="text-sm text-slate-600 mb-4">
              Share these links with potential customers. You'll earn commission points for every
              successful referral.
            </p>

            <div v-for="field in referralFields" :key="field.label" class="mb-4">
              <label class="block text-sm font-medium text-slate-700 mb-1">{{ field.label }}</label>
              <div class="relative flex">
                <InputText
                  :value="field.value"
                  readonly
                  :class="`w-full pr-10 ${field.type === 'code' ? 'font-mono text-sm' : ''}`"
                />
                <Button
                  icon="pi pi-copy"
                  class="absolute right-0 inset-y-0 px-3 flex items-center justify-center"
                  :severity="copied[field.label] ? 'success' : 'secondary'"
                  rounded
                  text
                  @click="copyToClipboard(field.value, field.label)"
                />
              </div>
            </div>

            <div class="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
              <p class="font-medium">Pro Tip</p>
              <p class="mt-1">
                Add your referral link to your social media profiles, email signature, or website to
                maximize your earnings.
              </p>
            </div>
          </div>
        </div>

        <!-- Affiliate History -->
        <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div class="px-6 py-4 border-b border-slate-200">
            <div class="flex justify-between items-center">
              <h3 class="text-lg font-medium text-slate-900">Affiliate History</h3>
              <Tag value="Active" severity="success" />
            </div>
          </div>
          <DataTable :value="historyData" class="w-full" data-key="id" striped-rows>
            <Column field="date" header="Date & Time">
              <template #body="slotProps">
                {{ formatDate(slotProps.data.date) }}
              </template>
            </Column>
            <Column field="customer" header="Customer" />
            <Column field="software" header="Product" />
            <Column field="points" header="Points">
              <template #body="slotProps">
                <span class="font-medium text-emerald-600">+{{ slotProps.data.points }}</span>
              </template>
            </Column>
            <Column field="status" header="Status">
              <template #body="slotProps">
                <Tag
                  :value="slotProps.data.status === 'completed' ? 'Completed' : 'Pending'"
                  :severity="slotProps.data.status === 'completed' ? 'success' : 'warning'"
                />
              </template>
            </Column>
          </DataTable>
        </div>
      </div>

      <!-- Right Column -->
      <div class="lg:col-span-1 space-y-6">
        <!-- Withdrawal Section -->
        <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div class="px-6 py-4 border-b border-slate-200">
            <div class="flex justify-between items-center">
              <h3 class="text-lg font-medium text-slate-900">Withdrawal</h3>
              <Button
                :label="showHistory ? 'Hide History' : 'Show History'"
                icon="pi pi-history"
                text
                class="px-3 py-1.5 text-sm"
                @click="showHistory = !showHistory"
              />
            </div>
          </div>
          <div class="p-6">
            <div class="bg-slate-50 rounded-lg p-4 mb-4">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm text-slate-500">Available for withdrawal</p>
                  <p class="text-2xl font-semibold text-slate-900">
                    {{ formatCurrency(availableAmount) }}
                  </p>
                </div>
                <div class="p-3 bg-emerald-100 rounded-full">
                  <i class="pi pi-wallet h-6 w-6 text-emerald-600" />
                </div>
              </div>
              <p v-if="!canWithdraw" class="mt-2 text-xs text-amber-600">
                Minimum withdrawal amount is {{ formatCurrency(minimumWithdrawal) }}
              </p>
            </div>

            <Button
              :disabled="!canWithdraw"
              label="Withdraw Funds"
              icon="pi pi-arrow-right"
              class="w-full py-2.5 px-4 font-medium flex items-center justify-center"
              :severity="canWithdraw ? 'success' : 'secondary'"
            />

            <div v-if="showHistory" class="mt-6">
              <h4 class="text-sm font-medium text-slate-700 mb-3">Withdrawal History</h4>
              <div v-if="withdrawalHistory.length" class="space-y-3">
                <div
                  v-for="item in withdrawalHistory"
                  :key="item.id"
                  class="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg"
                >
                  <div>
                    <p class="text-sm font-medium text-slate-800">
                      {{ formatCurrency(item.amount) }}
                    </p>
                    <p class="text-xs text-slate-500">{{ formatDate(item.date) }}</p>
                  </div>
                  <Tag
                    :value="item.status === 'completed' ? 'Completed' : 'Processing'"
                    :severity="item.status === 'completed' ? 'success' : 'warning'"
                  />
                </div>
              </div>
              <p v-else class="text-sm text-slate-500 text-center py-4">
                No withdrawal history yet
              </p>
            </div>
          </div>
        </div>

        <!-- Tips Section -->
        <div
          class="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-xl p-6 text-white shadow-sm"
        >
          <h3 class="text-lg font-medium mb-2">Boost Your Earnings</h3>
          <p class="text-emerald-100 mb-4">
            Learn how to maximize your affiliate income with these proven strategies.
          </p>
          <ul class="space-y-2 mb-4">
            <li v-for="(tip, index) in earningTips" :key="index" class="flex items-start">
              <span class="inline-block h-5 w-5 rounded-full bg-white/20 flex-shrink-0 mr-2" />
              <span class="text-sm">{{ tip }}</span>
            </li>
          </ul>
          <a
            href="#"
            class="inline-block w-full py-2 px-4 bg-white text-emerald-700 rounded-lg text-sm font-medium text-center transition-colors hover:bg-emerald-50"
          >
            View Affiliate Guide
          </a>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
  definePageMeta({
    layout: 'admin',
  });

  const toast = useToast();

  // Stats data
  const stats = [
    {
      title: 'Total Referrals',
      value: '42',
      icon: 'pi-user pi',
      trend: { value: 12, positive: true },
    },
    {
      title: 'Earnings',
      value: '$520.80',
      icon: 'pi-dollar pi',
      trend: { value: 8, positive: true },
    },
    {
      title: 'Conversion Rate',
      value: '3.2%',
      icon: 'pi-chart-line pi',
      trend: { value: 1.5, positive: false },
    },
    {
      title: 'Affiliate Points',
      value: '1,240',
      icon: 'pi-trophy pi',
      trend: { value: 5, positive: true },
    },
  ];

  const tiers = [
    { name: 'Bronze', min: 0, max: 500 },
    { name: 'Silver', min: 500, max: 2000 },
    { name: 'Gold', min: 2000, max: 5000 },
    { name: 'Platinum', min: 5000, max: 10000 },
  ];

  const currentPoints = 1240;
  const currentTierIndex = computed(() =>
    tiers.findIndex(
      (tier, index) =>
        currentPoints >= tier.min && (currentPoints < tier.max || index === tiers.length - 1)
    )
  );

  const currentTier = computed(() => tiers[currentTierIndex.value]);
  const nextTier = computed(() =>
    currentTierIndex.value < tiers.length - 1 ? tiers[currentTierIndex.value + 1] : null
  );

  const progressToNextTier = computed(() =>
    nextTier.value
      ? Math.min(
          100,
          ((currentPoints - currentTier.value.min) / (nextTier.value.min - currentTier.value.min)) *
            100
        )
      : 100
  );

  const pointsToNextTier = computed(() =>
    nextTier.value ? nextTier.value.min - currentPoints : 0
  );

  const referralCode = 'KYDQRIX37K';
  const referralLink = 'https://gpmloginapp.com?ref=KYDQRIX37K';

  const referralFields = [
    { label: 'Referral Code', value: referralCode, type: 'code' },
    { label: 'Referral Link', value: referralLink, type: 'link' },
  ];

  const copied = ref<Record<string, boolean>>({});

  const copyToClipboard = async (value: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value);
      copied.value[label] = true;
      toast.add({
        severity: 'success',
        summary: 'Copied!',
        detail: `${label} copied to clipboard`,
        life: 1500,
      });
      setTimeout(() => {
        copied.value[label] = false;
      }, 2000);
    } catch (error) {
      toast.add({
        severity: 'error',
        summary: 'Copy failed',
        detail: 'Failed to copy text',
        life: 2000,
      });
    }
  };

  const historyData = [
    {
      id: 1,
      date: '2025-04-10T10:30:00',
      customer: 'John Smith',
      software: 'Premium Plan',
      points: 120,
      status: 'completed',
    },
    {
      id: 2,
      date: '2025-04-08T14:45:00',
      customer: 'Emma Johnson',
      software: 'Basic Plan',
      points: 50,
      status: 'completed',
    },
    {
      id: 3,
      date: '2025-04-05T09:15:00',
      customer: 'Michael Brown',
      software: 'Enterprise Plan',
      points: 250,
      status: 'completed',
    },
    {
      id: 4,
      date: '2025-04-02T16:20:00',
      customer: 'Sophia Garcia',
      software: 'Premium Plan',
      points: 120,
      status: 'completed',
    },
  ];

  const showHistory = ref(false);
  const availableAmount = 320.5;
  const minimumWithdrawal = 50;
  const canWithdraw = computed(() => availableAmount >= minimumWithdrawal);

  const withdrawalHistory = [
    {
      id: 1,
      date: '2025-04-01T14:30:00',
      amount: 150,
      status: 'completed',
    },
    {
      id: 2,
      date: '2025-03-15T09:45:00',
      amount: 200,
      status: 'completed',
    },
  ];

  const earningTips = [
    'Share on social media',
    'Create tutorial content',
    'Engage with potential customers',
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };
</script>
