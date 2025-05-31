import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { ProductsService } from 'src/products/products.service';
import { JumpsellerService } from 'src/shared/jumpseller/jumpseller.service';
import { MultivendeModule } from 'src/shared/multivende/multivende.module';
import { MultivendeService } from 'src/shared/multivende/multivende.service';
import { mappedDataToMultivende } from '../multivende.mapper/multivende.mapper';

@Processor('queues-products')
export class QueuesProduct extends WorkerHost {
  private readonly logger = new Logger(QueuesProduct.name, {
    timestamp: true,
  });
  constructor(
    private readonly productsService: ProductsService,
    private readonly multivendeService: MultivendeService, 
  ) {
    super();
  }
  async process(job: Job<any, any, string>): Promise<any> {
    try {
      await job.updateProgress(25);
      await this.productsService.saveProducts(job.data);
      await job.updateProgress(50);
      //meter los productos en multivende

      const mappedProduct = mappedDataToMultivende(job.data) as any;
      const multiventeRes = await this.multivendeService.createProducts(mappedProduct);

      //guardar
      console.log('Multivende response:', multiventeRes);

      await job.updateProgress(100);
      return 'done';
    } catch (error) {
      await job.moveToFailed(new Error(error.message), 'true');
      throw new Error(`Job failed at step: ${error.message}`);
    }
  }

  @OnWorkerEvent('completed')
  onCompleted(job: Job<any, any, string>) {
    console.log(`Job completed with result ${job.returnvalue}`);
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job<any, any, string>) {
    console.log(`Job failed with reason ${job.failedReason}`);
  }

  @OnWorkerEvent('progress')
  onProgress(job: Job<any, any, string>) {
    console.log(`Job progress updated to ${job.progress}`);
  }

  @OnWorkerEvent('paused')
  onPaused(job: Job<any, any, string>) {
    console.log(`Job paused`);
  }

  @OnWorkerEvent('resumed')
  onResumed(job: Job<any, any, string>) {
    console.log(`Job resumed`);
  }

  @OnWorkerEvent('drained')
  onDrained() {
    console.log(`Queue products completada u agotada`);
  }
}