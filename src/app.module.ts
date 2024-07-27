import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './service/prisma.service';
import { UserController } from './controller/user.controller';
import { LoginService } from './service/login.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    UserController
  ],
  providers: [
    AppService,
    LoginService,
    PrismaService
  ],
})
export class AppModule {}
