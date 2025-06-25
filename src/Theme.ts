import { createTheme } from "@mui/material"
import { red } from "@mui/material/colors"

const Theme = createTheme({
  palette: {
    mode: 'light', // default is light
    primary: {
      main: '#556cd6'
    },
    secondary: {
      main: '#19857b'
    },
    error: {
      main:red.A400,
  },
  text:{
    secondary:'blue'
  }
}
});

export default Theme