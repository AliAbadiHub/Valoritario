import { Inject, Injectable } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from 'src/users/users.service';
import { comparePasswords } from 'src/utils/bcrypt.utils';

@Injectable()
@ApiTags('Authentication')
export class AuthService {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: UsersService,
  ) {}

  async validateUser(username: string, password: string) {
    console.log('inside validateUser');
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
}
