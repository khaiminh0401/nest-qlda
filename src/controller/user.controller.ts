import { Get, Controller } from "@nestjs/common";
import { UserModel } from "src/model/user.model";
import { PrismaService } from "src/service/prisma.service";

@Controller("/user")
export class UserController{
    constructor(
        private prismaSerivce: PrismaService
    ) {}
    @Get("/")
    async getUser(): Promise<UserModel[] | null> {
      return await this.prismaSerivce.user.findMany();
    }

}