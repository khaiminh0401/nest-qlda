import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthController } from 'src/auth/auth.controller';
import { AuthService } from 'src/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants/auth.constants';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
        global: true,
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [
    AuthService
  ],
  controllers: [AuthController],
})
export class AuthModule {}
