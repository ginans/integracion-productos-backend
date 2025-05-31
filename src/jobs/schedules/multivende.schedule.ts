import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MultivendeService } from 'src/shared/multivende/multivende.service';
import { ProcessService } from '../../process/process.service';

@Injectable()
export class MultivendeSchedule {
  constructor(
    private readonly processService: ProcessService,
  ) {}
  @Cron(CronExpression.EVERY_DAY_AT_9PM)
  async handleCron() {
    this.processService.createProductsQueue()
  }
}
