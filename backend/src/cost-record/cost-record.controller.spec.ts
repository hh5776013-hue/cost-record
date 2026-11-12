import { Test, TestingModule } from '@nestjs/testing';
import { CostRecordController } from './cost-record.controller.js';
import { CostRecordService } from './cost-record.service.js';

describe('CostRecordController', () => {
  let controller: CostRecordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CostRecordController],
      providers: [CostRecordService],
    }).compile();

    controller = module.get<CostRecordController>(CostRecordController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
