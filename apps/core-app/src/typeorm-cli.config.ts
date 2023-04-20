import { DataSource } from 'typeorm';
import { Airport } from './app/booking/entities/airport.entity';
import { Flight } from './app/booking/entities/flight.entity';
import { SchemaSync1681995609103 } from './migrations/1681995609103-SchemaSync';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'pass123',
  database: 'postgres',
  entities: [Flight, Airport],
  migrations: [SchemaSync1681995609103],
});
