export type AddItemReqData = {
  moduleId: string;
  order: number;
};

export type UpdateItemReqData = {
  id: number;
  todoValue?: string;
  isCompleted?: number;
  moduleId?: string;
  order?: number;
};
