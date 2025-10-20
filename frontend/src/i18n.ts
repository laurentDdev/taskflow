import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    lng: "fr",
    fallbackLng: "en",
    ns: [
      "common",
      "home",
      "login",
      "register",
      "forgotPassword",
      "resetPassword",
      "workspace",
    ],
    defaultNS: "common",
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
    react: {
      useSuspense: true,
    },
  });

export default i18n;
