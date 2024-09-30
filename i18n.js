import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enJson from './locale/en.json'
import uzJson from './locale/uz.json'
i18n.use(initReactI18next).init({
 resources: {
    en:{...enJson},
    uz:{...uzJson}
 }, 
 lng: "en",    
});