import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { User } from './user.entity';
import { City } from './city.entity';
import { ParkingArea } from './parking-area.entity';
import { ParkingAreaHour } from './parking-area-hour.entity';
import { ParkingSession } from './parking-session.entity';

import { AuthModule } from './auth/auth.module';
import { ParkingModule } from './parking/parking.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: +process.env.DB_PORT || 3306,
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || 'root',
      database: process.env.DB_NAME || 'wango',
      charset: 'utf8',
      entities: [User, City, ParkingArea, ParkingAreaHour, ParkingSession],
      //synchronize: true, // Should be false in production
    }),
    TypeOrmModule.forFeature([
      User,
      City,
      ParkingArea,
      ParkingAreaHour,
      ParkingSession,
    ]),
    AuthModule,
    ParkingModule,
  ],
})
export class AppModule {}
