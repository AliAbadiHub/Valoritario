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
import { ProductSupermarketsService } from './product_supermarkets.service';

@ApiTags('product-supermarket')
@UseGuards(JwtAuthGuard)
@Controller('product-supermarket')
export class ProductSupermarketController {
  constructor(private productSupermarketService: ProductSupermarketsService) {}

  @Post('/supermarket/:supermarketId/product/:productId')
  @UsePipes(ValidationPipe)
  createProductSupermarket(
    @Param('supermarketId') supermarketId: number,
    @Param('productId') productId: number,
    @Body() createProductSupermarketDto: CreateProductSupermarketDto,
  ) {
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
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productSupermarketService.findOne(+id);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  async updateProductSupermarketDto(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductSupermarketDto: UpdateProductSupermarketDto,
  ) {
    await this.productSupermarketService.updateProductSupermarket(
      id,
      updateProductSupermarketDto,
    );
    return updateProductSupermarketDto;
  }

  @Delete(':id')
  @UsePipes(ValidationPipe)
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.productSupermarketService.deleteProductSupermarket(id);
  }
}
