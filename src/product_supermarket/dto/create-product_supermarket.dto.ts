import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive } from 'class-validator';

export class CreateProductSupermarketDto {
  @IsNumber()
  @IsPositive()
  @ApiProperty()
  productId: number;

  @IsNumber()
  @IsPositive()
  @ApiProperty()
  supermarketId: number;

  @IsNumber()
  @IsPositive()
  @ApiProperty()
  price: number;
}
