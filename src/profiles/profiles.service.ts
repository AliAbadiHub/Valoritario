import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateProfileDto } from './dto/create-Profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UserProfile } from './entities/userProfile.entity';

function calculateAge(birthDateString: string): number {
  const birthDate = new Date(birthDateString);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    return age - 1;
  }
  return age;
}
@Injectable()
export class UserProfilesService {
  constructor(
    @InjectRepository(UserProfile)
    private userProfileRepository: Repository<UserProfile>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async createProfile(userId: number, createProfileDto: CreateProfileDto) {
    const user = await this.userRepository.findOneBy({ userId });
    if (!user)
      throw new HttpException(
        'User not found, cannot create profile',
        HttpStatus.BAD_REQUEST,
      );
    const profileExists = await this.userProfileRepository.findOneBy({ user });
    if (profileExists) {
      throw new HttpException(
        'Profile already exists for the given user',
        HttpStatus.BAD_REQUEST,
      );
    }
    const newProfile = this.userProfileRepository.create({
      ...createProfileDto,
      age: calculateAge(createProfileDto.dateOfBirth),
      createdAt: new Date(),
    });
    const savedProfile = await this.userProfileRepository.save(newProfile);
    user.userProfile = savedProfile;
    return this.userRepository.save(user);
  }

  findAll() {
    return this.userProfileRepository.find();
  }

  async findOne(profileId: number): Promise<UserProfile> {
    return this.userProfileRepository.findOneBy({ profileId });
  }

  async updateProfile(
    profileId: number,
    updateProfileDetails: UpdateProfileDto,
  ): Promise<UserProfile> {
    const profile = await this.userProfileRepository.findOneBy({ profileId });
    if (!profile) {
      throw new HttpException(
        'Profile not found, cannot update profile',
        HttpStatus.NOT_FOUND,
      );
    }
    this.userProfileRepository.merge(profile, updateProfileDetails);
    await this.userProfileRepository.save(profile);
    return Promise.resolve(profile);
  }

  deleteProfile(profileId: number) {
    return this.userProfileRepository.delete({ profileId });
  }
}
