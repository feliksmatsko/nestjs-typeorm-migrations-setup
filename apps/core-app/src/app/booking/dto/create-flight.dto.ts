import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateFlightDto {
  @IsNotEmpty()
  @IsString()
  readonly flightNumber: string;

  @IsNotEmpty()
  @IsString()
  readonly departureAirportCode: string;

  @IsNotEmpty()
  @IsString()
  readonly arrivalAirportCode: string;

  @IsNotEmpty()
  @IsDate()
  readonly departureTime: Date;

  @IsNotEmpty()
  @IsDate()
  readonly arrivalTime: Date;

  @IsNotEmpty()
  @IsNumber()
  readonly duration: number;

  @IsNotEmpty()
  @IsNumber()
  readonly price: number;
}
