import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';

export class UpdateProfileDto {
  @IsString()
  @ApiProperty()
  firstName: string;

  @IsString()
  @ApiProperty()
  lastName: string;

  @IsString()
  @ApiProperty()
  phoneNumber: string;

  @IsDefined()
  @IsString()
  @ApiProperty()
  address: string;

  @IsString()
  @ApiProperty()
  dateOfBirth: string;

}
