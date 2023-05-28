import { Outlet } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import style from './BaseLayout.module.scss';
import ErrorDialog from '../../components/ErrorDialog/ErrorDialog';

const BaseLayout = () => {
  return (
    <>
      <div className={style.layout}>
        <Header />
        <main className={style.base__container}>
          <Outlet />
        </main>
        <Footer />
      </div>
      <ErrorDialog />
    </>
  );
};

export { BaseLayout };
