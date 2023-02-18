import { IsNumber, IsString, IsDefined, IsDateString } from 'class-validator';
export class CreateProfileDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsNumber()
  age: number;

  @IsDateString()
  createdAt: Date;

  @IsDefined()
  @IsString()
  address: string;

  constructor() {
    this.createdAt = new Date();
  }
}
