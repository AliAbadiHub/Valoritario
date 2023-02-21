import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { CreateProductSupermarketDto } from './dto/create-product_supermarket.dto';
import { UpdateProductSupermarketDto } from './dto/update-product_supermarket.dto';
import { ProductSupermarketService } from './product_supermarket.service';

@ApiTags('product-supermarket')
@Controller('product-supermarket')
export class ProductSupermarketController {
  constructor(
    private readonly productSupermarketService: ProductSupermarketService,
  ) {}

  @Post()
  create(@Body() createProductSupermarketDto: CreateProductSupermarketDto) {
    return this.productSupermarketService.create(createProductSupermarketDto);
  }

  @Get()
  findAll() {
    return this.productSupermarketService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productSupermarketService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductSupermarketDto: UpdateProductSupermarketDto,
  ) {
    return this.productSupermarketService.update(
      +id,
      updateProductSupermarketDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productSupermarketService.delete(+id);
  }
}
