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

@ApiTags('profiles')
@Controller('profiles')
export class ProfilesController {
  constructor(private profilesService: ProfilesService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':id')
  @UsePipes(ValidationPipe)
  createProfile(
    @Body() createProfileDto: CreateProfileDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.profilesService.createProfile(id, createProfileDto);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  getAllProfiles() {
    return this.profilesService.findAll();
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profilesService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @UsePipes(ValidationPipe)
  async updateProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    await this.profilesService.updateProfile(id, updateProfileDto);
    return updateProfileDto;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @UsePipes(ValidationPipe)
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.profilesService.deleteProfile(id);
  }
}
