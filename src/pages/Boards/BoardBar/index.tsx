import { Box } from '@mui/material'
import theme from '../../../context/theme/Theme'

function BoardBar() {
  return (
    <Box sx={{
      backgroundColor: 'primary.dark',
      width: '100%',
      height: `${theme.trello.boardBarHeight}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: 'primary.contrastText',
    }}>
      Board Bar
    </Box>
  )
}

export default BoardBar