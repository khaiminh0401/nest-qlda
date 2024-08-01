import { Module } from '@nestjs/common';
import { UserController } from 'src/controller/user.controller';
import { PrismaService } from 'src/service/prisma.service';
import { UserService } from 'src/service/user.service';

@Module({
    providers: [UserService, PrismaService],
    exports: [UserService],
    controllers: [UserController]
})
export class UserModule {}
