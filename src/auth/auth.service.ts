import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  /**
   * Đăng nhập
   */
  async signIn(username: string, pass: string): Promise<any> {
    try {
      const data = await this.usersService.checkLogin({
        username: username,
        password: pass,
      });
      if (!data.isValid) {
        throw new UnauthorizedException();
      }
      const payload = { sub: data.result.id, username: data.result.username };
      return {
        access_token: await this.jwtService.signAsync(payload),
        username: data.result.username
      };
    } catch (error) {
      throw new HttpException('error', 500);
    }
  }
}
