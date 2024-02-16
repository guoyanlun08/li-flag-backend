import { Entity, Column, PrimaryColumn, BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @PrimaryColumn({ name: 'user_id' })
  userID: string;

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
}
