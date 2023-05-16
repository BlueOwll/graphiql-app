import { createTheme } from '@mui/material';

const themeLight = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#2dc8ff',
      contrastText: '#ffffff',
    },
  },
});
export default themeLight;
