<script setup lang="ts">

import Drawer from './../../components/Drawer.vue'

</script>

<template>
  <div class="flex flex-col h-screen">
    <Drawer />
    <div class="h-full" >
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>

</style>