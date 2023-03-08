import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateSupermarketDto {
  @IsString()
  @ApiProperty()
  supermarketName: string;

  @IsString()
  @ApiProperty()
  city: string;

  @ApiProperty()
  supermarketComment: string;
}
