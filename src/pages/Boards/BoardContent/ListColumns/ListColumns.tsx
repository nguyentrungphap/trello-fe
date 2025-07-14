import { Box, Button } from "@mui/material";
import Column from "./Column/Column";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import type { BoardColumnInterface } from "@/interface/boardInterface";

interface BoardContentProps {
  boardId: string;
  columns: BoardColumnInterface[];
}
function ListColumns(props: BoardContentProps) {
  const { boardId, columns } = props;
  return (
    <Box
      sx={{
        bgcolor: "inherit",
        width: "100%",
        height: "100%",
        display: "flex",
        overflowX: "auto",
        overflowY: "hidden",
        "&::-webkit-scrollbar-track": { m: 2 },
      }}
    >
      {columns.map((column) => {
        return <Column key={column._id} column={column} boardId={boardId} />;
      })}
      <Box
        sx={{
          minWidth: "200px",
          maxWidth: "200px",
          mx: 2,
          borderRadius: "6px",
          height: "fit-content",
          bgcolor: "#ffffff3d",
        }}
      >
        <Button
          startIcon={<NoteAddIcon />}
          sx={{
            color: "white",
            width: "100%",
            justifyContent: "flex-start",
            pl: 2.5,
            py: 1,
          }}
        >
          Add a card
        </Button>
      </Box>
    </Box>
  );
}

export default ListColumns;
