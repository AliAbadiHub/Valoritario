import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users profiles' })
export class Profile {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

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
}
