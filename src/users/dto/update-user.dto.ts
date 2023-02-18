import { PartialType } from '@nestjs/mapped-types';
import { IsDateString, IsEmail, MinLength } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsEmail()
  email: string;

  @MinLength(4)
  password: string;

  @IsDateString()
  updatedAt: Date;

  constructor() {
    super();
    this.updatedAt = new Date();
  }
}
