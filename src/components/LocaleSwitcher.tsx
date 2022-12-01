import { Button, Col, Modal, Row } from "react-bootstrap";
import { useSelectedLocale } from "../hooks/translation/useSelectedLocale";
import { useTranslation } from "../hooks/translation/useTranslation";
import { i18n } from "../i18n";

interface LocaleSwitcherProps {
  show: boolean;
  hide: () => void;
  children: React.ReactNode;
}

export const LocaleSwitcher = ({
  show,
  hide,
  children,
}: LocaleSwitcherProps) => {
  const { t } = useTranslation();
  const locales = i18n.locales;
  const { locale: currentLocale, changeLocale } = useSelectedLocale();

  return (
    <>
      {children}

      <Modal show={show} centered onHide={hide}>
        <Modal.Header closeButton>
          <h5 className="text-body">{t("language.select")}</h5>
        </Modal.Header>
        <Modal.Body className="p-4">
          <Row>
            {locales
              .sort((a, _b) => (a === currentLocale ? -1 : 0))
              .map((locale, index) => {
                const localeName = i18n.getLocaleName(locale);
                const country = i18n.getCountry(locale).toLowerCase();
                const selected = locale === currentLocale;

                return (
                  <Col xs={12} sm={6} key={index}>
                    <Button
                      variant={selected ? "light-outline" : "light"}
                      className="my-1 w-100 text-start d-flex align-items-center justify-content-between"
                      onClick={() => changeLocale(locale)}
                      disabled={selected}
                    >
                      <div className="d-flex align-items-center">
                        {country}
                        <span className="ms-2">{localeName}</span>
                      </div>
                      {selected && <span>Selected</span>}
                    </Button>
                  </Col>
                );
              })}
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default LocaleSwitcher;
