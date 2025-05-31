import { Module } from '@nestjs/common';
import { MultivendeService } from './multivende.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  MultivendeToken,
  MultivendeTokenSchema,
} from './entities/multivende-token.entity';
import { Product } from 'src/products/entities/product.entity';
import { ProductsModule } from 'src/products/products.module';

@Module({
  controllers: [],
  providers: [MultivendeService],
  imports: [
    ProductsModule,
    MongooseModule.forFeature([
      { name: MultivendeToken.name, schema: MultivendeTokenSchema },
    ]),
  ],
  exports: [MultivendeService, MongooseModule],
})
export class MultivendeModule {}
