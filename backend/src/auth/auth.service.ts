import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { UserDocument } from '../users/schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(user: UserDocument) {
    const payload = {
      sub: user._id,
      username: user.username,
      isAdmin: user.isAdmin,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(
    username: string,
    password: string,
  ): Promise<UserDocument | null> {
    try {
      const user = await this.usersService.findUserByUsername(username);
      if (user && (await bcrypt.compare(password, user.passwordHash))) {
        return user;
      }
      return null;
    } catch (e) {
      throw e;
    }
  }
}
