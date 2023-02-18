import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'user deets' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
