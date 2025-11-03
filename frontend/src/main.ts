import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
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
);

const app = createApp(App);
app.use(i18n);
app.use(router);
app.component("v-icon", OhVueIcon);
app.mount("#app");
