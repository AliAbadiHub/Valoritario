import { Profile } from 'src/profiles/entities/profile.entity';
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

  @Column({ unique: true, nullable: false })
  username: string;

  @Column({ nullable: false })
  password: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column()
  createdAt: Date;

  @Column({ nullable: true })
  updatedAt: Date;

  @OneToOne(() => Profile, (profile) => profile.user, { eager: true })
  profile: Profile;

  @OneToMany(() => ShoppingList, (shoppingList) => shoppingList.user, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'username', referencedColumnName: 'username' })
  shoppingList: ShoppingList;
}
