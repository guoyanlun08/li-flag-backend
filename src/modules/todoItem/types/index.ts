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
