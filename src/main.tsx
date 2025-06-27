import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { StyledEngineProvider, ThemeProvider, CssBaseline } from '@mui/material';
import { ThemeProviderCustom, useThemeContext } from './context/theme/ThemeContext.tsx';
import { lightTheme, darkTheme } from './context/theme/Theme';
import {
  RouterProvider,
} from "react-router";
import router from './routes/index.tsx';

function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { currentTheme } = useThemeContext();
  const appliedTheme = currentTheme === 'dark' ? darkTheme : lightTheme;
  return (
    <ThemeProvider theme={appliedTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProviderCustom>
        <ThemeWrapper>
          <RouterProvider router={router} />
        </ThemeWrapper>
      </ThemeProviderCustom>
    </StyledEngineProvider>
  </StrictMode>
);