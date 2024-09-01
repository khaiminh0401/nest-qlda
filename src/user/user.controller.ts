import { Get, Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserModel } from 'src/model/user.model';
import { PrismaService } from 'src/service/prisma.service';

@Controller('/user')
export class UserController {
  constructor(private prismaSerivce: PrismaService) {}
  @UseGuards(AuthGuard)
  @Get('/')
  async getUser(): Promise<UserModel[] | null> {
    return await this.prismaSerivce.user.findMany();
  }

  @UseGuards(AuthGuard)
  @Get('/getInfo')
  async getInfo(username: string): Promise<any> {
    return await this.prismaSerivce.user.findFirst({
      where: {
        username: username,
      },
      select: {
        id: true,
        role_id: true,
        birthday: true,
        username: true,
      },
    });
  }
}
