import { Request, Response } from 'express';

import TodoItemService from '../service/todoItem-service';
import { controller, router } from '@/annotations';

const todoItemService = new TodoItemService();

@controller({ path: '/todoItem', name: '待办' })
class TodoItemController {
  // 获取 itemList
  @router({ method: 'get', path: '/getTodoList' })
  public async getTodoList(req: Request, res: Response) {
    const { moduleId, completed, today = 0 } = req.query as any;

    const result = await todoItemService.getTodoList({
      moduleId,
      completed: Number(completed),
      today: Number(today),
    });

    return result;
  }

  // 新增 todoitem
  @router({ method: 'post', path: '/addTodoItem' })
  public async addTodoItem(req: Request, res: Response) {
    const { body: requestData } = req;
    const { caller } = res.locals;

    const result = await todoItemService.addTodoItem(requestData, caller);

    return result;
  }

  // 修改 item，item内容修改; 已完成; 切换 moduleId; 改变 order
  @router({ method: 'post', path: '/updateTodoItem' })
  public async updateTodoItem(req: Request, res: Response) {
    const { body: requsetData } = req;
    const { caller } = res.locals;

    const result = await todoItemService.updateTodoItem(requsetData, caller);

    return result;
  }

  // 删除 item
  @router({ method: 'post', path: '/deleteTodoItemById' })
  public async deleteTodoItemById(req: Request, res: Response) {
    const { body: requsetData } = req;

    const result = await todoItemService.deleteTodoItemById(requsetData.id);

    return result;
  }

  @router({ method: 'put', path: '/updateTodoOrderAfterDrag' })
  public async updateTodoOrderAfterDrag(req: Request, res: Response) {
    const { body: requestData } = req;
    const result = await todoItemService.updateTodoOrderAfterDrag(requestData);

    return result;
  }
}

export default TodoItemController;
