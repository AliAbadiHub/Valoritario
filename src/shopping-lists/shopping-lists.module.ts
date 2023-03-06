import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ShoppingListService } from './shopping-lists.service';
import { ShoppingListsController } from './shopping-lists.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoppingList } from './entities/shopping-list.entity';
import { ProductSupermarket } from 'src/product_supermarkets/entities/product_supermarket.entity';
import { User } from 'src/users/entities/user.entity';
import { RoleMiddleware } from 'src/middlewares/role.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([ShoppingList, ProductSupermarket, User])],
  controllers: [ShoppingListsController],
  providers: [ShoppingListService],
})
export class ShoppingListsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RoleMiddleware).forRoutes({
      path: '/shopping-lists',
      method: RequestMethod.GET,
    });
  }
}
