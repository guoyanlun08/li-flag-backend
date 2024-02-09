import { Entity, Column, PrimaryColumn, BaseEntity } from 'typeorm';

@Entity({ name: 'user' })
export class User extends  BaseEntity {
  @PrimaryColumn({ name: 'user_id' })
  userID: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'nick_name' })
  nickName: string;

  @Column({ name: 'avatar_path' })
  avatarPath: string;
}
