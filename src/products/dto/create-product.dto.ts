import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @ApiProperty()
  productName: string;

  @IsString()
  @ApiProperty()
  productCategory: string;

  @ApiProperty()
  productComment: string;
}
