import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { LoginService } from './service/user.service';
import { UserChangePassword, UserLogin } from './model/user.model';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private loginService: LoginService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post("/login")
  async login(@Body() dataRequest: UserLogin): Promise<string> {
    const result = await this.loginService.checkLogin(dataRequest);
    if(!result){
      return "Đăng nhập thất bại";
    }
    return "Đăng nhập thành công";
  }

  @Put("/change-password")
  async changePassword(@Body() dataRequest: UserChangePassword): Promise<string> {
    try {
      await this.loginService.changePassword(dataRequest);
      return "Lưu thành công";
    } catch (error) {
      return "Lưu thất bại";
    }

  }
}
