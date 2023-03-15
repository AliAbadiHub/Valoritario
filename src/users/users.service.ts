import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { encodePassword } from 'src/utils/bcrypt.utils';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    // Check if user already exists with this email
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (existingUser) {
      throw new BadRequestException(
        'The email you entered is already registered for Valoritario. If that was you, please sigm in from the account login page, otherwise, choose a different email address to create an account.',
      );
    }

    // Create new user
    const password = encodePassword(createUserDto.password);
    console.log(password);
    const newUser = this.userRepository.create({
      ...createUserDto,
      password,
      createdAt: new Date(),
    });
    return this.userRepository.save(newUser);
  }

  findAll(limit: number, offset: number) {
    return this.userRepository.find({
      relations: ['profile'],
      skip: offset,
      take: limit,
      order: { userId: 'ASC' },
    });
  }

  async findOne(userId: number): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: { userId },
      relations: ['profile'],
    });
    return user || undefined;
  }

  async updateUser(
    userId: number,
    updateUserDetails: UpdateUserDto,
  ): Promise<User> {
    try {
      const existingUser = await this.userRepository.findOneBy({ userId });
      if (!existingUser) {
        throw new Error(`User with ID ${userId} not found`);
      }
      if (
        updateUserDetails.email &&
        updateUserDetails.email !== existingUser.email
      ) {
        throw new Error('Cannot update email');
      }
      if (
        updateUserDetails.email &&
        updateUserDetails.email !== existingUser.email
      ) {
        const existingUserByEmail = await this.userRepository.findOneBy({
          email: updateUserDetails.email,
        });
        if (existingUserByEmail) {
          throw new Error(
            `User with email ${updateUserDetails.email} already exists`,
          );
        }
      }
      if (updateUserDetails.password) {
        updateUserDetails.password = await encodePassword(
          updateUserDetails.password,
        );
      }
      await this.userRepository.update(
        { userId },
        { ...updateUserDetails, updatedAt: new Date() },
      );
      const updatedUser = await this.userRepository.findOneBy({ userId });
      if (!updatedUser) {
        throw new Error('Failed to update user');
      }
      return updatedUser;
    } catch (error) {
      throw new Error(
        `Failed to update user with ID ${userId}: ${error.message}`,
      );
    }
  }

  async deleteUser(userId: number): Promise<void> {
    try {
      const result = await this.userRepository.delete({ userId });
      if (result.affected === 0) {
        throw new Error(`No user found with ID ${userId}`);
      }
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to delete user with ID ${userId}`);
    }
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { email } });
    return user || undefined;
  }
}
