'use client'
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ar from "./translation/ar.json"
import en from "./translation/en.json"
import LanguageDetector from "i18next-browser-languagedetector"

const resources = {
  ar: {
    translation: ar
  },
  en: {
    translation: en
  }
};
i18n
.use(LanguageDetector)
  .use(initReactI18next) 
  .init({
    resources,
    lng: "en",
    interpolation: {
      escapeValue: false 
    },
    react:{
        useSuspense:false
    }
  }); 
  export default i18n;