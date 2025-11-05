<script setup lang="ts">

import type {Workspace} from "../../types/workspace";
import moment from "moment/moment";
import "moment/locale/fr";
import {useI18n} from "vue-i18n";

const { t, locale } = useI18n();

defineProps< {
  workspace: Workspace
} >()


const getThreeFirstMembersAvatars = (workspace: Workspace) => {
  return workspace.WorkspaceMember.slice(0, 3).map(
      (member) => member.user.avatar
  );
};

const getTimeAgo = (date: string) => {
  const lang = locale.value.split("-")[0];

  let LocalMoment = moment(date)

  LocalMoment.locale(lang!)

  return LocalMoment.fromNow();

};

</script>

<template>
  <div
      class="card bg-base-200 shadow-md hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 rounded-2xl overflow-hidden h-full border border-base-300/50 hover:border-primary/30"
  >
    <!-- HEADER with gradient overlay -->
    <div class="relative">
      <div class="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div class="relative flex items-center gap-3 p-4 border-b border-base-300">
        <div
            class="w-14 h-14 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center rounded-xl overflow-hidden ring-2 ring-base-300 group-hover:ring-primary/40 transition-all duration-300 shrink-0"
        >
          <img
              v-if="workspace.logo"
              :src="workspace.logo"
              alt="logo"
              class="object-cover w-full h-full"
          />
          <v-icon v-else name="fa-folder-minus" class="text-2xl opacity-70 group-hover:scale-110 transition-transform duration-300"/>
        </div>
        <div class="flex-1 min-w-0">
          <h3 class="font-bold text-lg truncate group-hover:text-primary transition-colors duration-200">
            {{ workspace.name }}
          </h3>
          <p class="text-xs opacity-60 flex items-center gap-1">
            <v-icon name="md-accesstime-round" scale="0.8"/>
            {{ getTimeAgo(workspace.createdAt.toString()) }}
          </p>
        </div>
      </div>
    </div>

    <!-- BODY -->
    <div class="p-4 flex flex-col justify-between flex-1">
      <div class="mb-4">
        <p class="text-sm text-base-content/70 line-clamp-3 leading-relaxed">
          {{ workspace.description || "No description provided." }}
        </p>
      </div>

      <!-- STATS with icons -->
      <div class="flex items-center gap-4 mb-4 text-sm">
        <div class="flex items-center gap-1.5 px-3 py-1.5 bg-base-300/50 rounded-lg group-hover:bg-primary/10 transition-colors duration-200">
          <v-icon name="md-dashboard-round" scale="0.9" class="opacity-70"/>
          <span class="font-medium">5</span>
          <span class="opacity-60">{{t("dashboard.card.board")}}</span>
        </div>
        <div class="flex items-center gap-1.5 px-3 py-1.5 bg-base-300/50 rounded-lg group-hover:bg-secondary/10 transition-colors duration-200">
          <v-icon name="md-group-round" scale="0.9" class="opacity-70"/>
          <span class="font-medium">{{ workspace.WorkspaceMember.length }}</span>
          <span class="opacity-60">{{t('dashboard.card.member')}}</span>
        </div>
      </div>

      <!-- MEMBERS with improved styling -->
      <div class="flex items-center justify-between pt-3 border-t border-base-300/50">
        <div class="flex items-center gap-2">
          <div
              v-if="workspace.WorkspaceMember.length > 3"
              class="avatar-group -space-x-5"
          >
            <div
                v-for="avatar in getThreeFirstMembersAvatars(workspace)"
                :key="avatar"
                class="avatar transition-transform hover:scale-110 hover:z-10"
            >
              <div class="w-10 rounded-full ring-2 ring-base-100 ring-offset-1 ring-offset-base-200">
                <img :src="avatar" alt="user avatar profile"/>
              </div>
            </div>
            <div class="avatar placeholder transition-transform hover:scale-110 hover:z-10">
              <div class="w-10 bg-gradient-to-br from-primary to-secondary text-primary-content text-xs font-semibold rounded-full ring-2 ring-base-100 ring-offset-1 ring-offset-base-200">
                +{{ workspace.WorkspaceMember.length - 3 }}
              </div>
            </div>
          </div>

          <div
              v-else
              class="avatar-group -space-x-5"
          >
            <div
                v-for="member in workspace.WorkspaceMember"
                :key="member.user.id"
                class="avatar transition-transform hover:scale-110 hover:z-10"
            >
              <div class="w-10 rounded-full ring-2 ring-base-100 ring-offset-1 ring-offset-base-200">
                <img :src="member.user.avatar" alt="user avatar profile"/>
              </div>
            </div>
          </div>
        </div>

        <!-- Arrow indicator -->
        <div class="flex items-center justify-center w-8 h-8 rounded-full bg-base-300/50 group-hover:bg-primary group-hover:text-primary-content transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-1">
          <v-icon name="md-arrowforward-round" scale="0.9"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>