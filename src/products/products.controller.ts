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
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Query } from '@nestjs/common/decorators';

@ApiTags('products')
@UseGuards(JwtAuthGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getAllProducts(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ) {
    return this.productsService.findAll(limit, offset);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':productId')
  findOne(@Param('productId') productId: number) {
    return this.productsService.findOne(+productId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':productId')
  update(
    @Param('productId') productId: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.updateProduct(+productId, updateProductDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':productId')
  remove(@Param('productId') productId: string) {
    return this.productsService.deleteProduct(+productId);
  }
}
