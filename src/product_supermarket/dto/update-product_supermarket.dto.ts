import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPositive } from 'class-validator';
import { CreateProductSupermarketDto } from './create-product_supermarket.dto';

export class UpdateProductSupermarketDto extends PartialType(
  CreateProductSupermarketDto,
) {
  @IsNumber()
  @IsPositive()
  @IsOptional()
  @ApiProperty()
  price?: number;
}
