import { Outlet } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import './BaseLayout.css';

const BaseLayout = () => {
  return (
    <div className="layout">
      <main className="base__container">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export { BaseLayout };
