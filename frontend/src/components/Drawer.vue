<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { signOut, useSession } from "../lib/auth-client.ts";
import { useRouter } from "vue-router";
import { ref } from "vue";
import AddWorkspaceModal from "./AddWorkspaceModal.vue";

const { t, availableLocales, locale } = useI18n();
const session = useSession();
const router = useRouter();

const showThemeMenu = ref(false);
const showLanguageMenu = ref(false);

const handleChangeTheme = (theme: string) => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
    showThemeMenu.value = false;
};

const handleChangeLocale = (newLocale: string) => {
    locale.value = newLocale;
    localStorage.setItem("locale", newLocale);
    showLanguageMenu.value = false;
};

const handleLogout = async () => {
    await signOut();
    await router.push("/auth");
};
</script>

<template>
    <div class="drawer lg:drawer-open lg:max-w-max">
        <input id="my-drawer-1" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content">
            <!-- Page content here -->
            <label
                for="my-drawer-1"
                class="btn btn-ghost drawer-button lg:hidden"
            >
                <v-icon name="fc-menu" />
            </label>
        </div>
        <div class="drawer-side">
            <label
                for="my-drawer-1"
                aria-label="close sidebar"
                class="drawer-overlay"
            ></label>
            <div class="bg-base-200 min-h-full w-80 p-4 flex flex-col gap-2">
                <!--    Drawer header    -->
                <div>
                    <div class="drawer-header text-3xl text-center">
                        {{ t("title") }}
                    </div>
                    <div class="divider my-5">
                        {{ t("dashboard.title") }}
                    </div>
                </div>
                <!-- Ul for list workspaces  -->
                <div class="menu flex-1 w-full">
                    <ul></ul>
                </div>
                <!--  Drawer bottom   -->
                <div class="flex flex-col gap-2">
                    <AddWorkspaceModal />
                    <div
                        v-if="session && session.data"
                        class="dropdown dropdown-top dropdown-end w-full"
                    >
                        <div
                            tabindex="0"
                            role="button"
                            class="btn w-full flex gap-2 justify-between"
                        >
                            <div class="flex gap-2 items-center">
                                <div class="avatar">
                                    <div class="w-6 rounded-lg">
                                        <img
                                            :src="session.data.user.image || ''"
                                            alt="profil picture"
                                        />
                                    </div>
                                </div>
                                <p>{{ session.data.user.name }}</p>
                            </div>
                            <div>
                                <v-icon name="fa-caret-down" />
                            </div>
                        </div>
                        <ul
                            tabindex="0"
                            class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow-xl mb-2"
                        >
                            <!-- Theme Menu -->
                            <li>
                                <details>
                                    <summary class="flex justify-between">
                                        <span>{{
                                            t("dashboard.dropdown.theme") ||
                                            "Thème"
                                        }}</span>
                                    </summary>
                                    <ul class="p-2">
                                        <li>
                                            <a
                                                @click="
                                                    handleChangeTheme('dark')
                                                "
                                            >
                                                {{
                                                    t(
                                                        "dashboard.dropdown.themes.dark",
                                                    )
                                                }}
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                @click="
                                                    handleChangeTheme('light')
                                                "
                                            >
                                                {{
                                                    t(
                                                        "dashboard.dropdown.themes.light",
                                                    )
                                                }}
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                @click="
                                                    handleChangeTheme('cupcake')
                                                "
                                            >
                                                {{
                                                    t(
                                                        "dashboard.dropdown.themes.cupcake",
                                                    )
                                                }}
                                            </a>
                                        </li>
                                    </ul>
                                </details>
                            </li>

                            <!-- Language Menu -->
                            <li>
                                <details>
                                    <summary class="flex justify-between">
                                        <span>{{
                                            t("dashboard.dropdown.language") ||
                                            "Language"
                                        }}</span>
                                    </summary>
                                    <ul class="p-2">
                                        <li
                                            v-for="language in availableLocales"
                                            :key="language"
                                        >
                                            <a
                                                @click="
                                                    handleChangeLocale(language)
                                                "
                                            >
                                                {{ language }}
                                            </a>
                                        </li>
                                    </ul>
                                </details>
                            </li>

                            <div class="divider my-1"></div>

                            <li>
                                <a class="flex justify-between">
                                    <span>{{
                                        t("dashboard.dropdown.profile")
                                    }}</span>
                                    <v-icon name="fa-user-alt" />
                                </a>
                            </li>

                            <li>
                                <a
                                    class="flex justify-between"
                                    @click="handleLogout"
                                >
                                    <span>{{
                                        t("dashboard.dropdown.logout")
                                    }}</span>
                                    <v-icon name="md-logout-round" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
