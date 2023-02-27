import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { RefreshToken } from './entities/refresh-token.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    @Inject(CACHE_MANAGER) private readonly cacheManager,
  ) {}

  async login(
    username: string,
    password: string,
    values: { userAgent: string; ipAddress: string },
  ): Promise<{ accessToken: string; refreshToken: string } | undefined> {
    const user = await this.usersService.findUserByUsername(username);
    if (!user) {
      return undefined;
    }
    if (!(await compare(password, user.password))) {
      return undefined;
    }
    const { accessToken, refreshToken } = await this.newRefreshAndAccessToken(
      user,
      values,
    );
    await this.cacheManager.set(
      `val_generated:${refreshToken}`,
      user.id,
      3600, // set the TTL of the cache to 1 hour (3600 seconds)
    );
    return { accessToken, refreshToken };
  }

  async refresh(refreshToken: string): Promise<string | undefined> {
    const userId = await this.cacheManager.get(`val_generated:${refreshToken}`);
    if (!userId) {
      return undefined;
    }
    const user = await this.usersService.findOne(userId);
    if (!user) {
      return undefined;
    }
    const accessToken = this.jwtService.sign({ userId: user.id });
    return accessToken;
  }

  async logout(refreshToken: string): Promise<void> {
    await this.cacheManager.del(`val_generated:${refreshToken}`);
  }

  private async newRefreshAndAccessToken(
    user: User,
    values: { userAgent: string; ipAddress: string },
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const refreshObject = new RefreshToken({
      id: Math.random().toString(36).substring(2, 15),
      ...values,
      userId: user.id,
    });
    const refreshToken = refreshObject.sign();
    return {
      refreshToken,
      accessToken: this.jwtService.sign({ userId: user.id }),
    };
  }
}
