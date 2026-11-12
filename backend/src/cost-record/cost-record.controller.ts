import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Param,
  ParseIntPipe,
} from "@nestjs/common";

import { CostRecordService } from "./cost-record.service.js";
import { CreateCostRecordDto } from "./dto/create-cost-record.dto.js";
import { UpdateCostRecordDto } from "./dto/update-cost-record.dto.js";

@Controller("cost-records")
export class CostRecordController {
  constructor(private readonly service: CostRecordService) {}

  @Post()
  create(@Body() dto: CreateCostRecordDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateCostRecordDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
