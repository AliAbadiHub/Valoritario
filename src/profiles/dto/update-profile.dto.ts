import { PartialType } from '@nestjs/mapped-types';
import { IsDefined, IsNumber, IsString } from 'class-validator';
import { CreateProfileDto } from './create-profile.dto';

export class UpdateProfileDto extends PartialType(CreateProfileDto) {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsNumber()
  age: number;

  @IsDefined()
  @IsString()
  address: string;
}
