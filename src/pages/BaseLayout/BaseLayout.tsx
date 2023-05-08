import { Outlet } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './BaseLayout.css';

const BaseLayout = () => {
  return (
    <div className='layout'>
      <Header />
      <main className='base__container'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export { BaseLayout };
