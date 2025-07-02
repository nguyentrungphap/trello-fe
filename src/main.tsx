import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './context/theme/Theme';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Root element with id 'root' not found");
}
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
