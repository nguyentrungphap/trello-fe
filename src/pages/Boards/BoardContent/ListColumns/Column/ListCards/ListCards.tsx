import { Box } from "@mui/material";
import Card from "./Card/Card";

import type { BoardCardInterface } from "~/interface/boardInterface";
import {
  verticalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";

interface ListCardsProps {
  cards: BoardCardInterface[];
}

function ListCards(props: ListCardsProps) {
  const { cards } = props;
  return (
    <SortableContext
      items={cards.map((item) => item._id)}
      strategy={verticalListSortingStrategy}
    >
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
        {cards.map((card) => (
          <Card key={card._id} card={card} />
        ))}
      </Box>
    </SortableContext>
  );
}

export default ListCards;
