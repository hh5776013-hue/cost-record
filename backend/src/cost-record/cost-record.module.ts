import { Module } from "@nestjs/common";
import { CostRecordService } from "./cost-record.service.js";
import { CostRecordController } from "./cost-record.controller.js";

@Module({
  controllers: [CostRecordController],
  providers: [CostRecordService],
})
export class CostRecordModule {}
