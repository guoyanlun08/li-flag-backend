import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryColumn({ name: 'user_id' })
  userID: number;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'nick_name' })
  nickName: string;

  @Column({ name: 'avatar_path' })
  avatarPath: string;
}
