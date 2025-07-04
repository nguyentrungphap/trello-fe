import { extendTheme } from "@mui/material/styles";
import { teal, deepOrange, cyan, orange } from "@mui/material/colors";

const theme = extendTheme({
  trello: {
    appBarHeight: "58px",
    boardBarHeight: "58px",
  },
  colorSchemes: {
    light: {
      palette: {
        primary: teal,
        secondary: deepOrange,
      },
    },
    dark: {
      palette: {
        primary: cyan,
        secondary: orange,
      },
    },
  },
  colorSchemeSelector: "data",
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => {
          return {
            color: theme.palette.primary.main,
            fontSize: "0.875rem",
          };
        },
      },
    },
  },
});

export default theme;
