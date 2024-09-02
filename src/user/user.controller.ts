import { Get, Controller, UseGuards, NotFoundException, HttpException, HttpStatus, HttpCode } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserModel } from 'src/model/user.model';
import { PrismaService } from 'src/service/prisma.service';
interface UserDto {
  id: string;
  role_id: string;
  birthday: string;
  username: string;
}

@Controller('/user')
export class UserController {
  constructor(private prismaSerivce: PrismaService) {}
  @UseGuards(AuthGuard)
  @Get('/')
  async getUser(): Promise<UserModel[] | null> {
    return await this.prismaSerivce.user.findMany();
  }
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Get('/getInfo')
  async getInfo(username: string): Promise<UserDto> {
    try {
      const user = await this.prismaSerivce.user.findFirst({
          where: {
              username: username,
          },
          select: {
              id: true,
              role_id: true,
              birthday: true,
              username: true,
          },
      });

      if (!user) {
          // Handle case when user is not found
          throw new NotFoundException('User not found');
      }

      return user;
  } catch (error) {
      // Handle errors
      throw new HttpException('Error retrieving user information', HttpStatus.INTERNAL_SERVER_ERROR);
  }
  }
}
