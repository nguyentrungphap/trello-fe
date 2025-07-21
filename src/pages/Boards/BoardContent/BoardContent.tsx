import { Box, useColorScheme } from "@mui/material";
import ListColumns from "./ListColumns/ListColumns";

import type {
  BoardCardInterface,
  BoardColumnInterface,
  BoardInterface,
} from "~/interface/boardInterface";

import { mapOrder } from "~/utils/sort";

import { useEffect, useState } from "react";
import { cloneDeep } from "lodash";
import { arrayMove } from "@dnd-kit/sortable";
import {
  DndContext,
  type DragEndEvent,
  // PointerSensor,
  MouseSensor,
  TouchSensor,
  type UniqueIdentifier,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
} from "@dnd-kit/core";

import Column from "./ListColumns/Column/Column";
import Card from "./ListColumns/Column/ListCards/Card/Card";

interface BoardContentProps {
  board: BoardInterface;
}

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: "ACTIVE_DRAG_ITEM_TYPE_COLUMN",
  CARD: "ACTIVE_DRAG_ITEM_TYPE_CARD",
};

function BoardContent(props: BoardContentProps) {
  const { mode } = useColorScheme();
  const { board } = props;
  const [orderedColumns, setOrderedColumns] = useState<BoardColumnInterface[]>(
    []
  );
  const [activeDragItemId, setActiveDragItemId] =
    useState<UniqueIdentifier | null>(null);
  const [activeDragItemType, setActiveDragItemType] = useState<string | null>(
    null
  );
  const [activeDragItemData, setActiveDragItemData] = useState<unknown>(null);

  useEffect(() => {
    setOrderedColumns(mapOrder(board.columns, board.columnOrderIds, "_id"));
  }, [board]);

  const findColumnByCardId = (cardId: string) => {
    return orderedColumns.find((column) =>
      column.cards.map((card) => card._id)?.includes(cardId)
    );
  };

  const handleDragStart = (e: DragEndEvent) => {
    // console.log("handleDragStart", e);
    setActiveDragItemId(e.active?.id || null);
    setActiveDragItemType(
      e.active?.data?.current?.columnId
        ? ACTIVE_DRAG_ITEM_TYPE.CARD
        : ACTIVE_DRAG_ITEM_TYPE.COLUMN
    );
    setActiveDragItemData(e.active?.data?.current);
  };
  // xu ly khi keo card
  const handleDragOver = (e: DragEndEvent) => {
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return;
    console.log("handleDragOver", e);

    const { active, over } = e;
    // dam bao neu khong ton tai active hoac over thi se ko lam j tre tranh lam cash trang web
    if (!active || !over) return;

    const {
      id: activeDraggingCardId,
      data: { current: activeDraggingCardData },
    } = active;
    const {
      id: overCardId,
      data: { current: overCardData },
    } = over;

    const activeColumn = findColumnByCardId(activeDraggingCardId as string);
    const overColumn = findColumnByCardId(overCardId as string);

    if (!activeColumn || !overColumn) return;

    // neu 2 id column khac nhau thi se chay code ben trong de xu li viec keo card tu column nay sang column khac luc keo
    if (activeColumn._id !== overColumn._id) {
      setOrderedColumns((prevColumns) => {
        //find vi tri index cua overcard trong column dich den (active card sap duoc tha)
        const overCartIndex = overColumn?.cards?.findIndex(
          (card) => card._id === overCardId
        );

        //tinh toan cards index moi de biet minh dang nam tren hay duoi 1  phan tu trong column
        // chua hieu code duoi
        let newCardIndex: number;
        const isBelowOverItem =
          active.rect.current.translated &&
          active.rect.current.translated.top > over.rect.top + over.rect.height;

        const modifier = isBelowOverItem ? 1 : 0;
        // ------------------------------------------------------------
        newCardIndex =
          overCartIndex >= 0
            ? overCartIndex + modifier
            : overColumn?.cards?.length + 1;

        console.log("newCardIndex", newCardIndex);
        console.log("isBelowOverItem", isBelowOverItem);
        console.log("modifier", modifier);

        //clone  mang OrderColumnState cu ra 1 mang moi de xu ly data roi cap nhat lai OrderColumnState moi
        const nextColumns = cloneDeep(prevColumns);
        const nextActiveColumn = nextColumns.find(
          (column) => column._id === activeColumn._id
        );
        const nextOverColumn = nextColumns.find(
          (column) => column._id === overColumn._id
        );

        if (nextActiveColumn) {
          //xoa thang card keo qua column khac
          nextActiveColumn.cards = nextActiveColumn.cards.filter(
            (card) => card._id !== activeDragItemId
          );
          //cap nhat lai cardOrderIds
          nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(
            (card) => card._id
          );
        }

        if (nextOverColumn) {
          // kiem tra coi thang card keo co ton tai trong column ko neu co thi xoa
          nextOverColumn.cards = nextOverColumn.cards.filter(
            (card) => card._id !== activeDragItemId
          );
          //them thang card vao column
          nextOverColumn.cards = nextOverColumn.cards.toSpliced(
            newCardIndex,
            0,
            activeDraggingCardData
          );
          //cap nhat lai cardOrderIds
          nextOverColumn.cardOrderIds = nextOverColumn.cards.map(
            (card) => card._id
          );
        }
        return nextColumns;
      });
    }
  };
  const handleDragEnd = (e: DragEndEvent) => {
    // console.log("handleDragEnd", e);
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      console.log("dont run drag card");
      return;
    }

    const { active, over } = e;

    if (!active || !over) return;

    if (active.id !== over?.id) {
      const oldIndex = orderedColumns.findIndex((c) => c._id === active.id);
      const newIndex = orderedColumns.findIndex((c) => c._id === over?.id);
      const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex);
      // const dndOrderedColumnsIds = dndOrderedColumns.map((c) => c._id);
      setOrderedColumns(dndOrderedColumns);
    }

    setActiveDragItemId(null);
    setActiveDragItemType(null);
    setActiveDragItemData(null);
  };

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
  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: "0.5",
        },
      },
    }),
  };

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <Box
        sx={{
          width: "100%",
          bgcolor: () => (mode === "dark" ? "#34495e" : "#1976d2"),
          height: (theme) => theme.trello.boardContentHeight,
          p: "10px 0",
        }}
      >
        <ListColumns columns={orderedColumns} />
        <DragOverlay dropAnimation={dropAnimation}>
          {!activeDragItemType && null}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
            <Column column={activeDragItemData as BoardColumnInterface} />
          )}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && (
            <Card card={activeDragItemData as BoardCardInterface} />
          )}
        </DragOverlay>
      </Box>
    </DndContext>
  );
}

export default BoardContent;
