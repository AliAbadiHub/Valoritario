import { IsEmail, MinLength, IsString, IsDateString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(4)
  username: string;

  @IsEmail()
  email: string;

  @MinLength(4)
  password: string;

  @IsDateString()
  createdAt: Date;

  constructor() {
    this.createdAt = new Date();
  }
}
