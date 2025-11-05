<script setup lang="ts">
import Drawer from "../components/Drawer.vue";
import {ref, watch} from "vue";
import type {Workspace} from "../types/workspace";
import {useWorkspacesQuery} from "../queries/workspace.querie.ts";

const workspaces = ref<Workspace[]>([])

const {data} = useWorkspacesQuery()


watch(data, () => {
  workspaces.value = data.value
})

</script>

<template>
    <div class="flex flex-col lg:flex-row lg:gap-2 ">
        <Drawer :workspaces="workspaces" />
        <div class=" w-full min-h-full ">
            <router-view v-slot="{ Component }">
              <component :is="Component" :workspaces="workspaces" />
            </router-view>
        </div>
    </div>
</template>

<style scoped></style>
