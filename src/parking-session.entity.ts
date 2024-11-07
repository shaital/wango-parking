import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { ParkingArea } from './parking-area.entity';

@Entity('parking_sessions')
export class ParkingSession {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.parkingSessions, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => ParkingArea, (parkingArea) => parkingArea.parkingSessions, {
    eager: true,
  })
  @JoinColumn({ name: 'parking_area_id' })
  parkingArea: ParkingArea;

  @Column({ type: 'timestamp' })
  startTime: Date;

  @Column({ type: 'timestamp', nullable: true })
  stopTime: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;
}
