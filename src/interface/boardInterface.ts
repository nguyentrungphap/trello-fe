export interface BoardCardInterface {
  _id: string;
  boardId: string;
  columnId: string;
  title: string;
  description: string | null;
  cover: string | null;
  memberIds: string[];
  comments: string[];
  attachments: string[];
}

export interface BoardColumnInterface {
  _id: string;
  boardId: string;
  title: string;
  cardOrderIds: string[];
  cards: BoardCardInterface[];
}

export interface BoardInterface {
  _id: string;
  title: string;
  description: string;
  type: string;
  ownerIds: string[];
  memberIds: string[];
  columnOrderIds: string[];
  columns: BoardColumnInterface[];
}
