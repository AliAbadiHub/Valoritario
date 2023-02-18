import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDefined, IsNotEmpty } from 'class-validator';
export class CreateProfileDto {
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

  @IsNotEmpty()
  @ApiProperty()
  age: number;
}
