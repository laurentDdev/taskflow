<script setup lang="ts">

import {useI18n} from "vue-i18n";
import {signOut, useSession} from "../lib/auth-client.ts";
import {useRouter} from "vue-router";

const {t, availableLocales, locale} = useI18n()
const session = useSession()

const router = useRouter()


const handleChangeTheme = (theme: string) => {
  localStorage.setItem("theme", theme)
}

const handleChangeLocale = (newLocale: string) => {
  locale.value = newLocale
  localStorage.setItem("locale", newLocale)
}


const handleLogout = async () => {
  await signOut()
  await router.push("/auth")
}

</script>

<template>

  <div class="drawer">
    <input id="my-drawer-1" type="checkbox" class="drawer-toggle"/>
    <div class="drawer-content ">
      <!-- Page content here -->
      <label for="my-drawer-1" class="btn btn-ghost drawer-button lg:hidden">
        <v-icon name="fc-menu"/>
      </label>
    </div>
    <div class="drawer-side ">
      <label for="my-drawer-1" aria-label="close sidebar" class="drawer-overlay"></label>
      <div class="bg-base-200 min-h-full w-80 p-4 flex flex-col gap-2">
        <!--    Drawer header    -->
        <div>
          <div class="drawer-header text-3xl text-center">
            {{ t('title') }}
          </div>
          <div class="divider my-10">
            {{ t('dashboard.title') }}
          </div>
        </div>
        <div class="menu bg-red-500 flex-1 w-full">
          <ul>

          </ul>
        </div>
        <!--  Drawer bottom   -->
        <div v-if="session && session.data" class="dropdown dropdown-top dropdown-end">

          <div tabindex="0" role="button" class="btn m-1 w-full flex gap-2 justify-between">
            <div class="flex gap-2 items-center">
              <div class="avatar">
                <div class="w-6 rounded-lg">
                  <img :src="session.data.user.image" alt="profil picture"/>
                </div>
              </div>
              <p>{{ session.data.user.name }}</p>
            </div>
            <div>
              <v-icon name="fa-caret-down"/>
            </div>
          </div>

          <ul tabindex="0" class="dropdown-content dropdown-end menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow-sm">


            <li class="dropdown dropdown-hover dropdown-right">
              <a tabindex="0" role="button" class="flex justify-between">
                <span>{{ t('dashboard.dropdown.theme') || 'Thème' }}</span>
                <v-icon name="fa-lightbulb"/>
              </a>

              <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow-xl">
                <li>
                  <input
                      type="radio"
                      name="theme-dropdown"
                      class="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                      :aria-label="t('dashboard.dropdown.themes.dark')"
                      value="dark"
                      @change="e => handleChangeTheme((e as any)!.target!.value)"
                  />
                </li>
                <li>
                  <input
                      type="radio"
                      name="theme-dropdown"
                      class="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                      :aria-label="t('dashboard.dropdown.themes.light')"
                      value="light"
                      @change="e => handleChangeTheme((e as any)!.target!.value)"
                  />
                </li>
                <li>
                  <input
                      type="radio"
                      name="theme-dropdown"
                      class="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                      :aria-label="t('dashboard.dropdown.themes.cupcake')"
                      value="cupcake"
                      @change="e => handleChangeTheme((e as any)!.target!.value)"
                  />
                </li>

              </ul>
            </li>

            <li class="dropdown dropdown-hover dropdown-right">
              <a tabindex="0" role="button" class="flex justify-between">
                <span>{{ t('dashboard.dropdown.language') || 'Language' }}</span>
                <v-icon name="fa-language"/>
              </a>

              <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow-xl">
                <li v-for="language in availableLocales">
                  <a class="w-full btn btn-sm btn-block btn-ghost justify-start" @click="handleChangeLocale(language)">
                    {{language}}
                  </a>
                </li>
              </ul>
            </li>
            <div class="divider my-1"></div>

            <li>
              <a class="flex justify-between">
                <span>{{ t('dashboard.dropdown.profile') }}</span>
                <v-icon name="fa-user-alt"/>
              </a>
            </li>

            <li>
              <a class="flex justify-between" @click="handleLogout">
                <span>{{ t('dashboard.dropdown.logout') }}</span>
                <v-icon name="md-logout-round"/>
              </a>
            </li>

          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
