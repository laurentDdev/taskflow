<script setup lang="ts">
import { useRoute } from "vue-router";
import { useWorkspaceQuery } from "../../queries/workspace.querie";
import { ref, watch } from "vue";
import type { Workspace } from "../../types/workspace";
import WorkspaceHeader from "../../components/workspace/WorkspaceHeader.vue";

const route = useRoute();

const id = route.params.workspaceId as string;

const workspace = ref<Workspace | null>(null);
const { data } = useWorkspaceQuery(id);

watch(data, () => {
    workspace.value = data.value;
});
</script>

<template>
    <div v-if="workspace">
        <WorkspaceHeader :workspace="workspace" />
    </div>
</template>

<style scoped></style>
