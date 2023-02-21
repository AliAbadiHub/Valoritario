import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @ApiProperty()
  productName: string;

  @IsString()
  @ApiProperty()
  productBrand: string;

  @IsString()
  @ApiProperty()
  productSize: string;

  @IsString()
  @ApiProperty()
  productCategory: string;

  @IsString()
  @ApiProperty()
  productComment: string;
}
