import { Box, FormControl, InputLabel, MenuItem, Select, useColorScheme } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';

function ModeSelect() {
  const { mode, setMode } = useColorScheme();
  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setMode(value as 'light' | 'dark' | 'system');
  };

  return (
    <Box>
      <FormControl >
        <InputLabel id="label-select-dark-light-mode" sx={{ padding: "10px" }}>Mode</InputLabel>
        <Select
          labelId="label-select-dark-light-mode"
          id="select-dark-light-mode"
          value={mode || "light"}
          label="Mode"
          onChange={handleChange}
          sx={{
            '& #select-dark-light-mode': {
              padding: "11.5px",
              paddingRight: "32px",
            },
          }}
        >
          <MenuItem value="light">
            <div style={{ display: 'flex', alignItems: 'center', gap: "8px" }}>
              <LightModeIcon fontSize="small" /> Light
            </div>
          </MenuItem>
          <MenuItem value="dark">
            <div style={{ display: 'flex', alignItems: 'center', gap: "8px" }}>
              <DarkModeIcon fontSize="small" /> Dark
            </div>
          </MenuItem>
          <MenuItem value="system">
            <div style={{ display: 'flex', alignItems: 'center', gap: "8px" }}>
              <SettingsBrightnessIcon fontSize="small" /> System
            </div>
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}

export default ModeSelect