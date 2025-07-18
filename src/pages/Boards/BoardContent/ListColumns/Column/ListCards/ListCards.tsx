import { Box } from "@mui/material";
import Card from "./Card/Card";
function ListCards() {
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
      <Card />
      <Card temporaryHideMedia />
      <Card temporaryHideMedia />
      <Card temporaryHideMedia />
      <Card temporaryHideMedia />
      <Card temporaryHideMedia />
      <Card temporaryHideMedia />
      <Card temporaryHideMedia />
      <Card temporaryHideMedia />
      <Card temporaryHideMedia />
    </Box>
  );
}

export default ListCards;
