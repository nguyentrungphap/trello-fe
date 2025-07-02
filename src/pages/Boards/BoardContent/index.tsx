import { Box } from '@mui/material'
import theme from '../../../context/theme/Theme'

function BoardContent() {
  return (
    <Box sx={{ width: '100%', backgroundColor: 'primary.main', height: `calc(100vh - ${theme.trello.appBarHeight} - ${theme.trello.boardBarHeight})` }}>Board Content</Box>

  )
}

export default BoardContent