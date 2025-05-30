import { Module } from '@nestjs/common';
import { MultivendeSchedule } from './schedules/multivende.schedule';
import { MultivendeService } from '../shared/multivende/multivende.service';
import { MultivendeModule } from '../shared/multivende/multivende.module';

@Module({
  providers: [MultivendeSchedule, MultivendeService],
  imports: [MultivendeModule],
})
export class JobsModule {}
