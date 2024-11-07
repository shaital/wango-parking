import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ParkingService } from './parking.service';

@Controller('parking')
export class ParkingController {
  constructor(private readonly parkingService: ParkingService) {}

  @Post('start')
  async startParking(
    @Body('userId') userId: number,
    @Body('parkingAreaId') parkingAreaId: number,
  ) {
    return this.parkingService.startParking(userId, parkingAreaId);
  }

  @Post('stop')
  async stopParking(@Body('sessionId') sessionId: number) {
    return this.parkingService.stopParking(sessionId);
  }

  @Get('user/:userId')
  async getAllParking(@Param('userId') userId: number) {
    return this.parkingService.getUserParkingSessions(userId);
  }
  @Get('cities')
  async getAllCities() {
    return this.parkingService.getAllCities();
  }

  @Get('city/:cityId/areas')
  async getParkingAreasByCity(@Param('cityId') cityId: number) {
    return this.parkingService.getParkingAreasByCity(cityId);
  }
}
