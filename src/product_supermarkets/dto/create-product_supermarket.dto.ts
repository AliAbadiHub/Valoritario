import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateProductSupermarketDto {
  @ApiProperty()
  @IsNumber()
  price: number;
}
