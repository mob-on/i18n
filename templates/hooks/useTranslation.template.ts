import i18n from "@mob-on/react-i18n";

let prefix = "";
export const setTranslationPrefix = (newPrefix: string) => {
  prefix = `${newPrefix}.`;
};

const useTranslation = () => {
  const i18n = require("@mob-on/react-i18n");
  const { t } = i18n.useTranslation();

  return {
    t: (key: string, ...params: any[]) => {
      return t(`${prefix}${key}`, params);
    },
  };
};

export default useTranslation;
