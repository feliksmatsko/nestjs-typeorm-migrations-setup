import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { BookingService } from './booking.service';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';

@Controller('booking')
export class BookingController {
  constructor(
    private readonly bookingService: BookingService,
  ) {}

  @Get()
  findAllFlights(@Query() paginationQuery: PaginationQueryDto) {
    return this.bookingService.getFlights(paginationQuery);
  }

  @Get(':id')
  findOneFlight(@Param('id') id: number) {
    return this.bookingService.getFlightById(id);
  }

  @Post()
  createFlight(@Body() createFlightDto: CreateFlightDto) {
    return this.bookingService.createFlight(createFlightDto);
  }

  @Patch(':id')
  updateFlight(
    @Param('id') id: number,
    @Body() updateFlightDto: UpdateFlightDto,
  ) {
    return this.bookingService.updateFlight(id, updateFlightDto);
  }

  @Delete(':id')
  removeFlight(@Param('id') id: number) {
    return this.bookingService.deleteFlight(id);
  }
}
