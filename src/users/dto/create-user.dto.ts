import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @ApiProperty()
  email: string;

  @MinLength(4)
  @ApiProperty()
  password: string;
}
