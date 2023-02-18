import { PartialType } from '@nestjs/mapped-types';
import { CreateSupermarketDto } from './create-supermarket.dto';

export class UpdateSupermarketDto extends PartialType(CreateSupermarketDto) {}
