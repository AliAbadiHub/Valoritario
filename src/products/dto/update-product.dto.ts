import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsString()
  @ApiProperty()
  productName: string;

  @IsString()
  @ApiProperty()
  productCategory: string;

  @ApiProperty()
  productComment: string;
}
