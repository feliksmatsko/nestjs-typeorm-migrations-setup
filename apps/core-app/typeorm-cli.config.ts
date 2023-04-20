import { DataSource } from 'typeorm';
import { Airport } from './src/app/booking/entities/airport.entity';
import { Flight } from './src/app/booking/entities/flight.entity';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'pass123',
  database: 'postgres',
  entities: [Flight, Airport],
  migrations: [],
});
