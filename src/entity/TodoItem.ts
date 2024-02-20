import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '@/entity/User';

@Entity({ name: 'todo_item' })
export class TodoItem extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'module' })
  module: string; // 应是枚举 'A' | 'B' | 'C' | 'D'

  @Column({ name: 'todo_value', type: 'text' })
  todoValue: string;

  @Column({ name: 'is_completed', type: 'tinyint', default: 0, comment: '0 代表未完成，1 代表已完成' })
  isCompleted: number;

  @Column({ name: 'order' })
  order: number;

  @ManyToOne(() => User, (user) => user.todoItems)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
