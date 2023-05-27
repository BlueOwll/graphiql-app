import { Routes, Route, Navigate } from 'react-router-dom';
import { BaseLayout } from './pages/BaseLayout/BaseLayout';
import WelcomePage from './pages/WelcomePage/WelcomePage';
import MainPage from './pages/MainPage/MainPage';
import SignIn from './pages/SignInPage/SignInPage';
import SignUp from './pages/SignInPage/SignUpPage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { AppProvider } from './hocs/AppProvider';

function App() {
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<BaseLayout />}>
          <Route index element={<Navigate to="/main" replace />} />
          <Route path="welcome" element={<WelcomePage />} />
          <Route path="main" element={<MainPage />} />
          <Route path="signIn" element={<SignIn />} />
          <Route path="signUp" element={<SignUp />} />
          <Route path="404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Route>
      </Routes>
    </AppProvider>
  );
}

export default App;
