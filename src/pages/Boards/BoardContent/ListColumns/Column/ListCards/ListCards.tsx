import { Box } from "@mui/material";
import Card from "./Card/Card";

import type { BoardColumnInterface } from "@/interface/boardInterface";

interface ListCardsProps {
  column: BoardColumnInterface;
}

function ListCards(props: ListCardsProps) {
  const { column } = props;
  console.log({ column });
  return (
    <Box
      sx={{
        p: "0 5px ",
        m: "0 5px",
        display: "flex",
        flexDirection: "column",
        gap: 1,
        overflowX: "hidden",
        overflowY: "auto",
        maxHeight: (theme) =>
          `calc(${theme.trello.boardContentHeight} - ${
            theme.trello.columnFooterHeight
          } -
                  ${theme.trello.columnHeaderHeight} -
                  ${theme.spacing(5)})`,
        "&::-webkit-scrollbar-thumb": { backgroundColor: "#ced0da" },
        "&::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "#bfc2cf",
        },
      }}
    >
      {column?.cards.map((card) => (
        <Card
          key={card._id}
          card={card}
          columnId={column._id}
          temporaryHideMedia={card.cover === null ? true : false}
        />
      ))}
      {/* Add more cards as needed */}
    </Box>
  );
}

export default ListCards;
