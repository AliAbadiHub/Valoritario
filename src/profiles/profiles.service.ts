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
  async createProfile(userId: number, createProfileDto: CreateProfileDto) {
    const user = await this.userRepository.findOneBy({ userId });
    if (!user)
      throw new HttpException(
        'User not found, cannot create profile',
        HttpStatus.BAD_REQUEST,
      );
    const profileExists = await this.profileRepository.findOneBy({ user });
    if (profileExists) {
      throw new HttpException(
        'Profile already exists for the given user',
        HttpStatus.BAD_REQUEST,
      );
    }
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

  async findOne(profileId: number): Promise<Profile> {
    return this.profileRepository.findOneBy({ profileId });
  }

  updateProfile(profileId: number, updateProfileDetails: UpdateProfileDto) {
    return this.profileRepository.update(
      { profileId },
      { ...updateProfileDetails, updatedAt: new Date() },
    );
  }

  deleteProfile(profileId: number) {
    return this.profileRepository.delete({ profileId });
  }
}
