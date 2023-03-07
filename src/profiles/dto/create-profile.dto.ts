import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDefined, IsISO8601 } from 'class-validator';


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

  @IsISO8601()
  @ApiProperty({ example: '1990-01-01' })
  dateOfBirth: string;
}
