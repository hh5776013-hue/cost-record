import { Injectable, NotFoundException } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service.js";
import { CreateCostRecordDto } from "./dto/create-cost-record.dto.js";
import { UpdateCostRecordDto } from "./dto/update-cost-record.dto.js";

@Injectable()
export class CostRecordService {
  constructor(private prisma: PrismaService) {}

  // CREATE
  async create(dto: CreateCostRecordDto) {
    return this.prisma.costRecord.create({
      data: {
        title: dto.title,
        amount: dto.amount,
        category: dto.category,
        description: dto.description,
        date: dto.date ? new Date(dto.date) : undefined,
      },
    });
  }

  // READ ALL
  async findAll() {
    return this.prisma.costRecord.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  // READ ONE
  async findOne(id: number) {
    const record = await this.prisma.costRecord.findUnique({
      where: { id },
    });

    if (!record) {
      throw new NotFoundException("Cost record not found");
    }

    return record;
  }

  // UPDATE
  async update(id: number, dto: UpdateCostRecordDto) {
    await this.findOne(id);

    return this.prisma.costRecord.update({
      where: { id },
      data: {
        title: dto.title,
        amount: dto.amount,
        category: dto.category,
        description: dto.description,
        date: dto.date ? new Date(dto.date) : undefined,
      },
    });
  }

  // DELETE
  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.costRecord.delete({
      where: { id },
    });
  }
}
