import { Injectable } from '@nestjs/common';
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
  createUser(createUserDto: CreateUserDto) {
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
    });
  }

  async findOne(id: number): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { id } });
    return user || undefined;
  }

  async updateUser(id: number, updateUserDetails: UpdateUserDto) {
    if (updateUserDetails.password) {
      updateUserDetails.password = await encodePassword(
        updateUserDetails.password,
      );
    }
    await this.userRepository.update(
      { id },
      { ...updateUserDetails, updatedAt: new Date() },
    );
    return await this.userRepository.findOneBy({ id });
  }

  deleteUser(id: number) {
    return this.userRepository.delete({ id });
  }

  async findUserByUsername(username: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { username } });
    return user || undefined;
  }
}
