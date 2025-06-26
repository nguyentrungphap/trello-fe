import { CssBaseline, ThemeProvider } from '@mui/material';
import { useThemeContext } from './theme/ThemeContext';
import { lightTheme, darkTheme } from './theme/Theme';
import ThemeToggle from './theme/ThemeToggle';

function App() {
  const { currentTheme } = useThemeContext();
  const appliedTheme = currentTheme === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={appliedTheme}>
      <CssBaseline />
      <ThemeToggle />
    </ThemeProvider>
  );
}

export default App;
