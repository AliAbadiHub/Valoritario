import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { comparePasswords } from 'src/utils/bcrypt.utils';

@Injectable()
@ApiTags('Authentication')
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<User | undefined> {
    const userDB = await this.userService.findUserByUsername(username);
    if (userDB) {
      const matched = comparePasswords(password, userDB.password);
      if (matched) {
        console.log('User validation success!');
        return userDB;
      } else {
        console.log('Passwords do not match');
        return null;
      }
    }

    console.log('User validation failed!');
    return null;
  }

  generateToken(user: any) {
    return {
      access_token: this.jwtService.sign({
        name: user.name,
        sub: user.id,
      }),
    };
  }
}
