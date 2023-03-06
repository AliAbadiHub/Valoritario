import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('create')
  @UsePipes(ValidationPipe)
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Get()
  getAllUsers(@Query('limit') limit: number, @Query('offset') offset: number) {
    return this.usersService.findAll(limit, offset);
  }
  // @UseGuards(JwtAuthGuard)
  @Get(':userId')
  findOne(@Param('userId') userId: string) {
    return this.usersService.findOne(+userId);
  }

  // @UseGuards(JwtAuthGuard)
  @Patch(':userId')
  @UsePipes(ValidationPipe)
  async update(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    await this.usersService.updateUser(userId, updateUserDto);
    return updateUserDto;
  }

  // @UseGuards(JwtAuthGuard)
  @Delete(':userId')
  @UsePipes(ValidationPipe)
  async delete(@Param('userId', ParseIntPipe) userId: number) {
    await this.usersService.deleteUser(userId);
  }
}
