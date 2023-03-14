import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/profiles/entities/profile.entity';
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
    // Check if the email already exists in the database
    const existingUser = await this.userRepository.findOneBy({
      email: createUserDto.email,
    });
    if (existingUser) {
      throw new ConflictException(
        'The email account you used is already registered, either log in using that email and the correct password, or choose a different email account to sign up with',
      );
    }

    // Encode the password and create the new user
    const password = await encodePassword(createUserDto.password);
    const newUser = this.userRepository.create({
      ...createUserDto,
      password,
      createdAt: new Date(),
    });

    return this.userRepository.save(newUser);
  }

  findAll(limit: number, offset: number) {
    return this.userRepository.find({
      select: ['userId', 'email', 'createdAt', 'updatedAt'],
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
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    try {
      const existingUser = await this.userRepository.findOneBy({ userId });
      if (!existingUser) {
        throw new Error(`User with ID ${userId} not found`);
      }
      existingUser.password = await encodePassword(updateUserDto.password);
      existingUser.updatedAt = new Date();
      const updatedUser = await this.userRepository.save(existingUser);
      return updatedUser;
    } catch (error) {
      throw new Error(
        `Failed to update password for user with ID ${userId}: ${error.message}`,
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

  async createUserFromGoogleProfile(profile: any): Promise<User> {
    const user = new User();
    user.email = profile.email;
    user.password = ''; // set a dummy password
    user.createdAt = new Date();
    user.profile = new Profile(); // create a new Profile for the user
    user.profile.firstName = profile.given_name;
    user.profile.lastName = profile.family_name;
    user.profile.pictureUrl = profile.picture;
    await this.userRepository.save(user);
    return user;
  }
}
