import { Outlet } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import style from './BaseLayout.module.scss';
import { TFunction } from 'i18next';
import ErrorDialog from '../../components/ErrorDialog/ErrorDialog';

type BaseLayoutProps = {
  changeLanguage: (lang?: string) => void;
  t: TFunction<'translation', undefined, 'translation'>;
};

const BaseLayout = (props: BaseLayoutProps) => {
  return (
    <>
      <div className={style.layout}>
        <Header changeLanguage={props.changeLanguage} t={props.t} />
        <main className={style.base__container}>
          <Outlet />
        </main>
        <Footer t={props.t} />
      </div>
      <ErrorDialog />
    </>
  );
};

export { BaseLayout };
