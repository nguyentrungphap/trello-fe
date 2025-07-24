import { Box, useColorScheme } from "@mui/material";
import ListColumns from "./ListColumns/ListColumns";

import type {
  BoardCardInterface,
  BoardColumnInterface,
  BoardInterface,
} from "~/interface/boardInterface";

import { mapOrder } from "~/utils/sort";

import { useCallback, useEffect, useRef, useState } from "react";
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
  closestCorners,
  pointerWithin,
  rectIntersection,
  getFirstCollision,
  type CollisionDetection,
  type Active,
  type ClientRect,
  type Collision,
} from "@dnd-kit/core";

import Column from "./ListColumns/Column/Column";
import Card from "./ListColumns/Column/ListCards/Card/Card";
import type { DroppableContainer, RectMap } from "@dnd-kit/core/dist/store";
import type { Coordinates } from "@dnd-kit/core/dist/types";

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
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] = useState<
    BoardColumnInterface | null | undefined
  >(null);

  // diem va cham cuoi cung  truoc do
  const lastOverId = useRef<Collision | null>(null);
  useEffect(() => {
    setOrderedColumns(mapOrder(board.columns, board.columnOrderIds, "_id"));
  }, [board]);

  const findColumnByCardId = (cardId: string) => {
    return orderedColumns.find((column) =>
      column.cards.map((card) => card._id)?.includes(cardId)
    );
  };

  const handleDragStart = (e: DragEndEvent) => {
    setActiveDragItemId(e.active?.id || null);
    setActiveDragItemType(
      e.active?.data?.current?.columnId
        ? ACTIVE_DRAG_ITEM_TYPE.CARD
        : ACTIVE_DRAG_ITEM_TYPE.COLUMN
    );
    setActiveDragItemData(e.active?.data?.current);
    if (e.active?.data?.current?.columnId) {
      setOldColumnWhenDraggingCard(findColumnByCardId(e.active?.id as string));
    }
  };
  // xu ly khi keo card
  const handleDragOver = (e: DragEndEvent) => {
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return;

    const { active, over } = e;
    // dam bao neu khong ton tai active hoac over thi se ko lam j tre tranh lam cash trang web
    if (!active || !over) return;

    const {
      id: activeDraggingCardId,
      data: { current: activeDraggingCardData },
    } = active;
    const {
      id: overCardId,
      // data: { current: overCardData },
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
        // let newCardIndex: number;
        const isBelowOverItem =
          active.rect.current.translated &&
          active.rect.current.translated.top > over.rect.top + over.rect.height;

        const modifier = isBelowOverItem ? 1 : 0;
        // ------------------------------------------------------------
        const newCardIndex =
          overCartIndex >= 0
            ? overCartIndex + modifier
            : overColumn?.cards?.length + 1;

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
            activeDraggingCardData as BoardCardInterface
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
    const { active, over } = e;
    if (!active || !over) return;

    ///xu ly keo tha card
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      const {
        id: activeDraggingCardId,
        data: { current: activeDraggingCardData },
      } = active;
      const {
        id: overCardId,
        // data: { current: overCardData },
      } = over;

      const activeColumn = findColumnByCardId(activeDraggingCardId as string);
      const overColumn = findColumnByCardId(overCardId as string);

      if (!activeColumn || !overColumn) return;

      if (oldColumnWhenDraggingCard?._id !== overColumn._id) {
        setOrderedColumns((prevColumns) => {
          //find vi tri index cua overcard trong column dich den (active card sap duoc tha)
          const overCartIndex = overColumn?.cards?.findIndex(
            (card) => card._id === overCardId
          );

          //tinh toan cards index moi de biet minh dang nam tren hay duoi 1  phan tu trong column
          // chua hieu code duoi
          // let newCardIndex: number;
          const isBelowOverItem =
            active.rect.current.translated &&
            active.rect.current.translated.top >
              over.rect.top + over.rect.height;

          const modifier = isBelowOverItem ? 1 : 0;
          // ------------------------------------------------------------
          const newCardIndex =
            overCartIndex >= 0
              ? overCartIndex + modifier
              : overColumn?.cards?.length + 1;

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

            //cap nhat lai du lieu trong columnId trong card
            const rebuild_activeDraggingCardData = {
              ...(activeDraggingCardData as BoardCardInterface),
              columnId: nextOverColumn._id,
            };

            //them thang card vao column theo vi tri index
            nextOverColumn.cards = nextOverColumn.cards.toSpliced(
              newCardIndex,
              0,
              rebuild_activeDraggingCardData
            );

            //cap nhat lai cardOrderIds
            nextOverColumn.cardOrderIds = nextOverColumn.cards.map(
              (card) => card._id
            );
          }
          return nextColumns;
        });
      } else {
        const oldCardIndex = oldColumnWhenDraggingCard?.cards?.findIndex(
          (c) => c._id === activeDragItemId
        );
        const newCardIndex = overColumn?.cards?.findIndex(
          (c) => c._id === overCardId
        );
        const dndOrderedCards = arrayMove(
          oldColumnWhenDraggingCard?.cards,
          oldCardIndex,
          newCardIndex
        );

        setOrderedColumns((prevColumns) => {
          const nextColumns = cloneDeep(prevColumns);

          //find column dang tha
          const targetColumn = nextColumns.find(
            (column) => column._id === overColumn._id
          ) as BoardColumnInterface;

          //cap nhat lau card va cardOrderIds
          targetColumn.cards = dndOrderedCards;
          targetColumn.cardOrderIds = dndOrderedCards.map((card) => card._id);
          return nextColumns;
        });
      }
    }

    //xu ly keo tha column
    if (
      activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN &&
      active.id !== over?.id
    ) {
      const oldColumnIndex = orderedColumns.findIndex(
        (c) => c._id === active.id
      );
      const newColumnIndex = orderedColumns.findIndex(
        (c) => c._id === over?.id
      );
      const dndOrderedColumns = arrayMove(
        orderedColumns,
        oldColumnIndex,
        newColumnIndex
      );
      // const dndOrderedColumnsIds = dndOrderedColumns.map((c) => c._id);
      setOrderedColumns(dndOrderedColumns);
    }

    //clear useState
    setActiveDragItemId(null);
    setActiveDragItemType(null);
    setActiveDragItemData(null);
    setOldColumnWhenDraggingCard(null);
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

  // args = arguments = Cac doi so , tham so
  const collisionDetectionStrategy: CollisionDetection = useCallback(
    (args: {
      active: Active;
      collisionRect: ClientRect;
      droppableRects: RectMap;
      droppableContainers: DroppableContainer[];
      pointerCoordinates: Coordinates | null;
    }): Collision[] => {
      if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
        return closestCorners({ ...args });
      }

      const pointerIntersections = pointerWithin(args);
      const intersections = pointerIntersections?.length
        ? pointerIntersections
        : rectIntersection(args);

      const overId = getFirstCollision(intersections);

      if (overId) {
        lastOverId.current = overId;
        return [
          {
            id: overId.id,
          },
        ];
      }

      return lastOverId.current ? [{ id: lastOverId.current.id }] : [];
    },
    [activeDragItemType]
  );

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      //dung thang closestCorners se bi bug flickering + sai lech du lieu
      // collisionDetection={closestCorners}

      //custom thuat toan va cham
      collisionDetection={collisionDetectionStrategy}
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
