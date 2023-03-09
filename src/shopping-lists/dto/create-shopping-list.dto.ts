import {
  IsArray,
  IsNumber,
  IsPositive,
  ValidateNested,
  IsString,
  IsNotEmpty,
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

  @IsString()
  @IsNotEmpty()
  readonly city: string;

  @IsString()
  @IsNotEmpty()
  readonly username: string;
}
