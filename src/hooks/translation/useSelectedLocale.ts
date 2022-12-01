import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { i18n } from "../../i18n/i18n";

export const useSelectedLocale = () => {
  const router = useRouter();
  const [locale, setLocale] = useState(i18n.defaultLocale);

  useEffect(() => {
    const urlLocale = i18n.sanitizeLocale(
      Array.isArray(router.query.locale)
        ? router.query.locale[0]
        : router.query.locale,
    );

    if (i18n.exists(urlLocale)) {
      setLocale(urlLocale);
      window.localStorage.setItem("locale", urlLocale);
    } else if (typeof window !== "undefined") {
      const localStorageLocale = window.localStorage.getItem("locale");

      if (i18n.exists(localStorageLocale)) {
        setLocale(localStorageLocale);
      } else if (i18n.useBrowserDefault) {
        const navLocale =
          window.navigator?.languages?.[0] || window.navigator?.language;
        if (i18n.exists(navLocale)) {
          const locale = i18n.sanitizeLocale(navLocale);
          setLocale(locale);
          window.localStorage.setItem("locale", locale);
        }
      }
    }
  }, [setLocale, router.query.locale]);

  const changeLocale = (localeSelected: string) => {
    const locale = i18n.sanitizeLocale(localeSelected);
    const localeName = i18n.getLocaleName(locale);

    if (localeName) {
      window.localStorage.setItem("locale", locale);
      router.reload();
    } else {
      console.error(`Unsupported locale: ${locale}`);
    }
  };

  return { locale, changeLocale };
};
