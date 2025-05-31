import { Module } from '@nestjs/common';
import { ProcessService } from './process.service';
import { BullModule } from '@nestjs/bullmq';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { ProcessController } from './process.controller';
import { QueuesProduct } from './queues/queues.products';
import { ProductsModule } from 'src/products/products.module';


@Module({
  imports: [
    ProductsModule,
    BullModule.registerQueue({
      name: 'queues-products',
      defaultJobOptions: {
        delay: 3000,
        lifo: true,
      },
    }),
    BullBoardModule.forFeature({
      name: 'queues-products',
      adapter: BullMQAdapter,
    }),
  ],
  controllers: [ProcessController],
  exports: [ProcessService, BullModule],
  providers: [ProcessService, QueuesProduct],
})
export class ProcessModule {}
