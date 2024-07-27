import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './service/prisma.service';
import { UserController } from './controller/user.controller';

@Module({
  imports: [],
  controllers: [
    AppController,
    UserController
  ],
  providers: [
    AppService,
    PrismaService
  ],
})
export class AppModule {}
