import {
  Body,
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Ip,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import RefreshTokenDto from './dto/refresh-token.dto';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({
    description: 'User authenticated successfully',
    schema: {
      properties: {
        access_token: { type: 'string' },
        refresh_token: { type: 'string' },
      },
    },
  })
  async login(@Req() request, @Ip() ip: string, @Body() body: LoginDto) {
    try {
      const { accessToken, refreshToken } = await this.authService.login(
        body.username,
        body.password,
        {
          ipAddress: ip,
          userAgent: request.headers['user-agent'],
        },
      );
      return { accessToken, refresh_token: refreshToken };
    } catch (err) {
      if (err instanceof UnauthorizedException) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }
      throw err;
    }
  }

  @Post('refresh')
  async refreshToken(@Body() body: RefreshTokenDto) {
    return this.authService.refresh(body.refreshToken);
  }

  @Delete('logout')
  async logout(@Body() body: RefreshTokenDto) {
    return this.authService.logout(body.refreshToken);
  }
}
