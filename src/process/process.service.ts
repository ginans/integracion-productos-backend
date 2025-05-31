import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class ProcessService {
  private readonly logger = new Logger(ProcessService.name);
  constructor(
    @InjectQueue('queues-products') private readonly queuesProducts: Queue,
    private readonly productsService: ProductsService
  ) { 
  }

  async createProductsQueue() {
   const products = await this.productsService.fecthJumpsellerProducts()
    for (const product of products) {
      await this.queuesProducts.add('queues-products', product);
    }
  }
}
