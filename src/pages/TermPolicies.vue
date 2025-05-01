<template>
  <Card>
    <template #title>
      <div class="flex justify-between items-center">
        <h4 class="text-primary mb-2">{{ $t('menu_items.term_policies') }}</h4>
      </div>
    </template>
    <template #content>
      <div>
        <div class="space-y-4" v-html="$t('buy_page.term.content')"></div>
        <div class="space-y-4" v-html="$t('buy_page.term.content2')"></div>
      </div>
    </template>
  </Card>
</template>
<script lang="ts" setup>
  definePageMeta({
    layout: 'admin',
    middleware: undefined,
    path: '/term-policies',
  });
</script>
