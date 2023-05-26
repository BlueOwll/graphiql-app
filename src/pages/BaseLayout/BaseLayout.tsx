import { Outlet } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import style from './BaseLayout.module.scss';

const BaseLayout = () => {
  return (
    <div className={style.layout}>
      <Header />
      <main className={style.base__container}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export { BaseLayout };
