import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MultivendeService } from 'src/shared/multivende/multivende.service';

@Injectable()
export class MultivendeSchedule {
  constructor(private readonly multivendeService: MultivendeService) {}
  @Cron(CronExpression.EVERY_HOUR)
  async handleCron() {
    await this.multivendeService.refreshToken();
  }
}
