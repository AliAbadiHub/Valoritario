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
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Product } from './entities/product.entity';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiCreatedResponse({ type: Product })
  @Post('create')
  @UsePipes(ValidationPipe)
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsService.createProduct(createProductDto);
  }

  @ApiOkResponse({ type: Product })
  @Get()
  getAllProducts() {
    return this.productsService.findAll();
  }

  @Get(':productId')
  findOne(@Param('productId') productId: string) {
    return this.productsService.findOne(+productId);
  }

  @Patch(':productId')
  @UsePipes(ValidationPipe)
  async update(
    @Param('productId', ParseIntPipe) productId: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    await this.productsService.updateProduct(productId, updateProductDto);
    return updateProductDto;
  }

  @Delete(':productId')
  @UsePipes(ValidationPipe)
  async delete(@Param('productId', ParseIntPipe) productId: number) {
    await this.productsService.deleteProduct(productId);
  }
}
