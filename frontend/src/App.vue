<script setup lang="ts">

import {onMounted} from "vue";
import {useI18n} from "vue-i18n";

const {locale} = useI18n();

onMounted(() => {
  const theme = localStorage.getItem("theme");
  const localeInStorage = localStorage.getItem("locale");
  if (theme) {
    document.documentElement.setAttribute("data-theme", theme);
  } else {
    document.documentElement.setAttribute("data-theme", "light");
  }

  if (localeInStorage) {
    locale.value = localeInStorage;
  }

})

</script>

<template>
  <main class="min-h-screen">
    <router-view/>
  </main>
</template>

<style scoped>
</style>
