export type getItemListReqData = {
  moduleId?: string;
  completed?: number;
  today?: number;
  startTime?: string;
  endTime?: string;
  isSkip?: number;
  page?: number;
};

export type AddItemReqData = {
  moduleId: string;
  order: number;
};

export type UpdateItemReqData = {
  id: number;
  todoValue?: string;
  completed?: number;
  moduleId?: string;
  order?: number;
};

type dragItem = {
  id: number;
  moduleId: string;
  index: number;
};

export type updateTodoOrderAfterDragReqData = {
  source: dragItem;
  destination: dragItem;
};
