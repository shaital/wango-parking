import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ParkingSession } from './parking-session.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  full_name: string;

  @Column()
  address: string;

  @Column()
  car_plate_number: string;

  @OneToMany(() => ParkingSession, (parkingSession) => parkingSession.user)
  parkingSessions: ParkingSession[];
}
