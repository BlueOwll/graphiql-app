import { Routes, Route, Navigate } from 'react-router-dom';
import { BaseLayout } from './pages/BaseLayout/BaseLayout';
import WelcomePage from './pages/WelcomePage/WelcomePage';
import MainPage from './pages/MainPage/MainPage';
import SignIn from './pages/SignInPage/SignInPage';
import SignUp from './pages/SignInPage/SignUp';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { useTranslation } from 'react-i18next';

function App() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <Routes>
      <Route path="/" element={<BaseLayout changeLanguage={changeLanguage} t={t} />}>
        <Route index element={<WelcomePage />} />
        <Route path="main" element={<MainPage />} />
        <Route path="signIn" element={<SignIn />} />
        <Route path="signUp" element={<SignUp />} />
        <Route path="404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
