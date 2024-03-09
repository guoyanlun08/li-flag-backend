import moment from 'moment';
import { Between } from 'typeorm';
import { TodoItem } from '@/entity/TodoItem';
import { User } from '@/entity/User';

import MyError from '@/common/my-error';
import { AddItemReqData, UpdateItemReqData, updateTodoOrderAfterDragReqData } from '../types/index';
import { CallerInfo } from '@/middleware/authMiddleware';
import { isTody } from '@/utils/date';

import { HttpCode } from '@/common/http-code';

class TodoItemService {
  static defaultValue = [
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ];

  public async getTodoList(options: { moduleId?: string; completed?: number; today?: number }) {
    const { moduleId, completed, today } = options;

    const whereCondition = {};
    if (moduleId) whereCondition['moduleId'] = moduleId;
    if (!isNaN(completed)) whereCondition['completed'] = completed;
    if (today) {
      whereCondition['createTime'] = Between(moment().startOf('day').toDate(), moment().endOf('day').toDate());
    }

    const list = await TodoItem.find({
      where: whereCondition,
    });

    return {
      list,
    };
  }

  public async addTodoItem(addItemReqData: AddItemReqData, caller: CallerInfo) {
    try {
      const { moduleId, order } = addItemReqData;
      const { userId } = caller;

      const user = await User.findOne({
        where: { userId },
      });

      const newTodoItem = await TodoItem.create({
        moduleId,
        order,
        user,
        todoValue: JSON.stringify(TodoItemService.defaultValue),
      });

      await newTodoItem.save();

      const respNewItem = { ...newTodoItem };
      delete respNewItem.user;

      return {
        newTodoItem: respNewItem,
      };
    } catch (error) {
      throw new MyError('新增 todoItem失败');
    }
  }

  // 修改 item，item内容修改; 已完成; 切换 moduleId; 改变 order
  public async updateTodoItem(updateItemReqData: UpdateItemReqData, caller: CallerInfo) {
    const { id, todoValue, completed, moduleId, order } = updateItemReqData;

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

    // item => value 文本的改变
    if (todoValue) {
      let updateTodoValue;
      try {
        updateTodoValue = JSON.parse(todoValue);
      } catch (error) {
        throw new MyError('todoValue error: 传参不是 json', HttpCode.BAD_REQUEST);
      }

      if (!updateTodoValue[0].hasOwnProperty('type') || !updateTodoValue[0].hasOwnProperty('children')) {
        throw new MyError('todoValue 结构不对应，外层应只有 type 和 children', HttpCode.BAD_REQUEST);
      }
      todoItem.todoValue = todoValue;
    }

    // item => completed 是否已完成的改变
    if (completed !== undefined) todoItem.completed = completed;

    // item => moduleId 模块的改变
    if (moduleId) todoItem.moduleId = moduleId;

    // item => order 顺序的改变
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

  // 拖拽后，更新 module todoList的 order
  public async updateTodoOrderAfterDrag(updateTodoOrderAfterDragReqData: updateTodoOrderAfterDragReqData) {
    try {
      const { source, destination } = updateTodoOrderAfterDragReqData;

      // 同个 module 拖拽逻辑
      if (source.moduleId === destination.moduleId) {
        const [sourceTodoItem, destinationTodoItem] = await Promise.all([
          TodoItem.findOneBy({ id: source.id }),
          TodoItem.findOneBy({ id: destination.id }),
        ]);
        // 交换 order
        sourceTodoItem.order = destination.index;
        destinationTodoItem.order = source.index;

        sourceTodoItem.save();
        destinationTodoItem.save();

        return {
          sourceItem: sourceTodoItem,
          destinationItem: destinationTodoItem,
        };
      }

      // 不同 module 拖拽逻辑
      const [dragTodoItem, sourceModuleList, destinationModuleList] = await Promise.all([
        TodoItem.findOneBy({ id: source.id }),
        TodoItem.findBy({
          moduleId: source.moduleId,
          createTime: Between(moment().startOf('day').toDate(), moment().endOf('day').toDate()),
        }),
        TodoItem.findBy({
          moduleId: destination.moduleId,
          createTime: Between(moment().startOf('day').toDate(), moment().endOf('day').toDate()),
        }),
      ]);

      // 更换拖拽项 module
      dragTodoItem.moduleId = destination.moduleId;
      destinationModuleList.splice(destination.index, 0, dragTodoItem);
      destinationModuleList.forEach((item, index) => {
        item.order = index;
      });

      TodoItem.save(destinationModuleList);

      return {
        destinationList: destinationModuleList,
      };
    } catch (error) {
      throw new MyError('updateTodoOrderAfterDrag 更新失败');
    }
  }
}

export default TodoItemService;
