<template>
  <div>asdfsdf</div>
</template>
<script setup lang="ts">
  definePageMeta({
    layout: 'admin',
    middleware: undefined,
    path: '/license-management',
  });

  const { t } = useI18n();

  useHead({
    title: t('license_management_page.document_title'),
    meta: [
      {
        name: 'description',
        content: t('license_management_page.document_description'),
      },
    ],
  });
</script>
<style lang=""></style>
