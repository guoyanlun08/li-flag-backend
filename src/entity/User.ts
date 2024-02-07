import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// todo: 模板，需要修改的
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;
}
