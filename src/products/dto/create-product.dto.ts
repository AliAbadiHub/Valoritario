import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @ApiProperty()
  productName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  brandName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  size: string;

  @IsOptional()
  @ApiProperty({ required: false })
  comments: string;
}
