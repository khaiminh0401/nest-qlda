import { Get, Post, Body, Controller } from "@nestjs/common";
import { PrismaService } from "src/service/prisma.service";
import { user as UserModel, Prisma } from '@prisma/client';

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