<script setup lang="ts">
import type { Workspace } from '../../types/workspace';

defineProps<
  {
    workspace: Workspace
  }
>()
</script>

<template>
    <header
        class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-base-100 shadow-md rounded-2xl"
    >

        <!-- Top side of header -->
        <div>
            <!-- Top left side -->
            <div class="flex gap-2 items-center">
                <RouterLink to="/">
                    <button class="btn btn-primary">Back</button>
                </RouterLink>
                <h3>{{workspace.name}}</h3>
            </div
            <!-- Top right side -->
            <div>

            </div>
        </div>

        <!--Bottom side of header  -->
        <div>

        </div>
    </header>
</template>
