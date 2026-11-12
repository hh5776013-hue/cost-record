import { PartialType } from "@nestjs/mapped-types";

import { CreateCostRecordDto } from "./create-cost-record.dto.js";

export class UpdateCostRecordDto extends PartialType(CreateCostRecordDto) {}
