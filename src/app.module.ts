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
@Module({
  imports: [
    UsersModule,
    ProfilesModule,
    ProductsModule,
    SupermarketsModule,
    ProductSupermarketsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'val_generated',
      entities: [User, Profile, Product, Supermarket, ProductSupermarket],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
