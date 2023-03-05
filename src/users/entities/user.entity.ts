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
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column()
  createdAt: Date;

  @Column({ nullable: true })
  updatedAt: Date;

  @Column({ default: 'user' })
  role: string;

  @OneToOne(() => Profile, (profile) => profile.user)
  profile: Profile;

  @OneToMany(() => ShoppingList, (shoppingList) => shoppingList.user, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'username', referencedColumnName: 'username' })
  shoppingList: ShoppingList;
}
