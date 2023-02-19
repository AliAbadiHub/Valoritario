import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProfilesModule } from './profiles/profiles.module';
import { ProductsModule } from './products/products.module';
import { PricesModule } from './prices/prices.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Profile } from './profiles/entities/profile.entity';
import { Product } from './products/entities/product.entity';
import { Price } from './prices/entities/price.entity';
import { SupermarketsModule } from './supermarkets/supermarkets.module';
import { Supermarket } from './supermarkets/entities/supermarket.entity';

@Module({
  imports: [
    UsersModule,
    ProfilesModule,
    ProductsModule,
    PricesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'val_generated',
      entities: [User, Profile, Product, Price, Supermarket],
      synchronize: true,
    }),
    SupermarketsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
