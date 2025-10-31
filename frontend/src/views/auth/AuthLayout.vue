<script setup lang="ts">

import {useRoute} from "vue-router";
import {useI18n} from "vue-i18n";

const route = useRoute()

const {t} = useI18n()



</script>

<template>

  <main class=" min-h-screen flex justify-center items-center">
    <div class="card bg-base-200 p-5 shadow-sm min-w-96 w-[15vw] gap-4">
      <div class="card-title flex flex-col text-center gap-4">
        <nav class="w-full grid grid-cols-2 gap-2">
          <router-link to="/auth"><button class="btn  btn-block" :class="route.fullPath == '/auth' ? 'btn-primary' : ''">{{t('auth.title.signIn')}}</button></router-link>
          <router-link to="/auth/register"><button class="btn btn-block " :class="route.fullPath == '/auth/register' ? 'btn-primary' : ''">{{t('auth.title.signUp')}}</button></router-link>
        </nav>
        <h1 class="text-xl">{{t('title')}}</h1>
        <p class="text-sm">{{t('slogan')}}</p>
      </div>
      <div class="card-body px-0 py-4 ">
        <router-view />
      </div>
    </div>
  </main>
</template>

<style scoped>

</style>