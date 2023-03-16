import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { UserProfilesModule } from './profiles/profiles.module';
import { ProductsModule } from './products/products.module';
import { SupermarketsModule } from './supermarkets/supermarkets.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductSupermarketsModule } from './product_supermarkets/product_supermarkets.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ShoppingListsModule } from './shopping-lists/shopping-lists.module';
import * as dotenv from 'dotenv';
import { dataSourceOptions } from 'db/data-source';
dotenv.config();
@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    UserProfilesModule,
    ProductsModule,
    SupermarketsModule,
    ProductSupermarketsModule,
    TypeOrmModule.forRoot({ ...dataSourceOptions, synchronize: true }),
    AuthModule,
    ShoppingListsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
