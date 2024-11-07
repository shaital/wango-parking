import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ParkingArea } from './parking-area.entity';

@Entity('cities')
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => ParkingArea, (parkingArea) => parkingArea.city)
  parkingAreas: ParkingArea[];
}
