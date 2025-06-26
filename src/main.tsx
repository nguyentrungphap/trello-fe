import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { StyledEngineProvider } from '@mui/material/styles';
import { ThemeProviderCustom } from './theme/ThemeContext.tsx';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProviderCustom>
        <App />
      </ThemeProviderCustom>
    </StyledEngineProvider>
  </StrictMode>
);
