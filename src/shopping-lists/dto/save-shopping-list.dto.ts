import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class ShoppingListItemDto {
  @IsString()
  readonly product: string;

  @IsString()
  readonly supermarket: string;

  @IsNumber()
  readonly pricePerProduct: number;

  @IsNumber()
  readonly quantity: number;

  @IsNumber()
  readonly total: number;

  @IsDateString()
  readonly createdAt: Date;
}

export class SavedShoppingListDto {
  @IsString()
  readonly username: string;

  @IsString()
  readonly cityName: string;

  @IsNumber()
  readonly totalPrice: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ShoppingListItemDto)
  readonly items: ShoppingListItemDto[];
}
