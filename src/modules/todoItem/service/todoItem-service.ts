import { TodoItem } from '@/entity/TodoItem';

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

  public async addTodoItem(requestData: { module: string; order: number }) {
    try {
      const { module, order } = requestData;

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
}

export default TodoItemService;
