import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Airport } from './airport.entity';

@Entity()
export class Flight {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  airline: string;

  @Column({ unique: true })
  flightNumber: string;

  @ManyToOne(() => Airport, airport => airport.departures, { cascade: true })
  @JoinColumn()
  departureAirport: Airport;

  @ManyToOne(() => Airport, airport => airport.arrivals, { cascade: true })
  @JoinColumn()
  arrivalAirport: Airport;

  @Column()
  departureTime: Date;

  @Column()
  arrivalTime: Date;

  @Column()
  duration: number;

  @Column()
  price: number;
}
