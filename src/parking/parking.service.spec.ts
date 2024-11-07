import { Test, TestingModule } from '@nestjs/testing';
import { ParkingService } from './parking.service';

describe('ParkingService', () => {
  let service: ParkingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParkingService],
    }).compile();

    service = module.get<ParkingService>(ParkingService);
  });

  it('should start a parking session', async () => {
    const result = await service.startParking(1, 1);
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('start_time');
  });
});
