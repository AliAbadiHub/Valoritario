import { PartialType } from '@nestjs/mapped-types';
import { CreatePriceDto } from './create-price.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UpdatePriceDto extends PartialType(CreatePriceDto) {
  @ApiProperty()
  @IsNumber()
  price: number;

  @IsString()
  @ApiProperty()
  currency: string;

  @IsString()
  @ApiProperty()
  quantity: string;

  @IsString()
  @ApiProperty()
  location: string;

  @IsString()
  @ApiProperty({ required: false })
  comments: string;

  //   @IsNumber()
  //   @ApiProperty()
  //   supermarketId: number;
}
