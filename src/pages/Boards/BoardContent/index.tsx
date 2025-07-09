import { Box, useColorScheme } from "@mui/material";
import theme from "@/context/theme";

function BoardContent() {
  const { mode } = useColorScheme();

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: () => (mode === "dark" ? "#34495e" : "#1976d2"),
        height: `calc(100vh - ${theme.trello.appBarHeight} - ${theme.trello.boardBarHeight})`,
      }}
    >
      Board Content
    </Box>
  );
}

export default BoardContent;
