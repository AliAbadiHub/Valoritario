import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateProfileDto } from './dto/create-Profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createProfile(id: number, createProfileDto: CreateProfileDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user)
      throw new HttpException(
        'User not found, cannot create profile',
        HttpStatus.BAD_REQUEST,
      );
    const newProfile = this.profileRepository.create({
      ...createProfileDto,
      createdAt: new Date(),
    });
    const savedProfile = await this.profileRepository.save(newProfile);
    user.profile = savedProfile;
    return this.userRepository.save(user);
  }

  findAll() {
    return this.profileRepository.find();
  }

  async findOne(id: number): Promise<Profile> {
    return this.profileRepository.findOneBy({ id });
  }

  updateProfile(id: number, updateProfileDetails: UpdateProfileDto) {
    return this.profileRepository.update(
      { id },
      { ...updateProfileDetails, updatedAt: new Date() },
    );
  }

  deleteProfile(id: number) {
    return this.profileRepository.delete({ id });
  }
}
