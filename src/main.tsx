import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import './i18n';
import { AuthProvider } from './hocs/AuthProvider.tsx';
import themeLight from './themes/theme-light.ts';
import { ThemeProvider } from '@emotion/react';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading languages...</div>}>
      <AuthProvider>
        <BrowserRouter>
          <ThemeProvider theme={themeLight}>
            <App />
          </ThemeProvider>
        </BrowserRouter>
      </AuthProvider>
    </Suspense>
  </React.StrictMode>,
);
