import { HttpException, Injectable, OnModuleInit } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from './prisma.service';
import { UserChangePassword, UserLogin } from 'src/model/user.model';

@Injectable()
export class LoginService implements OnModuleInit {
  constructor(private prismaSerivce: PrismaService) {}
  onModuleInit() {}

  async hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    return hash;
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
  }

  async checkLogin(dataRequest: UserLogin): Promise<boolean> {
    const user = await this.prismaSerivce.user.findFirst({
      where: {
        username: dataRequest.username,
      },
      select: {
        username: true,
        password: true,
      },
    });
    return this.comparePassword(dataRequest.password, user.password);
  }

  async changePassword(dataRequest: UserChangePassword): Promise<void> {
    const newPassword = (
      await this.hashPassword(dataRequest.password)
    ).toString();
    this.prismaSerivce.user
      .update({
        where: {
          id: dataRequest.id,
        },
        data: {
          password: newPassword,
        },
      })
      .catch((e) => {
        throw new Error('Lỗi');
      });
  }
}
