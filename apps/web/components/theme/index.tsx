import { createTheme } from '@mui/material';
import styles from '../../styles/_variables.module.scss';
import { red } from '@mui/material/colors';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: red[400],
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: (themeParam) => ({
        body:
          themeParam.palette.mode === 'dark'
            ? themeParam.palette.background.default
            : null,
      }),
    },
  },
  shape: {
    borderRadius: Number(styles.defaultBorderRadius),
  },
  typography: {
    allVariants: {
      fontFamily: styles.defaultFontFamily,
    },
  },
});
