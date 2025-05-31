import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, productSchema } from './entities/product.entity';
import { JumpsellerModule } from 'src/shared/jumpseller/jumpseller.module';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: productSchema }]),
    JumpsellerModule
  ],
  exports: [
    ProductsService,
    MongooseModule
  ]
})
export class ProductsModule {}
