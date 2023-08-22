import { AppProps } from 'next/app';
import './styles.scss';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from '../components/theme';
import { Provider } from 'react-redux';
import store from '../store/store';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <main className="app">
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </Provider>
      </main>
    </>
  );
}

export default CustomApp;
