import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";
import { useColorScheme } from "@mui/material/styles";

function ModeSelect() {
  const { mode, setMode } = useColorScheme();
  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setMode(value as "light" | "dark" | "system");
  };

  return (
    <Box>
      <FormControl>
        <InputLabel
          id="label-select-dark-light-mode"
          sx={{
            color: "white",
            "&.Mui-focused": {
              color: "white",
            },
          }}
        >
          Mode
        </InputLabel>
        <Select
          labelId="label-select-dark-light-mode"
          id="select-dark-light-mode"
          value={mode || "light"}
          label="Mode"
          onChange={handleChange}
          sx={{
            color: "white",
            "& .MuiSelect-icon": {
              color: "white",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
          }}
          size="small"
        >
          <MenuItem value="light">
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <LightModeIcon fontSize="small" /> Light
            </div>
          </MenuItem>
          <MenuItem value="dark">
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <DarkModeIcon fontSize="small" /> Dark
            </div>
          </MenuItem>
          <MenuItem value="system">
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <SettingsBrightnessIcon fontSize="small" /> System
            </div>
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default ModeSelect;
