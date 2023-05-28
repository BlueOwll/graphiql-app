import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import './i18n';
import { AuthProvider } from './hocs/AuthProvider.tsx';
import themeLight from './themes/theme-light.ts';
import { ThemeProvider } from '@emotion/react';
import { CircularProgress, CssBaseline } from '@mui/material';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Suspense fallback={<CircularProgress className={'center'} />}>
      <AuthProvider>
        <BrowserRouter>
          <ThemeProvider theme={themeLight}>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </BrowserRouter>
      </AuthProvider>
    </Suspense>
  </React.StrictMode>,
);
