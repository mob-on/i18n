import parse from "html-react-parser";
import Mustache from "mustache";
import React from "react";
import ReactDOMServer from "react-dom/server";
import sanitizeHtml from "sanitize-html";
import { i18n } from "../../i18n/i18n";
import { useSelectedLocale } from "./useSelectedLocale";

/**
 * Provides the t() function which returns the value stored for this given key (e.g. "ui.headline")
 * in the translation file.
 * The return value can be a string, a number, an array or an object.
 * In case there is no entry for this key, it returns the key.
 * @returns t(key: string): any function
 */
export const useTranslation = () => {
  const { locale } = useSelectedLocale();

  const enrich = (object) => {
    if (React.isValidElement(object)) {
      return ReactDOMServer.renderToString(object);
    } else if (object instanceof Object && Object.keys(object).length) {
      const newObject = {};
      for (const key of Object.keys(object)) {
        newObject[key] = enrich(object[key]);
      }
      return newObject;
    }

    return object;
  };

  return {
    /**
     * Returns the value stored for this given key (e.g. "i18n.ui.headline")  in the translation file.
     * The return value can be a string, a number, an array or an object.
     * In case there is no entry for this key, it returns the key.
     * @param key the key for looking up the translation
     * @param view the mustache view for interpolating the template string
     * @returns the value stored for this key, could be a string, a number, an array or an object
     */
    t: (key: string, view?: any) => {
      let value = key
        .split(".")
        .reduce(
          (previous, current) => (previous && previous[current]) || null,
          i18n.getTranslations(locale),
        );
      let translation = value || key;

      try {
        const richArgs = enrich(view);
        return parse(
          Mustache.render(
            sanitizeHtml(translation, {
              allowedTags: [],
              allowedAttributes: {},
            }),
            richArgs,
          ),
        );
      } catch (e) {
        return translation;
      }
    },
  };
};
