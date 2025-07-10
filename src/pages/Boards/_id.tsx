import AppBar from "@/components/AppBar/AppBar";
import BoardContent from "./BoardContent/BoardContent";
import BoardBar from "./BoardBar/BoardBar";

function Board() {
  return (
    <>
      <AppBar />
      <BoardBar />
      <BoardContent />
    </>
  );
}

export default Board;
