import { createTheme } from '@mui/material';

const themeLight = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#a9a9a9',
    },
    secondary: {
      main: '#ffa500',
    },
    error: {
      main: '#ff2d17',
    },
    warning: {
      main: '#ffff00',
    },
    background: {
      default: '#d3d3d3',
    },
  },
});
export default themeLight;
