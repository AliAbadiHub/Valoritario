import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateProductSupermarketDto } from './dto/create-product_supermarket.dto';
import { UpdateProductSupermarketDto } from './dto/update-product_supermarket.dto';
import { ProductSupermarket } from './entities/product_supermarket.entity';
import { ProductSupermarketsService } from './product_supermarkets.service';

@ApiTags('product-supermarket')
@UseGuards(JwtAuthGuard)
@Controller('inventory')
export class ProductSupermarketController {
  constructor(private productSupermarketService: ProductSupermarketsService) {}

  @Post(':supermarketId/:productId')
  @UsePipes(ValidationPipe)
  async createProductSupermarket(
    @Param('supermarketId') supermarketId: number,
    @Param('productId') productId: number,
    @Body() createProductSupermarketDto: CreateProductSupermarketDto,
  ): Promise<ProductSupermarket> {
    return this.productSupermarketService.createProductSupermarket({
      ...createProductSupermarketDto,
      supermarketId,
      productId,
    });
  }

  @Get()
  getAllProductSupermarket() {
    return this.productSupermarketService.findAll();
  }
  
  @Get(':inventoryId')
  findOne(@Param('inventoryId', ParseIntPipe) inventoryId: number) {
    return this.productSupermarketService.findOne(+inventoryId);
  }

  @Patch(':inventoryId')
  @UsePipes(ValidationPipe)
  async updateProductSupermarketDto(
    @Param('inventoryId', ParseIntPipe) inventoryId: number,
    @Body() updateProductSupermarketDto: UpdateProductSupermarketDto,
  ) {
    await this.productSupermarketService.updateProductSupermarket(
      inventoryId,
      updateProductSupermarketDto,
    );
    return updateProductSupermarketDto;
  }

  @Delete(':inventoryId')
  @UsePipes(ValidationPipe)
  async delete(@Param('inventoryId', ParseIntPipe) inventoryId: number) {
    await this.productSupermarketService.deleteProductSupermarket(inventoryId);
  }
}
