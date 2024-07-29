import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './service/prisma.service';
import { UserController } from './controller/user.controller';
import { AuthController } from './controller/auth.controller';
import { UserModule } from './module/user.module';
import { AuthModule } from './module/auth.module';

@Module({
  imports: [
    UserModule,
    AuthModule
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService,
    PrismaService
  ],
})
export class AppModule {}
