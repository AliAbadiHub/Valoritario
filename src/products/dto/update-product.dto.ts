import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsString()
  @ApiProperty()
  productName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  brandName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  size: string;

  @IsOptional()
  @ApiProperty({ required: false })
  comments: string;
}
