import { Box, useColorScheme } from "@mui/material";
import ListColumns from "./ListColumns/ListColumns";
import type { BoardInterface } from "@/interface/boardInterface";

interface BoardContentProps {
  board: BoardInterface;
}

function BoardContent(props: BoardContentProps) {
  const { mode } = useColorScheme();
  const { board } = props;
  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: () => (mode === "dark" ? "#34495e" : "#1976d2"),
        height: (theme) => theme.trello.boardContentHeight,
        p: "10px 0",
      }}
    >
      <ListColumns board={board} />
    </Box>
  );
}

export default BoardContent;
