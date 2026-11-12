import { Module } from "@nestjs/common";
import { AppController } from "./app.controller.js";
import { AppService } from "./app.service.js";
import { PrismaModule } from "./prisma/prisma.module.js";
import { CostRecordModule } from "./cost-record/cost-record.module.js";

@Module({
  imports: [PrismaModule, CostRecordModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
