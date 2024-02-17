import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '@/entity/User';

@Entity({ name: 'todo_item' })
export class TodoItem {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'module' })
  module: string; // 应是枚举 'A' | 'B' | 'C' | 'D'

  @Column({ name: 'todo_text', type: 'text' })
  todoText: string;

  @Column({ name: 'is_completed' })
  isCompleted: boolean;

  @ManyToOne(() => User, (user) => user.todoItems)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
