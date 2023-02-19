import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { PriceService } from './prices.service';

@ApiTags('prices')
@Controller('prices')
export class PriceController {
  constructor(private readonly priceService: PriceService) {}

  @Post(':productId')
  async createPrice(
    @Body() createPriceDto: CreatePriceDto,
    @Param('productId', ParseIntPipe) productId: number,
  ) {
    return this.priceService.createPrice(productId, createPriceDto);
  }

  @Get()
  findAll() {
    return this.priceService.findAll();
  }

  async getPricesByProductId(@Param('priceId') productId: number) {
    const prices = await this.priceService.getPricesByProductId(productId);
    return prices;
  }

  @Patch(':id')
  async updatePrice(
    @Param('id') id: number,

    @Body() updatePriceDto: UpdatePriceDto,
  ) {
    const updatedPrice = await this.priceService.updatePrice(
      id,
      updatePriceDto,
    );
    return updatedPrice;
  }

  @Delete(':id')
  async deletePrice(@Param('id') id: number) {
    const deletedPrice = await this.priceService.deletePrice(id);
    return deletedPrice;
  }
}
