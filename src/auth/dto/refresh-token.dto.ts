import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

class RefreshTokenDto {
  @IsNotEmpty()
  @ApiProperty()
  refreshToken: string;
}

export default RefreshTokenDto;
