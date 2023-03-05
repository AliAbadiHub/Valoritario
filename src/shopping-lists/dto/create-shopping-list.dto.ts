import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ProductItemDto {
  @IsNumber()
  @IsPositive()
  readonly productId: number;

  @IsNumber()
  @IsPositive()
  readonly quantity: number;
}

export class CreateShoppingListDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductItemDto)
  readonly items: ProductItemDto[];

  @IsNotEmpty()
  readonly createdAt: Date;
}
