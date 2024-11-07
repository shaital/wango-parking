import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { City } from './city.entity';
import { ParkingSession } from './parking-session.entity';
import { ParkingAreaHour } from './parking-area-hour.entity';

@Entity('parking_areas')
export class ParkingArea {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => City, (city) => city.parkingAreas)
  @JoinColumn({ name: 'city_id' })
  city: City;

  @OneToMany(
    () => ParkingSession,
    (parkingSession) => parkingSession.parkingArea,
  )
  parkingSessions: ParkingSession[];

  @OneToMany(
    () => ParkingAreaHour,
    (parkingAreaHour) => parkingAreaHour.parkingArea,
  )
  parkingHours: ParkingAreaHour[];
}
