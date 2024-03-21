import { Entity, Column, PrimaryColumn, BaseEntity, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { TodoItem } from '@/entity/TodoItem';

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @PrimaryColumn({ name: 'user_id', type: 'varchar' })
  userId: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'nick_name' })
  nickName: string;

  @Column({ name: 'avatar_path', default: '' })
  avatarPath: string;

  @Column({ name: 'last_online_time', type: 'timestamp', default: null })
  lastOnlineTime: Date;

  @CreateDateColumn({ name: 'create_time', type: 'timestamp' })
  createTime: Date;

  @UpdateDateColumn({ name: 'update_time', type: 'timestamp' })
  updateTime: Date;

  @OneToMany(() => TodoItem, (todoItem) => todoItem.user)
  todoItems: TodoItem[];
}
