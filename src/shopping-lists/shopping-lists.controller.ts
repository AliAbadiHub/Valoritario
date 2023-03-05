import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ShoppingListService } from './shopping-lists.service';
import { CreateShoppingListDto } from './dto/create-shopping-list.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

// @UseGuards(JwtAuthGuard)
@Controller('shopping-lists')
export class ShoppingListsController {
  constructor(private readonly shoppingListService: ShoppingListService) {}

  @Post()
  async create(@Body() createShoppingListDto: CreateShoppingListDto) {
    try {
      const shoppingList = await this.shoppingListService.create(
        createShoppingListDto,
      );
      return { shoppingList };
    } catch (error) {
      return { error };
    }
  }
}