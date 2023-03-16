import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { Profile, Strategy } from 'passport-google-oauth20';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { Cache } from 'cache-manager';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService,
    @Inject('CACHE_MANAGER') private readonly cacheManager: Cache,
  ) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ['profile', 'email'],
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ): Promise<any> {
    const user: User = await this.usersService.findOrCreateGoogleUser(profile);

    // Save tokens in Redis
    await this.cacheManager.set(
      `access_token:${user.userId}`,
      accessToken,
      3600,
    );
    await this.cacheManager.set(
      `refresh_token:${user.userId}`,
      refreshToken,
      1209600,
    ); // 2 weeks
    return user;
  }
}
