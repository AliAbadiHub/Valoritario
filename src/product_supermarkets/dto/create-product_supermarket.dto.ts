import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProductSupermarketDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  supermarketId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  productId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  price: number;
}