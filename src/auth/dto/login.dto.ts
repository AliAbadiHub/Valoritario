import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @ApiProperty({ description: 'Email:' })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'Password:' })
  password: string;
}
