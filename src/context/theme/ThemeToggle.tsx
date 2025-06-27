import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  ListItemIcon, // Thêm dòng này
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';
import { useThemeContext } from './ThemeContext.tsx';
import SunnyIcon from '@mui/icons-material/Sunny';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import ContrastIcon from '@mui/icons-material/Contrast';

export default function ThemeToggle() {
  const { themeMode, setThemeMode } = useThemeContext();

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value as 'light' | 'dark' | 'system';
    setThemeMode(value);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
      <FormControl>
        <InputLabel
          id="demo-simple-select-label"
        >
          Theme
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={themeMode}
          label="Theme"
          onChange={handleChange}
          sx={{
            '& .MuiSelect-select': {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 12,
              padding: '10px',
            },
          }}
        >
          <MenuItem
            value="system"
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
          >
            <ListItemIcon sx={{ width: 16, minWidth: 15, marginRight: 2 }}>
              <ContrastIcon />
            </ListItemIcon>
            System
          </MenuItem>
          <MenuItem
            value="light"
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
          >
            <ListItemIcon sx={{ width: 16, minWidth: 15, marginRight: 2 }}>
              <SunnyIcon />
            </ListItemIcon>
            Light
          </MenuItem>
          <MenuItem
            id='dark'
            value="dark"
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
          >
            <ListItemIcon sx={{ width: 16, minWidth: 15, marginRight: 2 }}>
              <ModeNightIcon />
            </ListItemIcon>
            Dark
          </MenuItem>
        </Select>
      </FormControl>
    </Box >
  );
}