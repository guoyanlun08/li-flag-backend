import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '@/entity/User';

@Entity({ name: 'todo_item' })
export class TodoItem extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'moduleId' })
  moduleId: string; // 应是枚举 'A' | 'B' | 'C' | 'D'

  @Column({ name: 'todo_value', type: 'text' })
  todoValue: string;

  @Column({ name: 'is_completed', type: 'tinyint', default: 0, comment: '0 代表未完成，1 代表已完成' })
  completed: number;

  @Column({ name: 'order' })
  order: number;

  @CreateDateColumn({ name: 'create_time', type: 'timestamp' })
  createTime: Date;

  @UpdateDateColumn({ name: 'update_time', type: 'timestamp' })
  updateTime: Date;

  @ManyToOne(() => User, (user) => user.todoItems)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
