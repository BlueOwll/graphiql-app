import { Routes, Route, Navigate } from 'react-router-dom';
import { BaseLayout } from './pages/BaseLayout/BaseLayout';
import WelcomePage from './pages/WelcomePage/WelcomePage';
import MainPage from './pages/MainPage/MainPage';
import SignIn from './pages/SignInPage/SignInPage';
import SignUp from './pages/SignInPage/SignUpPage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { AppProvider } from './hocs/AppProvider';
import { RequireAuth } from './hocs/RequireAuth';
import { RequireNotAuth } from './hocs/RequireNotAuth';

function App() {
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<BaseLayout />}>
          <Route index element={<Navigate to="/main" replace />} />
          <Route path="welcome" element={<WelcomePage />} />
          <Route
            path="main"
            element={
              <RequireAuth>
                <MainPage />
              </RequireAuth>
            }
          />
          <Route
            path="signIn"
            element={
              <RequireNotAuth>
                <SignIn />
              </RequireNotAuth>
            }
          />
          <Route
            path="signUp"
            element={
              <RequireNotAuth>
                <SignUp />
              </RequireNotAuth>
            }
          />
          <Route path="404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Route>
      </Routes>
    </AppProvider>
  );
}

export default App;
