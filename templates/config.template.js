const en_gb = require("./en-GB.json");
const en = require("./en.json");

const locales = ["en-GB", "en-US"];

const localeNames = {
  en_gb: "English (UK)",
  en_us: "English (US)",
};

//Locales partially supported (for example, not having a country code)
//"en" locale => loads by default "en-GB"
const alias = { en: "en-GB" };

//Configuring en_gb and en_us to inherit from "en" but allowing overrides
const translations = {
  en_gb: { ...en, ...en_gb },
  en_us: { ...en, ...en_us },
};

const defaultLocale = "en-GB";

//Snippet to load translations from another project, prefixing it
const shopPrefix = "shop";
require("../shop/hooks/useTranslation").setTranslationPrefix(shopPrefix);
const shopConfig = require("../shop/i18n/config").default;
const shopTranslations = shopConfig.translations;
mergeWithPrefix(translations, shopTranslations, shopPrefix);

//Exports
const config = {
  locales,
  localeNames,
  alias,
  translations,
  defaultLocale,
};

exports.default = config;
