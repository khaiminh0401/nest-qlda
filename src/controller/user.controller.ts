import { Get, Controller, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/guard/auth.guard";
import { UserModel } from "src/model/user.model";
import { PrismaService } from "src/service/prisma.service";

@Controller("/user")
export class UserController{
    constructor(
        private prismaSerivce: PrismaService
    ) {}
    @UseGuards(AuthGuard)
    @Get("/")
    async getUser(): Promise<UserModel[] | null> {
      return await this.prismaSerivce.user.findMany();
    }

}