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
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('profiles')
@UseGuards(JwtAuthGuard)
@Controller('profiles')
export class ProfilesController {
  constructor(private profilesService: ProfilesService) {}

  @Post(':id')
  @UsePipes(ValidationPipe)
  createProfile(
    @Body() createProfileDto: CreateProfileDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.profilesService.createProfile(id, createProfileDto);
  }
  @Get()
  getAllProfiles() {
    return this.profilesService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profilesService.findOne(+id);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  async updateProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    await this.profilesService.updateProfile(id, updateProfileDto);
    return updateProfileDto;
  }

  @Delete(':id')
  @UsePipes(ValidationPipe)
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.profilesService.deleteProfile(id);
  }
}
