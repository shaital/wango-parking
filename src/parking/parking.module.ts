import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { City } from '../city.entity';
import { ParkingArea } from '../parking-area.entity';
import { ParkingAreaHour } from '../parking-area-hour.entity';
import { ParkingSession } from '../parking-session.entity';
import { User } from '../user.entity';

import { ParkingService } from './parking.service';
import { ParkingController } from './parking.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      City,
      ParkingArea,
      ParkingAreaHour,
      ParkingSession,
      User,
    ]),
  ],
  providers: [ParkingService],
  controllers: [ParkingController],
})
export class ParkingModule {}
