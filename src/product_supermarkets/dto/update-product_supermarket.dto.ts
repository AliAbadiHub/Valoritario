import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateProductSupermarketDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  price: number;
}