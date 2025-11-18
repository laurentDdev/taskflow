<script setup lang="ts">
import type { Workspace } from "../../types/workspace";
import moment from "moment/moment";
import "moment/locale/fr";
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n();

defineProps<{
    workspace: Workspace;
}>();

const getThreeFirstMembersAvatars = (workspace: Workspace) => {
    return workspace.WorkspaceMember.slice(0, 3).map(
        (member) => member.user.avatar,
    );
};

const getTimeAgo = (date: string) => {
    const lang = locale.value.split("-")[0];

    let LocalMoment = moment(date);

    LocalMoment.locale(lang!);

    return LocalMoment.fromNow();
};
</script>

<template>
    <div
        class="card w-full max-w-sm sm:max-w-md bg-base-200 shadow-md hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 rounded-2xl overflow-hidden h-full border border-base-300/50 hover:border-primary/30"
    >
        <!-- HEADER -->
        <div class="relative">
            <div
                class="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>
            <div
                class="relative flex items-center gap-2 sm:gap-3 p-3 sm:p-4 border-b border-base-300/50"
            >
                <div
                    class="w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center rounded-xl overflow-hidden ring-2 ring-base-300 group-hover:ring-primary/40 transition-all duration-300 shrink-0"
                >
                    <img
                        v-if="workspace.logo"
                        :src="workspace.logo"
                        alt="logo"
                        class="object-cover w-full h-full"
                    />
                    <v-icon
                        v-else
                        name="fa-folder-minus"
                        class="text-xl sm:text-2xl opacity-70 group-hover:scale-110 transition-transform duration-300"
                    />
                </div>
                <div class="flex-1 min-w-0">
                    <h3
                        class="font-bold text-base sm:text-lg truncate group-hover:text-primary transition-colors duration-200"
                    >
                        {{ workspace.name }}
                    </h3>
                    <p class="text-xs opacity-60 flex items-center gap-1">
                        <v-icon
                            name="md-accesstime-round"
                            scale="0.7"
                            class="sm:scale-90"
                        />
                        {{ getTimeAgo(workspace.createdAt.toString()) }}
                    </p>
                </div>
            </div>
        </div>

        <!-- BODY -->
        <div class="p-3 sm:p-4 flex flex-col justify-between flex-1">
            <div class="mb-3 sm:mb-4">
                <p
                    class="text-xs sm:text-sm text-base-content/70 line-clamp-3 leading-relaxed"
                >
                    {{ workspace.description || "No description provided." }}
                </p>
            </div>

            <!-- STATS -->
            <div
                class="flex flex-wrap items-center gap-2 sm:gap-4 mb-3 sm:mb-4 text-xs sm:text-sm"
            >
                <div
                    class="flex items-center gap-1 px-2 py-1 sm:px-3 sm:py-1.5 bg-base-300/50 rounded-lg group-hover:bg-primary/10 transition-colors duration-200"
                >
                    <v-icon
                        name="md-dashboard-round"
                        scale="0.8"
                        class="sm:scale-90 opacity-70"
                    />
                    <span class="font-medium">5</span>
                    <span class="opacity-60">{{
                        t("dashboard.card.board")
                    }}</span>
                </div>
                <div
                    class="flex items-center gap-1 px-2 py-1 sm:px-3 sm:py-1.5 bg-base-300/50 rounded-lg group-hover:bg-secondary/10 transition-colors duration-200"
                >
                    <v-icon
                        name="md-group-round"
                        scale="0.8"
                        class="sm:scale-90 opacity-70"
                    />
                    <span class="font-medium">{{
                        workspace.WorkspaceMember.length
                    }}</span>
                    <span class="opacity-60">{{
                        t("dashboard.card.member")
                    }}</span>
                </div>
            </div>

            <!-- MEMBERS -->
            <div
                class="flex items-center justify-between pt-2 sm:pt-3 border-t border-base-300/50"
            >
                <div class="flex items-center gap-1 sm:gap-2">
                    <div
                        v-if="workspace.WorkspaceMember.length > 3"
                        class="avatar-group -space-x-3 sm:-space-x-5"
                    >
                        <div
                            v-for="avatar in getThreeFirstMembersAvatars(
                                workspace,
                            )"
                            :key="avatar"
                            class="avatar transition-transform hover:scale-110 hover:z-10"
                        >
                            <div
                                class="w-8 h-8 sm:w-10 sm:h-10 rounded-full ring-1 sm:ring-2 ring-base-100 ring-offset-1 ring-offset-base-200"
                            >
                                <img
                                    :src="avatar"
                                    alt="user avatar profile"
                                    class="object-cover w-full h-full"
                                />
                            </div>
                        </div>
                        <div
                            class="avatar placeholder transition-transform hover:scale-110 hover:z-10"
                        >
                            <div
                                class="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary to-secondary text-primary-content text-xs font-semibold rounded-full ring-1 sm:ring-2 ring-base-100 ring-offset-1 ring-offset-base-200"
                            >
                                +{{ workspace.WorkspaceMember.length - 3 }}
                            </div>
                        </div>
                    </div>
                    <div v-else class="avatar-group -space-x-3 sm:-space-x-5">
                        <div
                            v-for="member in workspace.WorkspaceMember"
                            :key="member.user.id"
                            class="avatar transition-transform hover:scale-110 hover:z-10"
                        >
                            <div
                                class="w-8 h-8 sm:w-10 sm:h-10 rounded-full ring-1 sm:ring-2 ring-base-100 ring-offset-1 ring-offset-base-200"
                            >
                                <img
                                    :src="member.user.avatar"
                                    alt="user avatar profile"
                                    class="object-cover w-full h-full"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Arrow indicator -->
                <div
                    class="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-base-300/50 group-hover:bg-primary group-hover:text-primary-content transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-1"
                >
                    <v-icon
                        name="md-arrowforward-round"
                        scale="0.7"
                        class="sm:scale-90"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
