import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @ApiProperty({ description: 'Username:' })
  username: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'Password:' })
  password: string;
}
