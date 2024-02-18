import { Request, Response } from 'express';

import TodoItemService from '../service/todoItem-service';
import { controller, router } from '@/annotations';

const todoItemService = new TodoItemService();

@controller({ path: '/todoItem', name: '待办' })
class TodoItemController {
  // 获取 itemList，通过过滤条件，默认获取全部
  @router({ method: 'get', path: '/getList' })
  public async getItemListByParams(req: Request, res: Response) {
    // await todoItemService.
  }

  // 新增 todoitem
  @router({ method: 'post', path: '/addTodoItem' })
  public async addTodoItem(req: Request, res: Response) {
    const { body: requestData } = req;

    const result = await todoItemService.addTodoItem(requestData);

    return result;
  }

  // 修改 item，item内容修改; 已完成; 切换 module; 改变 order
  // 删除 item
}

export default TodoItemController;
