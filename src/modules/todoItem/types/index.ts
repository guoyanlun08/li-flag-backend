export type AddItemReqData = {
  module: string;
  order: number;
};

export type UpdateItemReqData = {
  id: number;
  todoValue?: string;
  isCompleted?: number;
  module?: string;
  order?: number;
};
