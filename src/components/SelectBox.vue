<template>
  <div class="p-selectbox-container">
    <div class="p-selectbox-header" @click="isOpen = !isOpen">
      <span class="p-selectbox-label">{{ selectedText }}</span>
      <Button
        icon="pi pi-chevron-down"
        class="p-button-text p-button-sm"
        aria-label="Toggle Dropdown"
      />
    </div>

    <Panel v-show="isOpen" class="p-selectbox-panel">
      <div class="p-sticky-search">
        <span class="p-input-icon-left w-full">
          <i class="pi pi-search" />
          <InputText
            v-model="search"
            class="w-full"
            placeholder="Search"
            @input="handleSearch"
            @keydown.enter="enterEvent($event)"
          />
        </span>
      </div>
      <ul class="p-selectbox-items">
        <li
          v-for="item in suggestList"
          :key="item[source.valueProperty]"
          class="p-selectbox-item"
          @click="setSelectedId(item[source.valueProperty])"
        >
          {{ item.name }}
        </li>
      </ul>
    </Panel>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, onMounted, onUnmounted, watch } from 'vue';
  import Button from 'primevue/button';
  import InputText from 'primevue/inputtext';
  import Panel from 'primevue/panel';

  interface SourceItem {
    [key: string]: any;
    id?: number | string;
    name?: string;
  }

  interface Source {
    suggestSource: SourceItem[];
    displayProperty: string;
    valueProperty: string;
  }

  const props = defineProps<{
    placeHolder?: string;
    modelValue?: number | string;
  }>();

  const emit = defineEmits<{
    'update:modelValue': [value: number | string | undefined];
    onchange: [value: number | string | undefined];
  }>();

  const search = ref('');
  const isOpen = ref(false);
  const suggestList = ref<SourceItem[]>([]);
  const selectedId = ref<number | string | null>(null);
  const selectedText = ref('');
  const source = reactive<Source>({
    suggestSource: [],
    displayProperty: '',
    valueProperty: '',
  });

  watch(
    () => props.placeHolder,
    newVal => {
      if (newVal) selectedText.value = newVal;
    }
  );

  // Setup lifecycle
  selectedText.value = props.placeHolder || '';

  onMounted(() => {
    document.addEventListener('click', handleClickOutside);
  });

  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
  });

  // Methods
  const updateSuggestList = (
    data: SourceItem[],
    displayProperty: string,
    valueProperty: string,
    selectedId?: number | string
  ) => {
    source.suggestSource = data;
    source.displayProperty = displayProperty;
    source.valueProperty = valueProperty;
    suggestList.value = source.suggestSource;

    if (selectedId !== undefined) {
      setSelectedId(selectedId);
    }
  };

  const setSelectedId = (id?: number | string) => {
    if (id === undefined) {
      selectedText.value = props.placeHolder || '';
      selectedId.value = null;
      emit('update:modelValue', undefined);
      emit('onchange', undefined);
      return;
    }

    isOpen.value = false;
    const found = source.suggestSource.find(item => item.id == id);
    if (found) {
      selectedText.value = found[source.displayProperty];
      selectedId.value = id;
      emit('update:modelValue', id);
      emit('onchange', id);
    }
  };

  const handleSearch = () => {
    suggestList.value = source.suggestSource.filter(item =>
      item[source.displayProperty].toString().toLowerCase().includes(search.value.toLowerCase())
    );
  };

  // Press ENTER, select first suggest
  const enterEvent = (e: Event) => {
    if (suggestList.value.length > 0) {
      setSelectedId(suggestList.value[0][source.valueProperty]);
    }
    e.preventDefault();
  };

  // Click outside, hide dropdown container
  const handleClickOutside = (event: MouseEvent) => {
    const el = event.target as HTMLElement;
    if (!el.closest('.p-selectbox-container')) {
      isOpen.value = false;
    }
  };

  // Expose methods to parent components
  defineExpose({
    updateSuggestList,
    setSelectedId,
  });
</script>

<style scoped>
  .p-selectbox-container {
    position: relative;
    height: 44px;
    width: 100%;
  }

  .p-selectbox-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid var(--surface-border, #ced4da);
    border-radius: 6px;
    background: var(--surface-card, white);
    padding: 0.5rem;
    cursor: pointer;
    height: 100%;
  }

  .p-selectbox-label {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .p-selectbox-panel {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    margin-top: 0.25rem;
    z-index: 1995;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    padding: 0;
  }

  .p-sticky-search {
    position: sticky;
    top: 0;
    background: var(--surface-card, white);
    padding: 0.5rem;
    z-index: 1;
  }

  .p-selectbox-items {
    list-style-type: none;
    padding: 0;
    margin: 0;
    max-height: 300px;
    overflow-y: auto;
  }

  .p-selectbox-item {
    padding: 0.75rem 1rem;
    cursor: pointer;
    border-bottom: 1px solid var(--surface-border, #f2f2f2);
  }

  .p-selectbox-item:hover {
    background: var(--surface-hover, #eeeeee);
  }

  .w-full {
    width: 100%;
  }
</style>
