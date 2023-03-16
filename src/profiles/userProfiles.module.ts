import { Module } from '@nestjs/common';
import { UserProfilesService } from './userProfiles.service';
import { UserProfilesController } from './userProfiles.controller';
import { UserProfile } from './entities/userProfile.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserProfile, User])],
  controllers: [UserProfilesController],
  providers: [UserProfilesService],
})
export class UserProfilesModule {}
