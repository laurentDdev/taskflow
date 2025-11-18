import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createPinia } from "pinia";
import { PiniaColada } from "@pinia/colada";
import { router } from "./route.ts";
import i18n from "./i18n.ts";
import { addIcons, OhVueIcon } from "oh-vue-icons";

import {
  MdEmail,
  BiKeyFill,
  FaRegularEye,
  FaRegularEyeSlash,
  FaGithub,
  FaGoogle,
  FaUserAlt,
  FcMenu,
  FaCaretDown,
  MdLogoutRound,
  FaLightbulb,
  FaLanguage,
  FaPlus,
  MdWorkspacesfilled,
  MdDescriptionOutlined,
  FaSearch,
  FaFolderMinus,
  MdArrowforwardRound,
  MdGroupRound,
  MdDashboardRound,
  MdAccesstimeRound,
  MdSearchoffRound,
} from "oh-vue-icons/icons";

addIcons(
  MdEmail,
  BiKeyFill,
  FaRegularEye,
  FaRegularEyeSlash,
  FaGithub,
  FaGoogle,
  FaUserAlt,
  FcMenu,
  FaCaretDown,
  MdLogoutRound,
  FaLightbulb,
  FaLanguage,
  FaPlus,
  MdWorkspacesfilled,
  MdDescriptionOutlined,
  FaSearch,
  FaFolderMinus,
  MdArrowforwardRound,
  MdGroupRound,
  MdDashboardRound,
  MdAccesstimeRound,
  MdSearchoffRound,
);

const app = createApp(App);
const pinia = createPinia();
app.use(i18n);
app.use(router);
app.use(pinia);
app.use(PiniaColada, {});
app.component("v-icon", OhVueIcon);
app.mount("#app");
