<script setup lang="ts">
import {ref} from "vue";
import type {Workspace} from "../../types/workspace";
import DashboardHeader from "../../components/dashboard/DashboardHeader.vue";
import DashboardContent from "../../components/dashboard/DashboardContent.vue";

const filter = ref("")

defineProps<{
  workspaces: Workspace[]
}>()

</script>

<template>
  <div class="h-full flex flex-col">

    <DashboardHeader v-model:filter="filter" />
    <DashboardContent :workspaces="workspaces" :filter="filter" />
  </div>
</template>

<style scoped></style>
