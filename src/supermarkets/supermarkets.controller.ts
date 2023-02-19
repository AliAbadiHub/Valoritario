import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Product } from 'src/products/entities/product.entity';
import { CreateSupermarketDto } from './dto/create-supermarket.dto';
import { UpdateSupermarketDto } from './dto/update-supermarket.dto';
import { Supermarket } from './entities/supermarket.entity';
import { SupermarketsService } from './supermarkets.service';

@ApiTags('supermarkets')
@Controller('supermarkets')
export class SupermarketsController {
  constructor(private readonly supermarketsService: SupermarketsService) {}

  @Get()
  async findAll(): Promise<Supermarket[]> {
    return this.supermarketsService.findAll();
  }

  @Get(':supermarketId')
  async findOne(
    @Param('supermarketId') supermarketId: number,
  ): Promise<Supermarket> {
    return this.supermarketsService.findOne(supermarketId);
  }

  @Get(':supermarketId/products')
  async getProductsBySupermarket(
    @Param('supermarketId') supermarketId: number,
  ): Promise<Product[]> {
    return this.supermarketsService.getProductsBySupermarket(supermarketId);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async create(
    @Body() createSupermarketDto: CreateSupermarketDto,
  ): Promise<Supermarket> {
    return this.supermarketsService.create(createSupermarketDto);
  }

  @Patch(':supermarketId')
  @UsePipes(ValidationPipe)
  async update(
    @Param('supermarketId') supermarketId: number,
    @Body() updateSupermarketDto: UpdateSupermarketDto,
  ): Promise<Supermarket> {
    return this.supermarketsService.update(supermarketId, updateSupermarketDto);
  }

  @Delete(':supermarketId')
  @UsePipes(ValidationPipe)
  async remove(@Param('supermarketId') supermarketId: number): Promise<void> {
    return this.supermarketsService.remove(supermarketId);
  }
}
