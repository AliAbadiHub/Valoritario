import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ShoppingListService } from './shopping-lists.service';
import { CreateShoppingListDto } from './dto/create-shopping-list.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('shopping-lists')
export class ShoppingListsController {
  constructor(private readonly shoppingListService: ShoppingListService) {}

  @Post()
  async create(
    @Body() createShoppingListDto: CreateShoppingListDto,
    @Body('cityName') cityName: string,
    @Body('email') email: string,
  ) {
    try {
      const shoppingList = await this.shoppingListService.create(
        createShoppingListDto,
        cityName,
        email,
      );
      return {
        email: shoppingList.email,
        cityName: shoppingList.cityName, // added this line to include cityName in the response
        totalPrice: shoppingList.totalPrice,
        shoppingList: shoppingList.shoppingList,
      };
    } catch (error) {
      return { error };
    }
  }
}
