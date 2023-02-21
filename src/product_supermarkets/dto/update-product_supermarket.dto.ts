import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { CreateProductSupermarketDto } from './create-product_supermarket.dto';

export class UpdateProductSupermarketDto extends PartialType(
  CreateProductSupermarketDto,
) {
  @ApiProperty()
  @IsNumber()
  price: number;
}
