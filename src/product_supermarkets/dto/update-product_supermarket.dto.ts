import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateProductSupermarketDto } from './create-product_supermarket.dto';

export class UpdateProductSupermarketDto extends PartialType(
  CreateProductSupermarketDto,
) {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  productId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  supermarketId: number;
}
