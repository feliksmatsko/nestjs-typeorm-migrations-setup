import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { Airport } from './entities/airport.entity';
import { Flight } from './entities/flight.entity';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Flight)
    private readonly flightRepository: Repository<Flight>,
    @InjectRepository(Airport)
    private readonly airportRepository: Repository<Airport>,
  ) {}

  async getFlights(paginationQuery: PaginationQueryDto): Promise<Flight[]> {
    const { limit, offset } = paginationQuery;
    return this.flightRepository.find({
      relations: ['departureAirport', 'arrivalAirport'],
      skip: offset,
      take: limit,
    });
  }

  async getFlightById(id: number): Promise<Flight> {
    const flight = await this.flightRepository.findOne({
      where: { id },
      relations: ['departureAirport', 'arrivalAirport'],
    });

    if (!flight) {
      throw new NotFoundException(`Flight #${ id } not found`);
    }

    return flight;
  }

  async createFlight(createFlightDto: CreateFlightDto): Promise<Flight> {
    const [departureAirport, arrivalAirport] = await Promise.all([
      this.preloadAirportByCode(createFlightDto.departureAirportCode),
      this.preloadAirportByCode(createFlightDto.arrivalAirportCode),
    ]);

    return this.flightRepository.save({
      ...createFlightDto,
      departureAirport,
      arrivalAirport,
    });
  }

  async updateFlight(
    id: number,
    updateFlightDto: UpdateFlightDto,
  ): Promise<Flight> {
    const [departureAirport, arrivalAirport] = await Promise.all([
      updateFlightDto.departureAirportCode && this.preloadAirportByCode(
        updateFlightDto.departureAirportCode,
      ),
      updateFlightDto.arrivalAirportCode && this.preloadAirportByCode(
        updateFlightDto.arrivalAirportCode,
      ),
    ]);

    const flight = await this.flightRepository.preload({
      id,
      ...updateFlightDto,
      departureAirport,
      arrivalAirport,
    });

    if (!flight) {
      throw new NotFoundException(`Flight #${ id } not found`);
    }

    return this.flightRepository.save(flight);
  }

  async deleteFlight(id: number): Promise<void> {
    const flight = await this.getFlightById(id);
    await this.flightRepository.remove(flight);
  }

  private async preloadAirportByCode(code: string): Promise<Airport> {
    const existingAirport = await this.airportRepository.findOne({
      where: { code },
    });

    if (existingAirport) {
      return existingAirport;
    }

    return this.airportRepository.create({ code });
  }
}
