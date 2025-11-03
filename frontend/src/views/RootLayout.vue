<script setup lang="ts">
import Drawer from "../components/Drawer.vue";
</script>

<template>
    <div class="flex flex-col lg:flex-row lg:gap-2 h-screen">
        <Drawer />
        <div class="h-full">
            <router-view></router-view>
        </div>
    </div>
</template>

<style scoped></style>
