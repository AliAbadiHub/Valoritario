import { Min } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users profiles' })
export class Profile {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: false })
  address: string;

  @Column({ nullable: true })
  dateOfBirth: string;

  @Column({ nullable: false })
  @Min(16)
  age: number;

  @Column()
  createdAt: Date;

  @Column({ nullable: true })
  updatedAt: Date;

  @OneToOne(() => User, (user) => user.profile)
  user: User;
}
