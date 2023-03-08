import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProfilesModule } from './profiles/profiles.module';
import { ProductsModule } from './products/products.module';
import { SupermarketsModule } from './supermarkets/supermarkets.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Profile } from './profiles/entities/profile.entity';
import { Product } from './products/entities/product.entity';
import { Supermarket } from './supermarkets/entities/supermarket.entity';
import { ProductSupermarketsModule } from './product_supermarkets/product_supermarkets.module';
import { ProductSupermarket } from './product_supermarkets/entities/product_supermarket.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ShoppingListsModule } from './shopping-lists/shopping-lists.module';
import * as dotenv from 'dotenv';
import { ShoppingList } from './shopping-lists/entities/shopping-list.entity';
import { dataSourceOptions } from 'db/data-source';
dotenv.config();
@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    ProfilesModule,
    ProductsModule,
    SupermarketsModule,
    ProductSupermarketsModule,
    TypeOrmModule.forRoot(dataSourceOptions),
    AuthModule,
    ShoppingListsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
