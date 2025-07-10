import { Box, useColorScheme } from "@mui/material";
import ListColumns from "./ListColumns/ListColumns";
function BoardContent() {
  const { mode } = useColorScheme();
  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: () => (mode === "dark" ? "#34495e" : "#1976d2"),
        height: (theme) => theme.trello.boardContentHeight,
        p: "10px 0",
      }}
    >
      <ListColumns />
    </Box>
  );
}

export default BoardContent;
