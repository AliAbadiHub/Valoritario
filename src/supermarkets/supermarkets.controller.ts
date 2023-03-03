import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { SupermarketsService } from './supermarkets.service';
import { CreateSupermarketDto } from './dto/create-supermarket.dto';
import { UpdateSupermarketDto } from './dto/update-supermarket.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('supermarkets')
@UseGuards(JwtAuthGuard)
@Controller('supermarkets')
export class SupermarketsController {
  constructor(private readonly supermarketsService: SupermarketsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createSupermarketDto: CreateSupermarketDto) {
    return this.supermarketsService.create(createSupermarketDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getAllSupermarkets(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ) {
    return this.supermarketsService.findAll(limit, offset);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':supermarketId')
  findOne(@Param('supermarketId') supermarketId: string) {
    return this.supermarketsService.findOne(+supermarketId);
  }

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Delete(':supermarketId')
  remove(@Param('supermarketId') supermarketId: string) {
    return this.supermarketsService.deleteSupermarket(+supermarketId);
  }
}
