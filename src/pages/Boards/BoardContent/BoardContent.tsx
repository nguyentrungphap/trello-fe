import { Box, useColorScheme } from "@mui/material";
import ListColumns from "./ListColumns/ListColumns";
import type { BoardInterface } from "@/interface/boardInterface";
import { mapOrder } from "@/utils/sort";

interface BoardContentProps {
  board: BoardInterface;
}

function BoardContent(props: BoardContentProps) {
  const { mode } = useColorScheme();
  const { board } = props;
  const orderedColumns = mapOrder(board.columns, board.columnOrderIds, "_id");
  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: () => (mode === "dark" ? "#34495e" : "#1976d2"),
        height: (theme) => theme.trello.boardContentHeight,
        p: "10px 0",
      }}
    >
      <ListColumns boardId={board._id} columns={orderedColumns} />
    </Box>
  );
}

export default BoardContent;
