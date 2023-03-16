import { UserProfile } from 'src/profiles/entities/userProfile.entity';
import { ShoppingList } from 'src/shopping-lists/entities/shopping-list.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({ nullable: false })
  password: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: true, unique: true })
  googleId: string;

  @Column()
  createdAt: Date;

  @Column({ nullable: true })
  updatedAt: Date;

  @OneToOne(() => UserProfile, (userProfile) => userProfile.user, {
    eager: true,
  })
  userProfile: UserProfile;

  @OneToMany(() => ShoppingList, (shoppingList) => shoppingList.user, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'username', referencedColumnName: 'username' })
  shoppingList: ShoppingList;
}
