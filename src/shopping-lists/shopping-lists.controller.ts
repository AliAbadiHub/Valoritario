import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Repository } from 'typeorm';
import { CreateShoppingListDto } from './dto/create-shopping-list.dto';
import { ShoppingList } from './entities/shopping-list.entity';
import { ShoppingListService } from './shopping-lists.service';

@Controller('shopping-lists')
// @UseGuards(JwtAuthGuard)
export class ShoppingListsController {
  constructor(
    private readonly shoppingListService: ShoppingListService,
    @InjectRepository(ShoppingList)
    private readonly shoppingListRepository: Repository<ShoppingList>,
  ) {}

  @Post()
  async create(@Body() shoppingList: CreateShoppingListDto[]): Promise<any> {
    return await this.shoppingListService.getShoppingList(shoppingList);
  }
}
