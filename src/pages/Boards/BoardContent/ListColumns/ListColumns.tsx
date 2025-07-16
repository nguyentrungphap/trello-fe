import { Box, Button } from "@mui/material";
import Column from "./Column/Column";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import type { BoardColumnInterface } from "~/interface/boardInterface";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

interface BoardContentProps {
  columns: BoardColumnInterface[];
}
function ListColumns(props: BoardContentProps) {
  const { columns } = props;
  return (
    <SortableContext
      items={columns.map((item) => item._id)}
      strategy={horizontalListSortingStrategy}
    >
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
          return <Column key={column._id} column={column} />;
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
    </SortableContext>
  );
}

export default ListColumns;
