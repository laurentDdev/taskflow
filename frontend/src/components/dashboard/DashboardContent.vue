<script setup lang="ts">
import type { Workspace } from "../../types/workspace";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import DashboardCard from "./DashboardCard.vue";

const props = defineProps<{
    workspaces: Workspace[];
    filter: string;
}>();

const filteredWorkspaces = computed(() =>
    props.workspaces.filter((w) =>
        w.name.toLowerCase().startsWith(props.filter.toLowerCase()),
    ),
);
</script>

<template>
    <div class="flex-1 p-4 sm:p-6 lg:p-8">
        <!-- Grille responsive avec auto-fit et minmax -->
        <div
            class="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4 sm:gap-6"
        >
            <RouterLink
                v-for="workspace in filteredWorkspaces"
                :key="workspace.id"
                :to="`/workspace/${workspace.id}`"
                class="group w-full"
            >
                <DashboardCard :workspace="workspace" />
            </RouterLink>
        </div>

        <!-- État vide -->
        <div
            v-if="filteredWorkspaces.length === 0"
            class="flex flex-col items-center justify-center py-12 sm:py-16 text-center w-full"
        >
            <div
                class="w-16 h-16 sm:w-20 sm:h-20 bg-base-300 rounded-full flex items-center justify-center mb-3 sm:mb-4"
            >
                <v-icon
                    name="md-searchoff-round"
                    scale="1.5"
                    class="opacity-50 sm:scale-150"
                />
            </div>
            <h3 class="text-base sm:text-lg font-semibold mb-1 sm:mb-2">
                No workspaces found
            </h3>
            <p class="text-xs sm:text-sm opacity-60">
                Try adjusting your search filter
            </p>
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
    0%,
    100% {
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
