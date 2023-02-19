import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePriceDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  price: number;

  @IsString()
  @ApiProperty()
  currency: string;

  @IsString()
  @ApiProperty()
  quantity: string;

  @IsString()
  @ApiProperty()
  location: string;

  @IsString()
  @ApiProperty({ required: false })
  comments: string;

  //   @IsNumber()
  //   @ApiProperty()
  //   supermarketId: number;
}
