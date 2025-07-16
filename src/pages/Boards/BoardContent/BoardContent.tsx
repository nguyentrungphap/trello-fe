import { Box, useColorScheme } from "@mui/material";
import ListColumns from "./ListColumns/ListColumns";

import type {
  BoardColumnInterface,
  BoardInterface,
} from "~/interface/boardInterface";

import { mapOrder } from "~/utils/sort";

import { useEffect, useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import {
  DndContext,
  type DragEndEvent,
  // PointerSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

interface BoardContentProps {
  board: BoardInterface;
}

function BoardContent(props: BoardContentProps) {
  const { mode } = useColorScheme();
  const { board } = props;
  const [orderedColumns, setOrderedColumns] = useState<BoardColumnInterface[]>(
    []
  );

  // const pointerSensor = useSensor(PointerSensor, {
  //   activationConstraint: { distance: 4 },
  // });
  // yeu cau chuot move 10px thi moi goi event
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { distance: 10 },
  });
  //nhan giu khoang 250ms  va dung sai cam ung 500px thi moi goi event
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: { delay: 250, tolerance: 500 },
  });
  // const sensors = useSensors(pointerSensor);
  //ưu tiên dùng mouseSensor va touchSensor de ci trải nghiệm tốt nhất trên web và mobile
  const sensors = useSensors(mouseSensor, touchSensor);

  useEffect(() => {
    setOrderedColumns(mapOrder(board.columns, board.columnOrderIds, "_id"));
  }, [board]);

  const handleDragEnd = (e: DragEndEvent) => {
    // console.log("handleDragEnd", e);
    const { active, over } = e;

    if (!over) return;

    if (active.id !== over?.id) {
      const oldIndex = orderedColumns.findIndex((c) => c._id === active.id);
      const newIndex = orderedColumns.findIndex((c) => c._id === over?.id);
      const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex);
      // const dndOrderedColumnsIds = dndOrderedColumns.map((c) => c._id);
      setOrderedColumns(dndOrderedColumns);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
      <Box
        sx={{
          width: "100%",
          bgcolor: () => (mode === "dark" ? "#34495e" : "#1976d2"),
          height: (theme) => theme.trello.boardContentHeight,
          p: "10px 0",
        }}
      >
        <ListColumns columns={orderedColumns} />
      </Box>
    </DndContext>
  );
}

export default BoardContent;
