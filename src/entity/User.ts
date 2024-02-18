import { Entity, Column, PrimaryColumn, BaseEntity, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { TodoItem } from '@/entity/TodoItem';

@Entity({ name: 'user' })
export class User extends BaseEntity {
  // todo: 应该限制数据只能是数字||英文字符||一些特殊符号
  @PrimaryColumn({ name: 'user_id', type: 'varchar' })
  userId: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'nick_name' })
  nickName: string;

  @Column({ name: 'avatar_path', default: '' })
  avatarPath: string;

  @Column({ name: 'last_online_time', default: null })
  lastOnlineTime: Date;

  @CreateDateColumn({ name: 'create_time' })
  createTime: Date;

  @UpdateDateColumn({ name: 'update_time' })
  updateTime: Date;

  @OneToMany(() => TodoItem, (todoItem) => todoItem.user)
  todoItems: TodoItem[];
}
