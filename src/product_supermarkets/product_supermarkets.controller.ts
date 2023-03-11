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

@ApiTags('inventory')
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
    return this.productSupermarketService.createProductSupermarket(
      supermarketId,
      productId,
      createProductSupermarketDto,
    );
  }

  @Get('supermarket/:supermarketId')
  async findPricesBySupermarket(
    @Param('supermarketId') supermarketId: number,
  ): Promise<ProductSupermarket[]> {
    return this.productSupermarketService.findPricesBySupermarket(
      supermarketId,
    );
  }

  @Get('product/:productId/:cityName')
  async getPricesByProduct(
    @Param('productId') productId: number,
    @Param('cityName') cityName: string,
  ) {
    return this.productSupermarketService.getPricesByProduct(
      productId,
      cityName,
    );
  }

  @Patch(':supermarketId/:productId')
  async updateProductSupermarket(
    @Param('supermarketId') supermarketId: number,
    @Param('productId') productId: number,
    @Body() updateProductSupermarketDto: UpdateProductSupermarketDto,
  ): Promise<{ newPrice: number }> {
    const updatedProductSupermarket =
      await this.productSupermarketService.updateProductSupermarket(
        supermarketId,
        productId,
        updateProductSupermarketDto,
      );
    return { newPrice: updatedProductSupermarket.price };
  }

  @Get()
  getAllProductSupermarket() {
    return this.productSupermarketService.findAll();
  }

  @Get(':inventoryId')
  findOne(@Param('inventoryId', ParseIntPipe) inventoryId: number) {
    return this.productSupermarketService.findOne(+inventoryId);
  }

  @Delete(':inventoryId')
  @UsePipes(ValidationPipe)
  async delete(@Param('inventoryId', ParseIntPipe) inventoryId: number) {
    await this.productSupermarketService.deleteProductSupermarket(inventoryId);
  }
}
