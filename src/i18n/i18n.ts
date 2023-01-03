interface Config {
  locales: string[];
  localeNames: Map<string, string>;
  alias: Map<string, string>;
  translations: Map<string, Object>;
  defaultLocale: string;
}

const config: Config = require("./../../../../i18n/config").default;

const { locales, localeNames, alias, translations, defaultLocale } = config;

const getAlias = (language: string) => {
  return alias[Object.keys(alias).find((a) => a === language)];
};

const sanitizeLocale = (locale: string) => {
  if (!locale) {
    return "";
  }

  let [language, country] = locale.toLowerCase().split(/[,-_ ]/);
  if (!country) {
    const alias = getAlias(language);
    language = getLanguage(alias);
    country = getCountry(alias);
  }
  return `${language}-${country.toUpperCase()}`;
};

const getCountry = (locale: string): string => {
  return sanitizeLocale(locale).split("-")[1];
};

const getLanguage = (locale: string): string => {
  return sanitizeLocale(locale).split("-")[0];
};

export const i18n = {
  locales,
  alias,
  defaultLocale,
  useBrowserDefault: true,
  getLocaleName: (locale: string): string => {
    const localeToFind = sanitizeLocale(locale).replace("-", "_").toLowerCase();

    return (
      localeNames[Object.keys(localeNames).find((l) => l == localeToFind)] ||
      locale.toUpperCase()
    );
  },
  getTranslations: (locale: string): any => {
    const localeToFind = sanitizeLocale(locale).replace("-", "_").toLowerCase();
    return (
      translations[Object.keys(translations).find((l) => l == localeToFind)] ||
      translations[defaultLocale]
    );
  },
  getCountry,
  getLanguage,
  sanitizeLocale,
  exists: (locale: string) => {
    const localeToFind = sanitizeLocale(locale);
    return !!locales.find((l) => l === localeToFind);
  },
  mergeTranslations: (
    translations: Map<string, Object>,
    secondTranslations: Map<string, object>,
    prefix: string,
  ) => {
    for (const [key, value] of Object.entries(translations)) {
      value[prefix] = secondTranslations[key];
    }
  },
};
