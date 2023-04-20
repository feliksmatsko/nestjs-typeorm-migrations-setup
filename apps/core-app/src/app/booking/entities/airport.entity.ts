import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Flight } from './flight.entity';

@Entity()
export class Airport {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string;

  @OneToMany(
    () => Flight,
    (flight) => flight.departureAirport,
  )
  departures: Flight[];

  @OneToMany(
    () => Flight,
    (flight) => flight.arrivalAirport,
  )
  arrivals: Flight[];
}
