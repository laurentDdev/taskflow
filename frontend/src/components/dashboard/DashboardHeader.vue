<script setup lang="ts">
import { useI18n } from "vue-i18n";
import AddWorkspaceModal from "../AddWorkspaceModal.vue";

const { t } = useI18n();

defineProps<{
  filter: string;
}>();

const emit = defineEmits(["update:filter"]);

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:filter", target.value);
};
</script>

<template>
  <header
      class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-base-100 shadow-md rounded-2xl"
  >
    <div class="flex justify-center sm:justify-start">
      <h2 class="text-xl sm:text-2xl font-bold">{{ t("dashboard.title") }}</h2>
    </div>

    <div class="w-full sm:w-1/2 md:w-1/3">
      <label class="input outline-none flex items-center gap-2 w-full">
        <v-icon name="fa-search" class="opacity-60" />
        <input
            type="text"
            required
            :placeholder="t('dashboard.search')"
            :value="filter"
            @input="handleInput"
            class="grow outline-none"
        />
      </label>
    </div>


    <div class="flex justify-center sm:justify-end">
      <AddWorkspaceModal />
    </div>
  </header>
</template>

<style scoped>
</style>
