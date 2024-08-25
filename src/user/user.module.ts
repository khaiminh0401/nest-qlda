import { Module } from '@nestjs/common';
import { UserController } from 'src/user/user.controller';
import { PrismaService } from 'src/service/prisma.service';
import { UserService } from 'src/user/user.service';

@Module({
  providers: [UserService, PrismaService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
