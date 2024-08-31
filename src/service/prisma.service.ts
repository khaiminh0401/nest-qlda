import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect().then(r=>{
      console.log("Prisma connect successfully");
    })
    .catch(s=>{
      console.log("Prisma connect fail");
    });
  }
  async onModuleDestroy() {
    await this.$disconnect();
  }
}