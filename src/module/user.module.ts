import { Module } from '@nestjs/common';
import { UserController } from 'src/controller/user.controller';
import { UserService } from 'src/service/user.service';

@Module({
    providers: [UserService],
    exports: [UserService],
    controllers: [UserController]
})
export class UserModule {}
