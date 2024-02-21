import { TodoItem } from '@/entity/TodoItem';
import { AddItemReqData, UpdateItemReqData } from '../types/index';

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

  public async addTodoItem(addItemReqData: AddItemReqData) {
    try {
      const { module, order } = addItemReqData;

      const newTodoItem = await TodoItem.create({
        module,
        order,
        todoValue: JSON.stringify(TodoItemService.defaultValue),
      });

      await newTodoItem.save();

      return {
        id: newTodoItem.id,
        message: 'todoItem 创建成功',
      };
    } catch (error) {
      throw new Error('新增 todoItem失败');
    }
  }

  // 修改 item，item内容修改; 已完成; 切换 module; 改变 order
  public async updateTodoItem(updateItemReqData: UpdateItemReqData) {
    const { id, todoValue, isCompleted, module, order } = updateItemReqData;
    const todoItem = await TodoItem.findOne({
      where: { id },
    });

    if (todoValue) {
      try {
        const updateTodoValue = JSON.parse(todoValue); // 验证是否 json
        if (!updateTodoValue.hasOwnProperty('type') || !updateTodoValue.hasOwnProperty('children')) {
          throw new Error('todoValue 结构不对应，外层应只有 type 和 children');
        }
        todoItem.todoValue = todoValue;
      } catch (error) {
        throw new Error(`todoValue error: ${error instanceof SyntaxError ? '传参不是 json' : error.message}`);
      }
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
    try {
      const { affected } = await TodoItem.delete(id);

      if (!affected) {
        throw new Error(`删除id: ${id} 不存在`);
      }

      return {
        message: `id: ${id} 删除成功`,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default TodoItemService;
