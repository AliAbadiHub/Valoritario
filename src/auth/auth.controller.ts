import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Ip,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import RefreshTokenDto from './dto/refresh-token.dto';
import { GoogleAuthGuard } from './guards/google-auth.guard';

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
        body.email,
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

  @Get('google/login')
  @UseGuards(AuthGuard('google'))
  async googleLogin() {}

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  googleCallback(@Req() req, @Res() res) {
    console.log('req.user:', req.user); // add this line
    const accessToken = req.user.accessToken;
    const refreshToken = req.user.refreshToken;
    res.redirect(
      `/dashboard?accessToken=${accessToken}&refreshToken=${refreshToken}`,
    );
  }
}
