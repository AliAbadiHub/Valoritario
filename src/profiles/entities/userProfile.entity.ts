import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'user_profiles' })
export class UserProfile {
  @PrimaryGeneratedColumn()
  profileId: number;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ nullable: false })
  phoneNumber: string;

  @Column({ nullable: false })
  address: string;

  @Column({ nullable: true })
  dateOfBirth: string;

  @Column({ nullable: false })
  age: number;

  @Column({ nullable: false })
  createdAt: Date;

  @Column({ nullable: true })
  updatedAt: Date;

  @Column({ nullable: true })
  profilePictureUrl: string;

  @OneToOne(() => User, (user) => user.userProfile, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;
}
