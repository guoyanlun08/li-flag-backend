import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
