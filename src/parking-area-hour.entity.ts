import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ParkingArea } from './parking-area.entity';

@Entity('parking_area_hours')
export class ParkingAreaHour {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ParkingArea, (parkingArea) => parkingArea.parkingHours)
  @JoinColumn({ name: 'parking_area_id' })
  parkingArea: ParkingArea;

  @Column({ type: 'time' })
  startTime: string;

  @Column({ type: 'time' })
  endTime: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;
}
