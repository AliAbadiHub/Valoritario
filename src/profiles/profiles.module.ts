import { Module } from '@nestjs/common';
import { UserProfilesService } from './profiles.service';
import { UserProfilesController } from './profiles.controller';
import { UserProfile } from './entities/userProfile.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserProfile, User])],
  controllers: [UserProfilesController],
  providers: [UserProfilesService],
})
export class UserProfilesModule {}
