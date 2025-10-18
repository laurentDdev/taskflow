import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translate from "./translate";

i18n.use(initReactI18next).init({
  resources: translate,
  lng: "fr",
});

export default i18n;
