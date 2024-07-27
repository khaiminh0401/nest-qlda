import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './service/prisma.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private prismaSerivce: PrismaService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post("/login")
  async login(@Body() dataRequest: UserLogin): Promise<string> {
    const user = await this.prismaSerivce.user.findFirst({where: {username: dataRequest.username, password: dataRequest.password}});
    if(!user){
      return "Đăng nhập thất bại";
    }
    return "Đăng nhập thành công";
  }
}
