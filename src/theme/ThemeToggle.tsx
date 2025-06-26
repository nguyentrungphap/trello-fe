import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
} from '@mui/material';
import { useThemeContext } from './ThemeContext';

export default function ThemeToggle() {
  const { themeMode, setThemeMode } = useThemeContext();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as 'light' | 'dark' | 'system';
    setThemeMode(value);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
      <FormControl component="fieldset">
        <FormLabel component="legend" sx={{ textAlign: 'center' }}>
          Theme
        </FormLabel>
        <RadioGroup
          row
          value={themeMode}
          onChange={handleChange}
          aria-label="theme toggle"
          name="theme-toggle-group"
        >
          <FormControlLabel value="system" control={<Radio />} label="System" />
          <FormControlLabel value="light" control={<Radio />} label="Light" />
          <FormControlLabel value="dark" control={<Radio />} label="Dark" />
        </RadioGroup>
      </FormControl>
    </Box>
  );
}
