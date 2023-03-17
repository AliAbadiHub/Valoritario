import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { UserProfilesService } from './userProfiles.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CurrentUser } from 'src/utils/current-user.decorator';

@UseGuards(JwtAuthGuard)
@ApiTags('profiles')
@Controller('profiles')
export class UserProfilesController {
  constructor(private userProfilesService: UserProfilesService) {}

  @Post(':userId')
  @UsePipes(ValidationPipe)
  createProfile(
    @Body() createProfileDto: CreateProfileDto,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.userProfilesService.createProfile(userId, createProfileDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('upload-profile-picture')
  @UseInterceptors(
    FileInterceptor('profilePicture', {
      storage: diskStorage({
        destination: './profile-pictures',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${file.originalname}-${uniqueSuffix}`);
        },
      }),
    }),
  )
  async uploadProfilePicture(@UploadedFile() file, @CurrentUser() user) {
    const userProfile = await this.userProfilesService.findOne(
      user.GOOGLE_CLIENT_ID,
    );
    if (!userProfile) {
      throw new HttpException('User profile not found', HttpStatus.NOT_FOUND);
    }
    userProfile.profilePictureUrl = file.filename;
    await this.userProfilesService.updateProfile(
      userProfile.profileId,
      userProfile,
    );
    return { message: 'Profile picture uploaded successfully' };
  }

  @Get()
  getAllProfiles() {
    return this.userProfilesService.findAll();
  }

  @Get(':profileId')
  findOne(@Param('profileId') profileId: string) {
    return this.userProfilesService.findOne(+profileId);
  }

  @Get('profile')
  getProfile(@CurrentUser() user: any) {
    return user;
  }

  @Patch(':profileId')
  @UsePipes(ValidationPipe)
  async updateProfile(
    @Param('profileId', ParseIntPipe) profileId: number,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    await this.userProfilesService.updateProfile(profileId, updateProfileDto);
    return updateProfileDto;
  }

  @Delete(':profileId')
  @UsePipes(ValidationPipe)
  async delete(@Param('profileId', ParseIntPipe) profileId: number) {
    await this.userProfilesService.deleteProfile(profileId);
  }
}
