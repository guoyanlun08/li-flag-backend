import type { TodoItem } from '@/entity/TodoItem';

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
  moduleId: string;
  index: number;
};

export type updateTodoOrderAfterDragReqData = {
  source: dragItem;
  destination: dragItem;
};
