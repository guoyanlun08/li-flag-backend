import { TodoItem } from '@/entity/TodoItem';
import { User } from '@/entity/User';

import MyError from '@/common/my-error';
import { AddItemReqData, UpdateItemReqData } from '../types/index';
import { CallerInfo } from '@/middleware/authMiddleware';

import { HttpCode } from '@/common/http-code';

class TodoItemService {
  static defaultValue = {
    type: 'paragraph',
    children: [{ text: '' }],
  };

  public async getTodoList(options: { module?: string; isCompleted?: number }) {
    const { module, isCompleted } = options;

    const whereCondition = {};
    if (module) whereCondition['module'] = module;
    if (!isNaN(isCompleted)) whereCondition['isCompleted'] = isCompleted;

    const list = await TodoItem.find({
      where: whereCondition,
    });

    return {
      list,
    };
  }

  public async addTodoItem(addItemReqData: AddItemReqData, caller: CallerInfo) {
    try {
      const { module, order } = addItemReqData;
      const { userId } = caller;

      const user = await User.findOne({
        where: { userId },
      });

      const newTodoItem = await TodoItem.create({
        module,
        order,
        user,
        todoValue: JSON.stringify(TodoItemService.defaultValue),
      });

      await newTodoItem.save();

      return {
        id: newTodoItem.id,
        message: 'todoItem 创建成功',
      };
    } catch (error) {
      throw new MyError('新增 todoItem失败');
    }
  }

  // 修改 item，item内容修改; 已完成; 切换 module; 改变 order
  public async updateTodoItem(updateItemReqData: UpdateItemReqData, caller: CallerInfo) {
    const { id, todoValue, isCompleted, module, order } = updateItemReqData;

    if (!id) {
      throw new MyError(`id未传`, HttpCode.BAD_REQUEST);
    }

    const todoItem = await TodoItem.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!todoItem) {
      throw new MyError(`${id} todoItem不存在`, HttpCode.NOT_FOUND);
    }

    if (caller.userId !== todoItem.user.userId) {
      throw new MyError(`${caller.userId} 无法更新该 todoItem`);
    }

    if (todoValue) {
      let updateTodoValue;
      try {
        updateTodoValue = JSON.parse(todoValue);
      } catch (error) {
        throw new MyError('todoValue error: 传参不是 json', HttpCode.BAD_REQUEST);
      }

      if (!updateTodoValue.hasOwnProperty('type') || !updateTodoValue.hasOwnProperty('children')) {
        throw new MyError('todoValue 结构不对应，外层应只有 type 和 children', HttpCode.BAD_REQUEST);
      }
      todoItem.todoValue = todoValue;
    }

    if (isCompleted !== undefined) todoItem.isCompleted = isCompleted;

    if (module) todoItem.module = module;

    if (order) todoItem.order = order;

    await todoItem.save();

    return {
      message: `${id} todoItem 更新成功`,
    };
  }

  public async deleteTodoItemById(id: number) {
    const { affected } = await TodoItem.delete(id);

    if (!affected) {
      throw new MyError(`删除id: ${id} 不存在`);
    }

    return {
      message: `id: ${id} 删除成功`,
    };
  }
}

export default TodoItemService;
