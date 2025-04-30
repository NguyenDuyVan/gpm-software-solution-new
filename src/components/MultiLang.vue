<template>
  <ClientOnly>
    <div class="relative">
      <div class="rounded-lg cursor-pointer hover:brightness-90" @click="toggleLangPopover">
        <span class="text-xl">{{ getLocaleLabel(selectedLocale) }}</span>
      </div>
      <Popover
        ref="languagePopoverRef"
        class="!p-0 popover-language"
        :dt="{ '--p-popover-content-padding': '0' }"
        pt:content="p-1"
      >
        <div
          v-for="option in localeOptions"
          :key="option.code"
          class="flex items-center px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
          @click="selectLang(option.code)"
        >
          <span class="text-xl">{{ option.flag }}</span>
          <span class="ml-2">{{ option.label }}</span>
        </div>
      </Popover>
    </div>
  </ClientOnly>
</template>
<script setup lang="ts">
  import type Popover from 'primevue/popover';
  import type { Locale } from '~/types';

  const { locale, locales, setLocale } = useI18n();

  const showLangPopover = ref(false);

  const languagePopoverRef = ref<InstanceType<typeof Popover> | null>(null);

  const toggleLangPopover = (event: MouseEvent) => {
    if (!event || !languagePopoverRef.value) return;
    languagePopoverRef.value.toggle(event);
  };

  const selectLang = (code: Locale) => {
    setLocale(code);
    localStorage.setItem('lang', code);
    showLangPopover.value = false;
    languagePopoverRef.value?.hide();
  };

  const localeOptions = computed(() =>
    (locales.value as any[]).map(l => {
      let flag = '';
      let label = '';
      switch (l.code) {
        case 'vi':
          flag = '🇻🇳';
          label = 'Tiếng Việt';
          break;
        case 'en':
          flag = '🇺🇸';
          label = 'English';
          break;
        default:
          flag = '';
          label = l.name || l.code.toUpperCase();
      }
      return {
        code: l.code,
        label,
        flag,
      };
    })
  );
  const selectedLocale = ref(locale.value);

  watch(locale, val => {
    selectedLocale.value = val;
  });

  const getLocaleLabel = (code: string) => {
    const found = localeOptions.value.find(l => l.code === code);
    return found ? `${found.flag}` : code.toUpperCase();
  };

  // Restore language from localStorage on mount
  onMounted(() => {
    const savedLang = localStorage.getItem('lang');
    if (savedLang && savedLang !== locale.value) {
      setLocale(savedLang as Locale);
    } else {
      localStorage.setItem('lang', locale.value);
    }
  });
</script>
<style lang=""></style>
