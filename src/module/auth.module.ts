import { Module } from '@nestjs/common';
import { UserModule } from './user.module';
import { AuthController } from 'src/controller/auth.controller';
import { AuthService } from 'src/service/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants/auth.constants';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
        global: true,
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
