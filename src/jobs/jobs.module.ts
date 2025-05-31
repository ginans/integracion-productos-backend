import { Module } from '@nestjs/common';
import { MultivendeSchedule } from './schedules/multivende.schedule';
import { MultivendeService } from '../shared/multivende/multivende.service';
import { MultivendeModule } from '../shared/multivende/multivende.module';
import { ProcessService } from 'src/process/process.service';
import { ProcessModule } from 'src/process/process.module';

@Module({
  providers: [MultivendeSchedule],
  imports: [
    ProcessModule
  ],
})
export class JobsModule {}
