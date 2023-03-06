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
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RoleMiddleware } from 'src/middlewares/role.middleware';

// @UseGuards(JwtAuthGuard)
@ApiTags('profiles')
@Controller('profiles')
export class ProfilesController {
  constructor(private profilesService: ProfilesService) {}

  @Post(':userId')
  @UsePipes(ValidationPipe)
  createProfile(
    @Body() createProfileDto: CreateProfileDto,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.profilesService.createProfile(userId, createProfileDto);
  }

  @Get()
  getAllProfiles() {
    return this.profilesService.findAll();
  }

  @Get(':profileId')
  findOne(@Param('profileId') profileId: string) {
    return this.profilesService.findOne(+profileId);
  }

  @Patch(':profileId')
  @UsePipes(ValidationPipe)
  async updateProfile(
    @Param('profileId', ParseIntPipe) profileId: number,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    await this.profilesService.updateProfile(profileId, updateProfileDto);
    return updateProfileDto;
  }

  @Delete(':profileId')
  @UsePipes(ValidationPipe)
  async delete(@Param('profileId', ParseIntPipe) profileId: number) {
    await this.profilesService.deleteProfile(profileId);
  }
}
