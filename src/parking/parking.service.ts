import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { ParkingSession } from '../parking-session.entity';
import { ParkingArea } from '../parking-area.entity';
import { User } from '../user.entity';
import { City } from '../city.entity';
import { ParkingAreaHour } from '../parking-area-hour.entity';
import { log } from 'console';

@Injectable()
export class ParkingService {
  constructor(
    @InjectRepository(ParkingSession)
    private parkingSessionRepository: Repository<ParkingSession>,
    @InjectRepository(ParkingArea)
    private parkingAreaRepository: Repository<ParkingArea>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(City)
    private cityRepository: Repository<City>,
    @InjectRepository(ParkingAreaHour)
    private parkingAreaHourRepository: Repository<ParkingAreaHour>,
  ) {}

  async startParking(userId: number, parkingAreaId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const parkingArea = await this.parkingAreaRepository.findOne({
      where: { id: parkingAreaId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (!parkingArea) {
      throw new NotFoundException('Parking area not found');
    }

    const parkingSession = this.parkingSessionRepository.create({
      user,
      parkingArea,
      startTime: new Date(),
      price: 0,
    });

    return this.parkingSessionRepository.save(parkingSession);
  }

  async stopParking(sessionId: number) {
    const session = await this.parkingSessionRepository.findOne({
      where: { id: sessionId },
    });
    if (session) {
      const endTime = new Date();
      session.stopTime = endTime;
      session.price = await this.calculatePrice(
        session.startTime,
        endTime,
        session.parkingArea.id,
      );
      return this.parkingSessionRepository.save(session);
    }
  }

  async getUserParkingSessions(userId: number) {
    return await this.parkingSessionRepository.find({
      where: {
        user: { id: userId },
      },
      relations: ['user', 'parkingArea'],
    });
  }

  private async calculatePrice(
    startTime: Date,
    stopTime: Date,
    parkingAreaId: number,
  ): Promise<number> {
    const startTimeFormatted = startTime.toISOString().slice(11, 16); // HH:mm
    const stopTimeFormatted = stopTime.toISOString().slice(11, 16); // HH:mm

    // Fetch the parking area hours that fall within the start and stop time range
    const parkingAreaHours = await this.parkingAreaHourRepository.find({
      where: [
        {
          parkingArea: { id: parkingAreaId },
        },
      ],
      relations: ['parkingArea'],
    });

    if (!parkingAreaHours) {
      throw new Error('No parking hours found for this parking area');
    }


    let totalPrice = 0;

    let currentTime = new Date(startTime);

    while (currentTime < stopTime) {
      const applicableRate = this.getRateForTime(currentTime, parkingAreaHours);

      const nextHour = new Date(currentTime);
      nextHour.setHours(currentTime.getHours() + 1);

      let blockDurationInMillis =
        Math.min(stopTime.getTime(), nextHour.getTime()) -
        currentTime.getTime();
      blockDurationInMillis = blockDurationInMillis / (1000 * 3600);

      totalPrice += blockDurationInMillis * applicableRate;

      currentTime = nextHour;
    }

    return totalPrice;
  }

  private getRateForTime(
    currentTime: Date,
    parkingAreaHours: ParkingAreaHour[],
  ): number {
    const currentTimeString = currentTime.toTimeString().substring(0, 5);

    for (const parkingAreaHour of parkingAreaHours) {

      const { startTime, endTime, price } = parkingAreaHour;

      if (this.isTimeInRange(currentTimeString, startTime, endTime)) {
        return price;
      }
    }
  }

  private isTimeInRange(
    currentTime: string,
    startTime: string,
    endTime: string,
  ): boolean {
    if (startTime <= endTime) {
      return currentTime >= startTime && currentTime < endTime;
    } else {
      return currentTime >= startTime || currentTime < endTime;
    }
  }

  async getAllCities() {
    return this.cityRepository.find();
  }

  async getParkingAreasByCity(cityId: number) {
    return this.parkingAreaRepository.find({
      where: {
        city: { id: cityId },
      },
    });
  }
}
