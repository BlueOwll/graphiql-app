import { Routes, Route, Navigate } from 'react-router-dom';
import { BaseLayout } from './pages/BaseLayout/BaseLayout';
import WelcomePage from './pages/WelcomePage/WelcomePage';
import MainPage from './pages/MainPage/MainPage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { useTranslation } from 'react-i18next';
import RequireAuth from './hocs/RequireAuth';

function App() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang?: string) => {
    i18n.changeLanguage(lang);
    console.log('changeLanguage');
  };

  return (
    <Routes>
      <Route path="/" element={<BaseLayout changeLanguage={changeLanguage} t={t} />}>
        <Route index element={<WelcomePage />} />

        <Route
          path="main"
          element={
            <RequireAuth>
              <MainPage />
            </RequireAuth>
          }
        />

        {/* <Route path="login" element={<LoginPage />} /> */}
        <Route path="404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
