import { TodoItem } from '@/entity/TodoItem';

class TodoItemService {
  static defaultValue = {
    type: 'paragraph',
    children: [{ text: '' }],
  };
  public async addTodoItem(requestData) {
    try {
      const { module, order } = requestData;
      const newTodoItem = await TodoItem.create({
        module,
        order,
        todoValue: JSON.stringify(TodoItemService.defaultValue),
      });

      await newTodoItem.save();

      return {
        message: 'todoItem 创建成功',
      };
    } catch (error) {
      throw new Error('新增 todoItem失败');
    }
  }
}

export default TodoItemService;
