import { Module } from '@nestjs/common';
import { UserModule } from './user.module';
import { AuthController } from 'src/controller/auth.controller';
import { AuthService } from 'src/service/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants/auth.constants';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/guard/auth.guard';

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
    AuthService,
    {
        provide: APP_GUARD,
        useClass: AuthGuard,
    },    
  ],
  controllers: [AuthController],
})
export class AuthModule {}
