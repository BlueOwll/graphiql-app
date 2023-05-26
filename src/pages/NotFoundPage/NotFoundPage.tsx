import style from './NotFoundPage.module.scss';
import { useTranslation } from 'react-i18next';
const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <div className={style.notfound__wrapper}>
      <p>{t('Page not found')}</p>
    </div>
  );
};

export { NotFoundPage };
