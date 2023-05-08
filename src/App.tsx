import { Routes, Route, Navigate } from 'react-router-dom';
import { BaseLayout } from './pages/BaseLayout/BaseLayout';
import WelcomePage from './pages/WelcomePage/WelcomePage';
import MainPage from './pages/MainPage/MainPage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<BaseLayout />}>
        <Route index element={<WelcomePage />} />
        <Route path="main" element={<MainPage />} />
        {/* <Route path="login" element={<LoginPage />} /> */}
        <Route path="404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
