import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { SupermarketsService } from './supermarkets.service';
import { CreateSupermarketDto } from './dto/create-supermarket.dto';
import { UpdateSupermarketDto } from './dto/update-supermarket.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('supermarkets')
@UseGuards(JwtAuthGuard)
@Controller('supermarkets')
export class SupermarketsController {
  constructor(private readonly supermarketsService: SupermarketsService) {}

  @Post()
  create(@Body() createSupermarketDto: CreateSupermarketDto) {
    return this.supermarketsService.create(createSupermarketDto);
  }

  @Get()
  findAll() {
    return this.supermarketsService.findAll();
  }

  @Get(':supermarketId')
  findOne(@Param('supermarketId') supermarketId: string) {
    return this.supermarketsService.findOne(+supermarketId);
  }

  @Patch(':supermarketId')
  update(
    @Param('supermarketId') supermarketId: string,
    @Body() updateSupermarketDto: UpdateSupermarketDto,
  ) {
    return this.supermarketsService.update(
      +supermarketId,
      updateSupermarketDto,
    );
  }

  @Delete(':supermarketId')
  remove(@Param('supermarketId') supermarketId: string) {
    return this.supermarketsService.deleteSupermarket(+supermarketId);
  }
}
