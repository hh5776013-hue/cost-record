import { Test, TestingModule } from '@nestjs/testing';
import { CostRecordService } from './cost-record.service.js';

describe('CostRecordService', () => {
  let service: CostRecordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CostRecordService],
    }).compile();

    service = module.get<CostRecordService>(CostRecordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
