import { Request, Response } from 'express';

import TodoItemService from '../service/todoItem-service';
import { controller, router } from '@/annotations';

const todoItemService = new TodoItemService();

@controller({ path: '/todoItem', name: '待办' })
class TodoItemController {
  // 获取 itemList
  @router({ method: 'get', path: '/getTodoList' })
  public async getTodoList(req: Request, res: Response) {
    const { module, isCompleted } = req.query as any;

    const result = await todoItemService.getTodoList({
      module,
      isCompleted: Number(isCompleted),
    });

    return result;
  }

  // 新增 todoitem
  @router({ method: 'post', path: '/addTodoItem' })
  public async addTodoItem(req: Request, res: Response) {
    const { body: requestData } = req;

    const result = await todoItemService.addTodoItem(requestData);

    return result;
  }

  // 修改 item，item内容修改; 已完成; 切换 module; 改变 order
  @router({ method: 'post', path: '/updateTodoItem' })
  public async updateTodoItem(req: Request, res: Response) {
    const { body: requsetData } = req;

    const result = await todoItemService.updateTodoItem(requsetData);

    return result;
  }

  // 删除 item
}

export default TodoItemController;
