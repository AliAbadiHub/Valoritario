import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CreateSupermarketDto } from './create-supermarket.dto';

export class UpdateSupermarketDto extends PartialType(CreateSupermarketDto) {
  @IsString()
  @ApiProperty()
  supermarketName: string;

  @IsString()
  @ApiProperty()
  city: string;

  @ApiProperty()
  supermarketComment: string;
}
