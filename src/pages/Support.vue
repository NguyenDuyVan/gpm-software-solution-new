<template>
  <Card class="max-w-5xl w-full mx-auto shadow-lg">
    <template #title>
      <h5 class="text-xl font-semibold">
        {{ t('support_page.title') }}
      </h5>
    </template>
    <template #content>
      <div class="my-6 space-y-4 text-yellow-600">
        <div class="flex items-center">
          <i class="pi pi-exclamation-circle text-yellow-600 mr-4"></i>
          <span>{{ t('support_page.content_first') }}</span>
        </div>
        <div class="flex items-center">
          <i class="pi pi-exclamation-circle text-yellow-600 mr-4"></i>
          <span>{{ t('support_page.content_second') }}</span>
        </div>
      </div>
    </template>
    <template #footer>
      <Button
        :label="t('support_page.contact')"
        class="mt-8"
        icon="pi pi-facebook"
        severity="secondary"
        rounded
        @click="openMessenger"
      >
      </Button>
    </template>
  </Card>
</template>

<script setup lang="ts">
  import { FANPAGE_URL } from '@/constants';

  definePageMeta({
    layout: 'admin',
    middleware: undefined,
  });

  const { t } = useI18n();

  useHead({
    title: t('support_page.document_title'),
    meta: [
      {
        name: 'description',
        content: t('support_page.document_description'),
      },
    ],
  });

  function openMessenger() {
    window.open(FANPAGE_URL, '_blank');
  }
</script>

<style scoped>
  .support-container {
    max-width: 1000px;
    background: #d7ebff;
    color: #0080c0;
  }

  .support-container p {
    line-height: 25px;
  }
</style>
