import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateSupermarketDto {
  @IsString()
  @ApiProperty()
  supermarketName: string;

  @ApiProperty()
  supermarketComment: string;
}
