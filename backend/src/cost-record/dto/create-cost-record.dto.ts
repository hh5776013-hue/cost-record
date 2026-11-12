import {
  IsString,
  IsNumber,
  IsOptional,
  IsDateString,
  Min,
} from "class-validator";

import { Type } from "class-transformer";

export class CreateCostRecordDto {
  @IsString()
  title: string;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  amount: number;

  @IsString()
  category: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDateString()
  date?: string;
}
