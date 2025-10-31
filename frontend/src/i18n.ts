import {createI18n} from "vue-i18n";
import french from './locales/french'
import english from "./locales/english";

const i18n = createI18n({
    legacy: false,
    locale: 'fr-FR',
    fallbackLocale: 'en-US',
    messages: {
        'fr-FR': french.messages,
        'en-US': english.messages
    }
})

export default i18n;