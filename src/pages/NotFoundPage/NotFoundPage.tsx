import './NotFoundPage.css';
import { useTranslation } from 'react-i18next';
const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <div className="not-found__wrapper">
      <p>{t('Page not found')}</p>
    </div>
  );
};

export { NotFoundPage };
