<script setup lang="ts">
import type {Workspace} from "../../types/workspace";
import {computed} from "vue";
import {useI18n} from "vue-i18n";
import DashboardCard from "./DashboardCard.vue";


const props = defineProps<{
  workspaces: Workspace[];
  filter: string;
}>();

const filteredWorkspaces = computed(() =>
    props.workspaces.filter((w) =>
        w.name.toLowerCase().startsWith(props.filter.toLowerCase())
    )
);


</script>

<template>
  <div
      class="flex-1 p-4 sm:p-6 lg:p-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-fr"
  >
    <RouterLink
        :to="`/workspace/${workspace.id}`"
        v-for="workspace in filteredWorkspaces"
        :key="workspace.id"
        class="group"
    >
      <DashboardCard :workspace="workspace" />
    </RouterLink>

    <!-- Empty state if no workspaces -->
    <div
        v-if="filteredWorkspaces.length === 0"
        class="col-span-full flex flex-col items-center justify-center py-16 text-center"
    >
      <div class="w-20 h-20 bg-base-300 rounded-full flex items-center justify-center mb-4">
        <v-icon name="md-searchoff-round" scale="2" class="opacity-50"/>
      </div>
      <h3 class="text-lg font-semibold mb-2">No workspaces found</h3>
      <p class="text-sm opacity-60">Try adjusting your search filter</p>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Smooth gradient animation on hover */
@keyframes gradient-shift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.group:hover .card {
  background-size: 200% 200%;
  animation: gradient-shift 3s ease infinite;
}
</style>