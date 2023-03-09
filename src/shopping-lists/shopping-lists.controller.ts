import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ShoppingListService } from './shopping-lists.service';
import { CreateShoppingListDto } from './dto/create-shopping-list.dto';
// import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

// @UseGuards(JwtAuthGuard)
@Controller('shopping-lists')
export class ShoppingListsController {
  constructor(private readonly shoppingListService: ShoppingListService) {}

  @Post()
  async create(
    @Body() createShoppingListDto: CreateShoppingListDto,
    @Body('cityName') cityName: string,
    @Body('username') username: string,
  ) {
    try {
      const shoppingList = await this.shoppingListService.create(
        createShoppingListDto,
        cityName,
        username,
      );
      return {
        username: shoppingList.username,
        cityName: shoppingList.cityName, // added this line to include cityName in the response
        totalPrice: shoppingList.totalPrice,
        shoppingList: shoppingList.shoppingList,
      };
    } catch (error) {
      return { error };
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.shoppingListService.delete(id);
    return { message: 'Shopping list with the ID ${id} has been deleted.' };
  }
}
